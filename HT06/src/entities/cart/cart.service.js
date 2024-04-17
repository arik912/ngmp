import * as db from './cart.db.js';
import * as orderService from '../order/order.service.js';
import * as productService from '../product/product.service.js';


export function calculateCartTotalPrice(cart) {
  return cart ? cart.items.reduce((acc, { product: { price }, count }) => {
    return acc + price * count;
  }, 0) : 0;
}

export function findOrCreateByUserId(userId) {
  const userCart = db.findByUserId(userId);
  if (!userCart) {
    return {
      cart: toDtoCart(db.createByUserId(userId)),
      total: 0,
    };
  }
  const cartFull = toFullCart(userCart);
  return { cart: toDtoCart(cartFull), total: calculateCartTotalPrice(cartFull) };
}

export function updateByUserId(userId, cart) {
  const areProductsValid = cart?.items?.some(({ productId }) => productService.isProductExisted(productId)) ?? true;
  if (!areProductsValid) {
    throw new Error('Products are not valid');
  }
  const updatedCart = db.updateByUserId(userId, cart);
  const cartFull = toFullCart(updatedCart);
  return {
    cart: toDtoCart(cartFull),
    total: calculateCartTotalPrice(cartFull),
  };
}

export function deleteByUserId(userId) {
  return db.deleteByUserId(userId);
}

export function checkout(userId, orderData) {
  const userCart = db.findByUserId(userId);
  if (!userCart || !userCart.items.length) {
    throw new Error('Cart is empty')
  }
  const cartFull = toFullCart(userCart);
  
  const totalPrice = calculateCartTotalPrice(cartFull);
  const order = orderService.createOrder({
    ...orderData,
    userId,
    cartId: cartFull.id,
    items: cartFull.items,
    total: totalPrice,
  });
  db.deleteByUserId(userId);
  
  return order
}
