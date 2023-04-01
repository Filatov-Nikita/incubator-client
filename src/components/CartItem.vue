<template>
  <q-item class="tw-bg-white">
    <q-btn class="tw-absolute tw-right-2 tw-top-1" round flat color="negative" icon="close" size="sm" @click="cartStore.remove(item.id)" />
    <div class="tw-flex tw-w-full">
      <div>
        <div class="tw-text-lg tw-font-semibold tw-mb-1">{{ product?.name }}</div>
        <div class="tw-mb-1">Цена за шт: {{ item.price }} руб.</div>
        <div class="tw-space-x-1 -tw-ml-2">
          <q-btn size="md" round flat color="negative" label="-" @click="changeCount(item.count - 1)"/>
          <input class="tw-w-20 tw-text-center tw-border tw-border-gray-300 tw-rounded-md" type="text" :value="item.count" @change="onInput($event)">
          <q-btn size="md" round flat color="positive" label="+" @click="changeCount(item.count + 1)" />
        </div>
      </div>
      <q-space />
      <div class="tw-self-end tw-flex">
        <div class="tw-font-medium">Итого:</div>
        <div class="tw-font-medium tw-w-24 tw-text-right">{{ total }} руб.</div>
      </div>
    </div>
  </q-item>
</template>

<script setup lang="ts">
  import type { CartItem } from 'src/types/cart';
  import { computed } from 'vue';
  import { useProductsStore } from 'stores/products';
  import { useCartStore } from 'src/stores/cart';

  const props = defineProps<{ item: CartItem }>();
  const productsStore = useProductsStore();
  const cartStore = useCartStore();

  const product = computed(() => productsStore.getItem(props.item.id));
  const total = computed(() => props.item.count * props.item.price);

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    changeCount(+target.value);
  }

  function changeCount(count: number) {
    cartStore.update(props.item.id, { count: Math.max(1, count) });
  }
</script>
