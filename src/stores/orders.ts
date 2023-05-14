import { defineStore } from 'pinia';
import * as OrdersApi from 'src/api/orders';
import type { OrderBody, OrderFilter } from 'src/types/orders';

export const useOrdersStore = defineStore('ordersStore', {
  actions: {
    async list(filter: OrderFilter) {
      const orders = await OrdersApi.list(filter);
      return orders;
    },
    async create(body: OrderBody) {
      const order = await OrdersApi.create(body);
      return order;
    },
  }
})
