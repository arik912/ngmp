import * as cartService from './cart.service.js';

export function getUserCart(req, res) {
  const cart = cartService.findOrCreateByUserId(req.user.id);
  res.json(cart);
}

export function updateUserCart(req, res) {
  const updatedCart = cartService.updateByUserId(req.user.id, req.body);
  res.json(updatedCart);
}

export function deleteUserCart(req, res) {
  cartService.deleteByUserId(req.user.id);
  res.json({ success: true });
}

export function checkout(req, res) {
  const order = cartService.checkout(req.user.id, req.body);
  res.json({ order });
}

