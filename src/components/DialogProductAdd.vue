<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    @beforeHide="reset"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-font-semibold tw-text-lg tw-mb-8">{{ item.name }}</div>
      <div class="tw-flex tw-items-center tw-space-x-3 tw-mx-auto tw-mb-6 tw-max-w-[300px]">
        <q-btn color="negative" round label="-" @click="dec" />
        <q-input class="tw-w-full" filled type="number" v-model.number="form.count" clearable min="1" />
        <q-btn color="positive" round label="+" @click="inc" />
      </div>
      <div class="tw-flex tw-justify-center tw-mb-4 tw-space-x-1">
        <q-btn rounded color="orange-4" text-color="white" @click="set(5)">5</q-btn>
        <q-btn rounded color="orange-4" text-color="white" @click="set(10)">10</q-btn>
        <q-btn rounded color="orange-9" text-color="white" @click="set(50)">50</q-btn>
        <q-btn rounded color="orange-10" text-color="white" @click="set(100)">100</q-btn>
      </div>
      <q-card-actions align="right">
        <q-btn class="tw-w-full" color="primary" label="Сохранить" @click="add" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import type { Product } from 'src/types/products';
  import { useCartStore } from 'src/stores/cart';
  import { reactive } from 'vue';
  import { Notify } from 'quasar';

  const props = defineProps<{ modelValue: boolean, item: Product }>();
  const emit = defineEmits<{ (event: 'update:modelValue', value: boolean): void }>();
  const cartStore = useCartStore();
  const form = reactive({ count: 0 });

  function inc() {
    set(1);
  }

  function dec() {
    set(-1);
  }

  function set(value: number) {
    form.count = Math.max(0, form.count + value);
  }

  function add() {
    cartStore.add({ id: props.item.id, count: form.count, price: props.item.price });
    Notify.create({ message: 'Добавлено успешно', type: 'positive' });
    emit('update:modelValue', false);
  }

  function reset() {
    form.count = 1;
  }
</script>
