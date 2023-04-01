import { defineStore } from 'pinia';
import * as ProductsApi from 'src/api/products';
import type { Product, ProductBody, ProductFilter } from 'src/types/products';
import { Tag } from 'src/types/tags';

interface State {
  items: Product[] | null
}

export const useProductsStore = defineStore('productsStore', {
  state: (): State => ({
    items: null
  }),
  getters: {
    getItem: (state) => {
      return (itemId: number) => {
        if(state.items === null) return null;
        const index = state.items.findIndex(pr => pr.id === itemId);
        if(index === -1) return null;
      }
    }
  },
  actions: {
    async list(filter: ProductFilter = {}) {
      const products = await ProductsApi.list(filter);
      return products;
    },
    async create(body: ProductBody) {
      const product = await ProductsApi.create(body);
      return product;
    },
    async update(id: number, body: Partial<ProductBody>) {
      const product = await ProductsApi.update(id, body);
      return product;
    },
    async attachTags(productId: number, tags: Tag[]) {
      const ids = tags.map(tag => tag.id);
      const product = await ProductsApi.attachTags(productId, ids);
      return product;
    },
    async dettachTags(productId: number, tags: Tag[]) {
      const ids = tags.map(tag => tag.id);
      const product = await ProductsApi.dettachTags(productId, ids);
      return product;
    },
  }
})
