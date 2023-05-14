<template>
  <q-card class="tw-p-4 tw-pb-6 tw-w-full">
    <div class="tw-font-bold tw-text-2xl tw-mb-1">
      № {{ order.id }}
    </div>
    <p class="tw-mb-4 tw-text-xs tw-font-medium tw-text-gray-500">
      от {{ order.createdAt }}
    </p>
    <p class="tw-text-lg tw-font-medium tw-mb-2">Состав заказа:</p>
    <q-markup-table class="tw-mb-6 tw-bg-yellow-300">
      <thead>
        <tr>
          <th class="tw-text-left">Наименование</th>
          <th class="tw-text-left">Количество</th>
          <th class="tw-text-left">Цена</th>
          <th class="tw-text-left">Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in order.products" :key="product.id">
          <td class="tw-text-left">{{ product.name }}</td>
          <td class="tw-text-left">{{ product.count }}</td>
          <td class="tw-text-left">{{ $price(product.price) }}</td>
          <td class="tw-text-left">{{ $price(product.total) }}</td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="tw-font-bold tw-text-lg">
      Общая сумма: {{ $price(order.total) }}
    </div>
  </q-card>
</template>

<script setup lang="ts">
  import type { OrderListItem } from 'src/types/orders';

  defineProps<{
    order: OrderListItem
  }>()
</script>
