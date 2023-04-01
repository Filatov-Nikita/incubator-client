<template>
  <slot :show="show" :setValue="setValue"></slot>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const show = ref(false);

  function setValue(value: boolean) {
    show.value = value
  }

  defineExpose({
    setValue
  });
</script>
