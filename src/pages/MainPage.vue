<template>
  <q-page class="tw-px-4 tw-pt-4 tw-py-8 tw-pb-[80px]">
    <CatList class="tw-mb-3" :items="catsStore.items ?? []" #default="{ item }">
      <CatItem :item="item" :active="item.id === filter.categoryId" @click="_e => toggleCategory(item.id)" />
    </CatList>

    <TagList :tags="tagsFiltred" :showClear="!isEmptyTags" @clear="clearTags" #default="{ tag }">
      <TagItem :tag="tag" :active="hasTag(tag.id)" @click="toggleTag(tag)" />
    </TagList>

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
    <div id="pag"></div>
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
  import TagList from 'src/components/TagList.vue';
  import TagItem from 'src/components/TagItem.vue';
  import useProductsPags from 'src/composables/products-pags';
  import useProductFilter from 'src/composables/products-filter';
  import useTagsWithFilter from 'src/composables/tags-with-product-filter';
  import { useCategoriesStore } from 'src/stores/categories';
  import useInfiniteLoading from 'src/composables/infinite-loading';
  import { watch } from 'vue';

  const { filter, toggleCategory, toggleTag, clearTags, hasTag, isEmptyTags } = useProductFilter({ withTags: '1', visible: true })
  const { tagsFiltred } = useTagsWithFilter(filter);
  const catsStore = useCategoriesStore();
  const { products, getProducts, reset, loadMore } = useProductsPags({ limit: 18 });

  useInfiniteLoading('#pag', () => loadMore(filter));

  watch(filter, () => {
    reset();
    getProducts(filter);
  });
</script>
