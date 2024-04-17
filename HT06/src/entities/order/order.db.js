import { v4 } from 'uuid';
const orders = {};

export function createOrder(orderData) {
  const id = v4();
  const order = {
    id,
    ...orderData
  }
  orders[id] = order;
  return order;
}
