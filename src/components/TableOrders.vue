<template>
  <q-table :columns="columns" :rows="ordersList" row-key="id" hide-pagination :rows-per-page-options="rowsPerPage">
    <template #body="props">
      <q-tr :props="props" @click="onClick(props.row)">
        <q-td key="id" :props="props">{{ props.row.id }}</q-td>
        <q-td key="createdAt" :props="props">{{ props.row.createdAt }}</q-td>
        <q-td key="total" :props="props">{{ $price(props.row.total) }}</q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog :model-value="activeRow !== null" @before-hide="hideModal">
    <CardOrderDetails v-if="activeRow" :order="activeRow" />
  </q-dialog>
</template>

<script setup lang="ts">
  import type { OrderList, OrderListItem } from 'src/types/orders';
  import { QTableProps } from 'quasar';
  import { ref, computed } from 'vue';
  import CardOrderDetails from './CardOrderDetails.vue';

  const rowsPerPage = [0];

  const props = defineProps<{
    orders: OrderList['orders']
  }>();

  const activeRow = ref<OrderListItem | null>(null);

  const columns: QTableProps['columns'] = [
    {
      name: 'id',
      label: '№ заказа',
      field: (row) => row.id,
      align: 'left'
    },
    {
      name: 'createdAt',
      label: 'Дата/время',
      field: (row) => row.createdAt,
      align: 'left'
    },
    {
      name: 'total',
      label: 'Сумма',
      field: (row) => row.total,
      align: 'left'
    }
  ];

  function onClick(row: OrderListItem) {
    activeRow.value = row;
  }

  function hideModal() {
    activeRow.value = null;
  }

  function withZero(n: number) {
    return n < 10 ? `0${n}` : n.toString();
  }

  function prettyDate(date: Date) {
    const dt = `${withZero(date.getDate())}.${withZero(date.getMonth() + 1)}.${date.getFullYear()}`;
    const time = `${withZero(date.getHours())}:${withZero(date.getMinutes())}`
    return `${dt} ${time}`;
  }

  function formatDt(iso: string) {
    return prettyDate(new Date(iso));
  }

  const ordersList = computed(() => {
    return props.orders.map(order => (
      {
        ...order,
        createdAt: formatDt(order.createdAt)
      }
    ));
  });
</script>
