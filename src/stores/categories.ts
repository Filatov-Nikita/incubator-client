import { defineStore } from 'pinia';
import * as CatsApi from 'src/api/categories';
import type { Category, CategoryBody } from 'src/types/categories';

interface State {
  items: Category[] | null
}

export const useCategoriesStore = defineStore('categoriesStore', {
  state: (): State => ({
    items: null
  }),
  getters: {
    getItem() {
      return (id: number) => {
        if(this.items === null) return null;
        const item = this.items.find(item => item.id === id);
        return item ?? null;
      }
    }
  },
  actions: {
    async list() {
      const cats = await CatsApi.list();
      this.items = cats;
      return cats;
    },
    async create(body: CategoryBody) {
      const cat = await CatsApi.create(body);
      if(this.items === null) this.items = [];
      this.items.push(cat);
      return cat;
    },
    async update(id: number, body: Partial<CategoryBody>) {
      const newCat = await CatsApi.update(id, body);
      const cat = this.getItem(newCat.id);
      if(cat === null) return newCat;
      Object.assign(cat, newCat);
      return newCat;
    },
    async remove(id: number) {
      const result = await CatsApi.remove(id);
      if(this.items === null) return result;
      this.items = this.items.filter(item => item.id !== id);
      return result;
    }
  }
})
