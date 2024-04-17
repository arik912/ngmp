import * as db from './order.db.js';

export function createOrder(orderData) {
  return db.createOrder({
    ...orderData,
    status: 'created',
  });
}
