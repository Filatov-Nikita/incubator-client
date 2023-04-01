<template>
  <div class="tw-overflow-x-hidden">
    <div class="tw-flex -tw-ml-1">
      <div class="tw-pl-1" v-for="item in items" :key="item.id">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Category } from 'src/types/categories';

  defineProps<{ items: Category[] }>();
</script>
