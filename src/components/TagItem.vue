<template>
  <q-btn
    rounded
    size="8px"
    class="tw-text-white tw-cursor-pointer tw-px-4 tw-py-[5px] tw-ml-3 tw-touch-manipulation"
    :class="[tag.color, { 'tw-opacity-30': active }]"
  >
    {{ tag.name}}
  </q-btn>
</template>

<script setup lang="ts">
  import { Tag } from 'src/types/tags';

  defineProps<{
    tag: Tag,
    active: boolean
  }>();
</script>
