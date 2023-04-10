<template>
  <div class="keyboard">
    <button
      v-ripple
      v-for="i in numbers"
      class="number"
      :class="{ 'zero': i === 0 }"
      @click="_e => onPress(i)"
    >
      {{ i }}
    </button>
    <button class="number" v-ripple @click="onClear">
      ac
    </button>
    <button class="number" v-ripple @click="onDel">
      del
    </button>
  </div>
</template>

<script setup lang="ts">
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  const emit = defineEmits<{
    (event: 'clear'): void,
    (event: 'del'): void,
    (event: 'press', num: number): void,
  }>();

  function onClear() {
    emit('clear');
  }

  function onDel() {
    emit('del');
  }

  function onPress(num: number) {
    emit('press', num);
  }
</script>
<style scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  max-width: 192px;
}

.number {
  position: relative;
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background: theme('colors.gray.200');
  order: 1;
  touch-action: manipulation;
}

.zero {
  order: 3;
}
</style>
