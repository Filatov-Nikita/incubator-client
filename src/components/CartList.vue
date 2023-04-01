<template>
  <div>
    <div v-if="items.length === 0">В корзине нет товаров</div>
    <q-list v-else separator bordered>
      <CartItem v-for="item in items" :item="item" />
    </q-list>
  </div>
</template>

<script setup lang="ts">
  import type { CartItem as CartItemType} from 'src/types/cart';
  import CartItem from './CartItem.vue';

  defineProps<{ items: CartItemType[] }>();
</script>
