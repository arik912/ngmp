import * as productService from './product.service.js';

export function getProducts(req, res) {
  const products = productService.getProducts();
  res.status(200).json(products);
}

export function getProductById(req, res) {
  const product = productService.getProductById(req.params.productId);
  res.status(200).json(product);
}

export async function addProduct(req, res) {
  const product = await productService.addProduct(req.body);
  res.status(200).json(product);
}
