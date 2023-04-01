import { defineStore } from 'pinia';
import * as TagsApi from 'src/api/tags';
import type { Tag, TagBody } from 'src/types/tags';

interface State {
  items: Tag[] | null
}

export const useTagsStore = defineStore('tagsStore', {
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
      const tags = await TagsApi.list();
      this.items = tags;
      return tags;
    },
    async create(body: TagBody) {
      const tag = await TagsApi.create(body);
      if(this.items === null) this.items = [];
      this.items.push(tag);
      return tag;
    },
    async update(id: number, body: Partial<TagBody>) {
      const newTag = await TagsApi.update(id, body);
      const tag = this.getItem(newTag.id);
      if(tag === null) return newTag;
      Object.assign(tag, newTag);
      return newTag;
    },
    async remove(id: number) {
      const result = await TagsApi.remove(id);
      if(this.items === null) return result;
      this.items = this.items.filter(item => item.id !== id);
      return result;
    }
  }
})
