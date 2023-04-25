<template>
  <div class="tw-mb-4">
    <div class="-tw-ml-3 tw-min-h-[30px]">
      <template
        v-for="tag in tags" :key="tag.id"
        >
        <slot :tag="tag"></slot>
      </template>
    </div>

    <div class=" tw-min-h-[25px]">
      <q-btn v-show="showClear" size="sm" padding="4px" flat @click="$emit('clear')" icon-right="close">
        сброс
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Tag } from 'src/types/tags';

  defineProps<{ showClear: boolean, tags: Tag[] }>();

  defineEmits<{ (event: 'clear'): void }>();
</script>
