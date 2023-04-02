<template>
  <q-page class="tw-px-4 tw-pt-4 tw-py-8 tw-pb-[80px]">
    <CatList class="tw-mb-4" :items="catsStore.items ?? []">
      <template #default="{ item }">
        <CatItem :item="item" :active="item.id === filter.categoryId" @click="_e => setCat(item.id)" />
      </template>
    </CatList>

    <div class="tw-mb-4">
      <div class="-tw-ml-3 tw-min-h-[30px]">
        <q-btn
          rounded
          size="8px"
          class="tw-text-white tw-cursor-pointer tw-px-4 tw-py-[5px] tw-ml-3"
          :class="[tag.color, { 'tw-opacity-30': filter.tags?.includes(tag.id) ?? false }]"
          v-for="tag in tags" :key="tag.id"
          @click="_e => setTag(tag)"
        >
          {{ tag.name}}
        </q-btn>
      </div>

      <div class=" tw-min-h-[25px]">
        <q-btn v-show="filter.tags?.length" size="sm" padding="4px" flat @click="filter.tags = []" icon-right="close">сброс</q-btn>
      </div>
    </div>

    <ProductList :items="products ?? []" #default="{ item }">
      <DialogWrapper #default="{ show, setValue }">
        <ProductItem :item="item" @click="_e => setValue(true)"/>
          <DialogProductAdd
          :item="item"
          :model-value="show"
          @update:model-value="setValue"
        />
      </DialogWrapper>
    </ProductList>
    <CartSticky />
  </q-page>
</template>

<script setup lang="ts">
  import ProductList from 'src/components/ProductList.vue';
  import ProductItem from 'src/components/ProductItem.vue';
  import CartSticky from 'src/components/CartSticky.vue';
  import DialogProductAdd from 'src/components/DialogProductAdd.vue';
  import DialogWrapper from 'src/components/DialogWrapper.vue';
  import CatList from 'src/components/CatList.vue';
  import CatItem from 'src/components/CatItem.vue';
  import { useProductsStore } from 'src/stores/products';
  import { useCategoriesStore } from 'src/stores/categories';
  import { computed, watch, reactive } from 'vue';
  import useProducts from 'src/composables/products';
  import { ProductFilter } from 'src/types/products';
  import { useTagsStore } from 'src/stores/tags';
  import type { Tag } from 'src/types/tags';


  const filter: ProductFilter = reactive({ withTags: '1', visible: true });

  function setCat(catId: number) {
    if(filter.categoryId === catId) {
      delete filter.categoryId;
    } else {
      filter.categoryId = catId;
    }

    filter.tags = [];
  }

  function setTag(tag: Tag) {
    if(!filter.tags) filter.tags = [];

    if(filter.tags.includes(tag.id)) filter.tags = filter.tags.filter(t => t !== tag.id);
    else filter.tags.push(tag.id);
  }

  const productsStore = useProductsStore();
  const catsStore = useCategoriesStore();
  const tagsStore = useTagsStore();
  const { products, getProducts } = useProducts();

  const tagsVisible = computed(() => {
    if(tagsStore.items === null) return [];
    return tagsStore.items.filter(tag => tag.visible);
  });

  const tags = computed(() => {
    if(!filter.categoryId) return tagsVisible.value;
    return tagsVisible.value.filter(tag => tag.categoryId === filter.categoryId && tag.visible);
  });

  watch(filter, () => {
    getProducts(filter);
  }, { immediate: true });
</script>
