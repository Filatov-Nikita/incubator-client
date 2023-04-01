<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="value => emit('update:modelValue', value)"
    @beforeHide="reset"
  >
    <q-card class="tw-p-1 tw-w-full">
      <q-card-section>
        <h1 class="tw-text-xl tw-font-bold tw-mb-4">Способ оплаты</h1>
        <div v-if="payWay !== 'with'" class="tw-flex -tw-ml-4">
          <div class="tw-pl-4 tw-w-1/2">
            <q-btn size="xl" class="tw-bg-green-700 tw-text-white tw-w-full" @click="finish">Без сдачи</q-btn>
          </div>
          <div class="tw-pl-4 tw-w-1/2">
            <q-btn class="tw-w-full" size="xl" color="primary" @click="payWay ='with'">Со сдачей</q-btn>
          </div>
        </div>
        <div v-else>
          <q-input class="tw-mb-4" v-model.number="cash" type="number" label="Наличные"></q-input>
          <div class="tw-mb-6 tw-space-y-2 tw-text-lg">
            <p>Общая сумма заказа: {{ $price(total) }}</p>
            <p>Наличные: {{ $price(cash) }}</p>
            <p class="tw-text-xl tw-font-medium">Сдача: {{ $price(money) }}</p>
          </div>
          <q-btn :disabled="money < 0" color="primary" @click="finish">Завершить</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity';
  import { ref } from 'vue';

  const props = defineProps<{
    modelValue: boolean,
    total: number
  }>();

  const payWay = ref<'with' | null>(null);
  const cash = ref(0);

  const money = computed(() => { return cash.value - props.total });

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'finish'): void,
  }>();

  function reset() {
    cash.value = 0;
    payWay.value = null;
  }

  function finish() {
    emit('finish');
    emit('update:modelValue', false);
  }
</script>
