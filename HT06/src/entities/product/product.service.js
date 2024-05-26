import * as productRepository from './product';

export function getProducts(){
  return productRepository.getProducts();
}

export async function getProductById(productId){
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new NotFoundException({ message: 'No product with such id' });
  }

  return product;
}

export async function isProductExisted(productId){
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new NotFoundException({ message: 'No product with such id' });
  }

  return !!product;
}

export async function areProductsExist(productIds){
  if (!productIds || productIds.length === 0) return true;

  const count = await productRepository.getProductCountByIds(productIds);

  return count === productIds.length;
}

export async function addProduct(data){
  const product = await productRepository.addProduct(data);

  if (!product) {
    throw new NotFoundException({ message: 'Product was not created' });
  }

  return product;
}
