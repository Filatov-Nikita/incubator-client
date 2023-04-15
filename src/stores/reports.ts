import { defineStore } from 'pinia';
import * as ReportsAPI from 'src/api/reports';

export const useReportsStore = defineStore('useReportsStore', {
  actions: {
    async showProductsSold(filter: Record<string, string> = {}) {
      const data = await ReportsAPI.productsSold(filter);
      return data;
    },
  }
});
