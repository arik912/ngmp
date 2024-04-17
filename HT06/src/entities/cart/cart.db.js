import { v4 } from 'uuid';
const carts = {};

export function findByUserId(userId) {
  return Object.values(carts).find((cart) => cart.userId === userId && !cart.isDeleted) || null;
}

export function createByUserId(userId) {
  const id = v4();
  const userCart = {
    id,
    userId,
    isDeleted: false,
    items: [],
  };
  
  carts[id] = userCart;
  
  return userCart;
}

export function updateByUserId(userId, cartData) {
  const currentCart = findByUserId(userId);
  if (!currentCart) {
    throw new Error( 'Cart was not found' );
  }
  const newItems = cartData?.items || [];
  const updatedCart = {
    ...currentCart,
    ...cartData,
    items: newItems,
  }
  
  carts[currentCart.id] = { ...updatedCart };
  
  return { ...updatedCart };
}

export function deleteByUserId(userId) {
  updateByUserId(userId, { isDeleted: true });
}
