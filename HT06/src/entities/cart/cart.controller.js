import * as cartService from './cart.service';

export async function getUserCart(req, res) {
  const cart = await cartService.findOrCreateByUserId(req.user.id);
  res.json(cart);
}

export async function updateUserCart(req, res) {
  const updatedCart = await cartService.updateByUserId(req.user.id, req.body);
  res.json(updatedCart);
}

export async function deleteUserCart(req, res) {
  await cartService.deleteByUserId(req.user.id);
  res.json({ success: true });
}

export async function checkout(req, res) {
  const order = await cartService.checkout(req.user.id, req.body);
  res.json({ order });
}
