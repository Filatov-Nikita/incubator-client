<template>
  <q-page class="tw-p-4 tw-pt-6">
    <h1 class="tw-text-2xl tw-font-semibold tw-mb-4">Заказы</h1>
    <FilterOrders class="tw-mb-8" @apply="getOrders" />
    <TableOrders v-if="orders" :orders="orders" />
  </q-page>
</template>

<script setup lang="ts">
  import TableOrders from 'src/components/TableOrders.vue';
  import FilterOrders from 'src/components/FilterOrders.vue';
  import { useOrdersStore } from 'src/stores/orders';
  import { ref } from 'vue';
  import { OrderListItem, OrderFilter } from 'src/types/orders';

  const orders = ref<OrderListItem[] | null>(null);
  const ordersStore = useOrdersStore();

  async function getOrders(filter: OrderFilter) {
    const { orders: list } = await ordersStore.list(filter);
    orders.value = list;
  }
</script>
