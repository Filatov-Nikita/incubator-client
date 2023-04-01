import { api } from './index';
import type { OrderBody, Order } from 'src/types/orders';

export function create(json: OrderBody) {
  return api.post('orders', { json }).json<Order>();
}
