import { Order } from './order.model';

const orderToOrderEntity = (order)=> {
  const omitKeys = ['user', 'cart'];

  return Object.keys(order).reduce((result, key) => {
    if (omitKeys.includes(key)) {
      return result;
    }
    result[key] = order[key];

    return result;
  }, {});
};

export async function createOrder(orderData){
  const order = new Order({
    ...orderData,
    user: orderData.userId,
    cart: orderData.cartId,
  });

  const saved = await order.save();
  const newOrder = await Order.findById(saved._id).lean();

  if (!newOrder) {
    return null;
  }

  return orderToOrderEntity(newOrder);
}
