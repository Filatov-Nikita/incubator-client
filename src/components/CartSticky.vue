<template>
  <q-page-sticky class="tw-w-full tw-bg-white" position="bottom-right" :offset="[0, 0]">
    <div class="tw-w-screen tw-pl-8 tw-flex tw-items-center tw-justify-between tw-p-2 tw-border-t tw-border-gray-200">
      <div class="tw-font-semibold">
        Итого: {{ cartStore.totalSum }} руб.
      </div>
      <div>
        <button
          class="bg-primary tw-p-3 tw-px-8 tw-text-white tw-font-bold tw-rounded-md"
          :class="{ 'tw-invisible': cartStore.count === 0 }"
          @click="showDialog = true"
        >
          Продолжить
        </button>
      </div>
    </div>
    <DialogCartShow v-model="showDialog" />
  </q-page-sticky>
</template>

<script setup lang="ts">
  import DialogCartShow from './DialogCartShow.vue'
  import { useCartStore } from 'src/stores/cart';
  import { ref } from 'vue';

  const cartStore = useCartStore();
  const showDialog = ref(false);
</script>
