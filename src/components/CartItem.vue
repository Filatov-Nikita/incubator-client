<template>
  <q-item class="tw-bg-white">
    <q-btn class="tw-absolute tw-right-2 tw-top-1" round flat color="negative" icon="close" size="sm" @click="cartStore.remove(item.id)" />
    <div class="tw-flex tw-w-full">
      <div>
        <div class="tw-text-lg tw-font-semibold tw-mb-1">{{ item.name }}</div>
        <div class="tw-mb-1">Цена за шт: {{ $price(item.price) }}</div>
        <div class="tw-space-x-1 -tw-ml-2">
          <q-btn size="md" round flat color="negative" label="-" @click="changeCount(item.count - 1)"/>
          <input class="cart-count tw-w-20 tw-text-center tw-border tw-border-gray-300 tw-rounded-md" type="number" :value="item.count" @change="onInput($event)">
          <q-btn size="md" round flat color="positive" label="+" @click="changeCount(item.count + 1)" />
        </div>
      </div>
      <q-space />
      <div class="tw-self-end tw-flex tw-text-base">
        <div class="tw-font-medium">Итого:</div>
        <div class="tw-font-medium tw-w-[100px] tw-text-right">{{ $price(total) }}</div>
      </div>
    </div>
  </q-item>
</template>

<script setup lang="ts">
  import type { CartItem } from 'src/types/cart';
  import { computed } from 'vue';
  import { useCartStore } from 'src/stores/cart';

  const props = defineProps<{ item: CartItem }>();
  const cartStore = useCartStore();

  const total = computed(() => props.item.count * props.item.price);

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const count = changeCount(+target.value);
    target.value = count.toString();
  }

  function changeCount(count: number) {
    count = Math.max(count, 1)
    cartStore.update(props.item.id, { count });
    return count;
  }
</script>
<style>
  .cart-count::-webkit-outer-spin-button,
  .cart-count::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  .cart-count[type=number]{
    -moz-appearance: textfield;
  }
</style>
