import * as orderRepository from './order.model';

export function createOrder(orderData){
  return orderRepository.createOrder({
    ...orderData,
    status: 'created',
  });
}
