import { defineStore } from 'pinia';
import type { CartItem } from 'src/types/cart';

interface State {
  products: CartItem[]
}

export const useCartStore = defineStore('useCartStore', {
  state: (): State => ({
    products: []
  }),
  getters: {
    totalSum: (state) => {
      return state.products.reduce((acc, { count, price }) => acc += price * count, 0);
    },
    count: (state) => {
      return state.products.length;
    },
    getItem: (state) => {
      return (itemId: number) => {
        const index = state.products.findIndex(pr => pr.id === itemId);
        if(index === -1) return null;
        return state.products[index];
      }
    }
  },
  actions: {
    add(item: CartItem) {
      if(this.getItem(item.id)) {
        this.remove(item.id);
      }

      this.products.push(item);
    },
    update(itemId: number, body: Partial<CartItem>) {
      const product = this.getItem(itemId);
      if(product === null) return;
      Object.assign(product, body);
    },
    remove(itemId: number) {
      this.products = this.products.filter(product => product.id !== itemId);
    },
    clear() {
      this.products = [];
    }
  }
})
