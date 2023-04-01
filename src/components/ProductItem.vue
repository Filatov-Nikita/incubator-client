<template>
  <q-card :class="{ 'tw-opacity-50': item.visible === false }">
    <q-img height="100px" :src="$imgPath(item.img, '/images/preview.jpg')" />
    <q-card-section>
      <div class="text-h6 tw-leading-tight">{{ item.name }}</div>
      <div class="text-subtitle2">{{ $price(item.price) }}</div>
    </q-card-section>
    <q-card-section class="tw-py-1 tw-min-h-[40px]">
      <q-chip
        v-for="tag in item.tags"
        :key="tag.id"
        size="sm"
        class="tw-text-white"
        :class="tag.color"
      >
        {{ tag.name }}
      </q-chip>
    </q-card-section>
    <q-card-actions v-if="$slots.actions" align="right">
      <slot name="actions"></slot>
    </q-card-actions>
    <slot></slot>
  </q-card>
</template>

<script setup lang="ts">
  import type { Product } from 'src/types/products';

  defineProps<{
    item: Product
  }>();
</script>
