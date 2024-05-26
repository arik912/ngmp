import { Product } from './product.model';

export async function getProducts() {
  const products = await Product.find();

  return products.map((product) => {
    const { id, title, description, price } = product;

    return {
      id,
      title,
      description,
      price,
    };
  });
}

export async function getProductById(productId){
  const product = await Product.findById(productId);

  if (!product) {
    return null;
  }

  return product;
}

export async function getProductCountByIds(productIds) {
  return Product.countDocuments({ _id: productIds });
}

export async function addProduct(data){
  const product = new Product(data);

  const saved = product.save();

  if (!saved) {
    return null;
  }
  const { id, title, description, price } = product;

  return {
    id,
    title,
    description,
    price,
  };
}
