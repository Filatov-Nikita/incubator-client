import { defineStore } from 'pinia';
import * as ReportsAPI from 'src/api/reports';

export const useReportsStore = defineStore('useReportsStore', {
  actions: {
    async showProductsSold() {
      const data = await ReportsAPI.productsSold();
      return data;
    },
  }
});
