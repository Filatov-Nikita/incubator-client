<template>
  <q-page class="tw-p-4 tw-pt-6">
    <h1 class="tw-text-2xl tw-font-semibold tw-mb-4">Продукты</h1>
    <div class="tw-mb-4">
      <q-btn color="primary" @click="toogleCreate">Добавить</q-btn>
    </div>
    <ProductList :items="sortedProducts" animation-name="list">
      <template #default="{ item }">
        <DialogWrapper #default="{ show, setValue }">
          <ProductItem :item="item">
            <template #actions>
              <q-btn
                color="primary"
                size="sm"
                round
                icon="edit"
                @click="_e => setValue(true)"
              />
              <q-btn
                round
                :color="item.visible ? 'negative' : `positive`"
                size="sm"
                :icon="item.visible ? 'visibility_off' : `visibility`"
                @click="_e => hideShow(item.id, item)"
              />
            </template>
            <DialodProductUpdate
              :item="item"
              :model-value="show"
              :loading="updating"
              @update:model-value="setValue"
              @update="body => update(item.id, body, () => setValue(false))"
              @add:tags="tags => addTags(item.id, tags)"
              @remove:tags="tags => removeTags(item.id, tags)"
            />
          </ProductItem>
        </DialogWrapper>
      </template>
    </ProductList>
    <DialodProductCreate
      :loading="creating"
      v-model="showCreate"
      @create="(body, tags) => create(body, tags, toogleCreate)"
    />
  </q-page>
</template>

<script setup lang="ts">
  import ProductItem from 'src/components/ProductItem.vue';
  import ProductList from 'src/components/ProductList.vue';
  import DialodProductCreate from 'src/components/DialodProductCreate.vue';
  import DialodProductUpdate from 'src/components/DialodProductUpdate.vue';
  import DialogWrapper from 'src/components/DialogWrapper.vue';
  import useProducts from 'src/composables/products';
  import { ref, computed } from 'vue';
  import type { Product } from 'src/types/products';
import { Tag } from 'src/types/tags';

  const showCreate = ref(false);

  const { getProducts, products, create, creating , update, updating, updateLocal, attachTags, dettachTags } = useProducts();

  const sortedProducts = computed(() => {
    if(products.value === null) return [];
    return [...products.value].sort((p1, p2) => +p2.visible - +p1.visible);
  });

  getProducts({ withTags: '1' });

  function hideShow(id: number, product: Product) {
    update(id, { visible: !product.visible });
  }

  function toogleCreate() {
    showCreate.value = !showCreate.value
  }

  async function addTags(id: number, tags: Tag[]) {
    const product = await attachTags(id, tags);
    if(product === null) return;
    updateLocal(id, product);
  }

  async function removeTags(id: number, tags: Tag[]) {
    const product = await dettachTags(id, tags);
    if(product === null) return;
    updateLocal(id, product);
  }
</script>
