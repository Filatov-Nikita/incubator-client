<template>
  <q-page class="tw-p-4 tw-pt-6">
    <h1 class="tw-text-2xl tw-font-semibold tw-mb-4">Отчет продаж по товарам</h1>
    <q-table
      :columns="columns"
      :rows="data"
      rows-per-page-label="Показывать на странице"
      :pagination-label="pagLabel"
      :rows-per-page-options="papOpts"
      :row-key="rowKey"
      hide-pagination
    >

    </q-table>
  </q-page>
</template>

<script setup lang="ts">
  import { useReportsStore } from 'src/stores/reports';
  import { ref, getCurrentInstance } from 'vue';
  import type { ProductItem } from 'src/types/reports';

  const store = useReportsStore();
  const data = ref<ProductItem[]>([]);
  const inst = getCurrentInstance();

  function pagLabel(firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) {
    return `${firstRowIndex}-${endRowIndex} из ${totalRowsNumber}`
  }

  // const papOpts = [20, 40, 60, 80, 100, 'Все'];
  const papOpts = [0];

  const columns = [
    {
      name: 'name',
      label: 'Наименование',
      field: (row: any) => row.product.name,
      align: 'left' as const
    },
    {
      name: 'count',
      label: 'Количество',
      field: (row: any) => row.count,
      align: 'left' as const,
    },
    {
      name: 'sum',
      label: 'Сумма',
      field: (row: any) => row.totalSum,
      format: (val: any) => inst?.appContext.config.globalProperties.$price(val),
      align: 'left' as const,
    },
  ];

  const rowKey = (row: any) => row.product.name

  async function showData() {
    data.value = await store.showProductsSold();
  }

  showData();
</script>
