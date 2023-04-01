<template>
  <q-btn size="sm" rounded :color="active ? 'orange-10' : 'orange-5'" :label="item.name" unelevated />
</template>

<script setup lang="ts">
  import type { Category } from 'src/types/categories';

  defineProps<{ item: Category, active: Boolean }>();
</script>
