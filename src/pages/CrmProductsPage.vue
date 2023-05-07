<template>
  <q-page class="tw-p-4 tw-pt-6">
    <h1 class="tw-text-2xl tw-font-semibold tw-mb-4">Продукты</h1>
    <div class="tw-mb-4">
      <q-btn color="primary" @click="toogleCreate">Добавить</q-btn>
    </div>
    <ProductList :items="products ?? []" #default="{ item }">
      <CrmProductItem
        :item="item"
        :update="update"
        :addTags="addTags"
        :removeTags="removeTags"
        :create="create"
      />
    </ProductList>
    <DialodProductCreate
      :loading="creating"
      v-model="showCreate"
      @create="(body, tags) => create(body, tags, toogleCreate)"
    />
    <div id="pag"></div>
  </q-page>
</template>

<script setup lang="ts">
  import ProductList from 'src/components/ProductList.vue';
  import CrmProductItem from 'src/components/CrmProductItem.vue';
  import DialodProductCreate from 'src/components/DialodProductCreate.vue';
  import useProductsPags from 'src/composables/products-pags';
  import useInfiniteLoading from 'src/composables/infinite-loading';
  import { ref } from 'vue';
  import type { Tag } from 'src/types/tags';

  const showCreate = ref(false);

  const {
    products,
    creating,
    loadMore,
    create,
    update,
    updateLocal,
    attachTags,
    dettachTags
  } = useProductsPags({ limit: 18 });

  useInfiniteLoading('#pag', () => loadMore({ withTags: '1' }));

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
