import { Cart } from './cart.model';

const toProductJSON = (item) => {
  const {
    product: { id, title, description, price },
  } = item;

  return {
    product: {
      id,
      title,
      description,
      price,
    },
    count: item.count,
  };
};

const cartToCartEntity = (cart) => {
  const cartItems = (cart.items.map(toProductJSON));
  const items = cartItemsToCartItemEntity(cartItems);

  return { ...cart, items };
};

const cartItemsToCartItemEntity = (items) => {
  return items.map((item) => ({ productId: item.product.id.toString(), count: item.count }));
};

const cartToCartFull = (cart) => {
  const cartItems = (cart.items);
  const items = cartItemsToCartItemsFull(cartItems);

  return { ...cart, items };
};

const cartItemsToCartItemsFull = (items) => {
  return items.map(toProductJSON);
};

export async function findByUserId(userId){
  const cart = await Cart.findOne({ userId: userId, isDeleted: false })
    .populate({
      path: 'items',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
    .lean();

  if (!cart) return null;

  return cart && cartToCartFull(Object.assign({}, cart, { id: cart._id.toString() }));
}

export async function createByUserId(userId){
  const cart = new Cart({
    userId,
    isDeleted: false,
    items: [],
  });

  const saved = (await cart.save());

  return cartToCartEntity(saved);
}

export async function updateByUserId(userId, cartData){
  const items = (cartData?.items || []).map((item) => ({ product: item.productId, count: item.count }));

  const currentCart = await Cart.findOne({ userId: userId, isDeleted: false });

  if (!currentCart) {
    return null;
  }

  await currentCart.updateOne({ items: [...currentCart.items, ...items], isDeleted: cartData?.isDeleted });

  const cart = await currentCart.populate({
    path: 'items',
    populate: {
      path: 'product',
      model: 'Product',
    },
  });

  return cartToCartEntity(cart);
}

export async function deleteByUserId(userId){
  return updateByUserId(userId, { isDeleted: true });
}

export async function getCartItems(cartId) {
  const cart = await Cart.findOne({ id: cartId }).populate({
    path: 'items',
    populate: {
      path: 'product',
      model: 'Product',
    },
  });

  if (!cart) {
    return [];
  }
  const cartItems = cart.items

  return cartItemsToCartItemsFull(cartItems);
}
