import { api } from './index';
import type { OrderBody, Order, OrderList, OrderFilter } from 'src/types/orders';

export function create(json: OrderBody) {
  return api.post('orders', { json }).json<Order>();
}

export function list(filter: OrderFilter) {
  return api.get('orders', { searchParams: { ...filter } }).json<OrderList>();
}
