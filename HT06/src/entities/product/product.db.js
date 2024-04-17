const products = {
  '1': {
    id: '1',
    title: 'iphone 15',
    description: 'latest iphone',
    price: 1300
  },
  '2': {
    id: '2',
    title: 'iphone 15 pro',
    description: 'latest iphone version pro',
    price: 900
  }
};

export function getProducts() {
  return Object.values(products);
}

export function getProductById(productId) {
  return products[productId] || null;
}
