<template>
  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <q-card class="tw-bg-gray-200 tw-pb-[130px]">
      <q-card-section>
        <div class="tw-text-3xl tw-font-semibold tw-mb-4">Заказ</div>
        <CartList class="tw-mb-8" :items="cartStore.products" />
      </q-card-section>
      <q-page-sticky class="tw-bg-gray-200 tw-p-4 tw-rounded-md cart-sticky" position="bottom-right" :offset="[18, 20]">
        <div class="tw-text-xl tw-font-semibold tw-text-right tw-mb-6 tw-w-80">
          Общая сумма: {{ $price(cartStore.totalSum) }}
        </div>
        <div class="tw-text-right">
          <q-btn class="tw-mr-2" color="negative" label="Отмена" @click="close"/>
          <q-btn :disabled="cartStore.products.length === 0" color="positive" label="Завершить" @click="showFinish = true"/>
        </div>
      </q-page-sticky>
      <DialogCartFinish v-model="showFinish" :total="cartStore.totalSum" @finish="createOrder" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useCartStore } from 'src/stores/cart';
  import { useOrdersStore } from 'src/stores/orders';
  import CartList from 'src/components/CartList.vue';
  import DialogCartFinish from 'src/components/DialogCartFinish.vue';
  import { Loading, Notify } from 'quasar';
  import { ref } from 'vue';

  defineProps<{ modelValue: boolean }>();
  const showFinish = ref(false);
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
<style>
.cart-sticky {
  border-radius: 6px !important;
  @apply tw-bg-yellow-100 tw-shadow-sm tw-shadow-gray-500 !important;
}
</style>
