import * as db from './product.db.js';

export function getProducts() {
  return db.getProducts();
}

export function getProductById(productId) {
  const product = db.getProductById(productId);
  if (!product) {
    throw new Error('Product not found')
  }
  return product;
}

export function isProductExisted(productId) {
  const product = db.getProductById(productId);
  if (!product) {
    throw new Error('Product not found')
  }
  return !!product;
}

