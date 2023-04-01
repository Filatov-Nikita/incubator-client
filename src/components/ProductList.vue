<template>
  <div>
    <div
      class="tw-text-gray-500 tw-font-medium tw-text-sm tw-text-center tw-pt-10"
      v-if="items.length === 0"
    >
      Не найдено товаров
    </div>
    <div class="tw-flex tw-flex-wrap -tw-mt-3 -tw-ml-3">
      <TransitionGroup :name="animationName ?? ''">
        <div
          class="tw-w-1/3 tw-pl-3 tw-pt-3 full-items"
          v-for="item in items"
          :key="item.id"
        >
          <slot :item="item"></slot>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from 'src/types/products';

  defineProps<{ items: Product[], animationName?: string }>();
</script>
<style>
.full-items > .q-card {
  height: 100%;
}
</style>
<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
