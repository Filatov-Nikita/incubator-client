<template>
  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <q-card class="tw-bg-gray-200">
      <q-card-section>
        <div class="tw-text-3xl tw-font-semibold tw-mb-4">Заказ</div>
        <CartList class="tw-mb-8" :items="cartStore.products" />
      </q-card-section>
      <q-page-sticky position="bottom-right" :offset="[30, 20]">
        <div class="tw-text-lg tw-font-semibold tw-text-right tw-mb-6 tw-w-80">
          Общая сумма: {{ cartStore.totalSum }} руб.
        </div>
        <div class="tw-text-right">
          <q-btn class="tw-mr-2" color="negative" label="Отмена" @click="close"/>
          <q-btn :disabled="cartStore.products.length === 0" color="positive" label="Завершить" @click="createOrder"/>
        </div>
      </q-page-sticky>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useCartStore } from 'src/stores/cart';
  import { useOrdersStore } from 'src/stores/orders';
  import CartList from 'src/components/CartList.vue';
  import { Loading, Notify } from 'quasar';

  defineProps<{ modelValue: boolean }>();
  const emit = defineEmits<{ (event: 'update:modelValue', value: boolean): void }>();

  const cartStore = useCartStore();
  const ordersStore = useOrdersStore();

  async function createOrder() {
    try {
      Loading.show();
      await ordersStore.create({
        products: cartStore.products
      });
      Notify.create({ type: 'positive', message: 'Заказ создан успешно' });
      cartStore.clear();
      close();
    } catch(e) {
      Notify.create({ type: 'negative', message: 'Не удалось создать заказ' });
    } finally {
      Loading.hide();
    }
  }

  function close() {
    emit('update:modelValue', false);
  }
</script>
