import { defineStore } from 'pinia';
import * as OrdersApi from 'src/api/orders';
import type { OrderBody } from 'src/types/orders';

export const useOrdersStore = defineStore('ordersStore', {
  actions: {
    async create(body: OrderBody) {
      const order = await OrdersApi.create(body);
      return order;
    }
  }
})
