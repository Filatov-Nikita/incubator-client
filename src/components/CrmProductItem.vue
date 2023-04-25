<template>
  <ProductItem :item="item">
    <template #actions>
      <q-btn
        color="primary"
        size="sm"
        round
        icon="edit"
        @click="_e => setModal(true)"
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
      :model-value="showModal"
      :loading="updating"
      @update:model-value="setModal"
      @update="body => update(item.id, body, () => setModal(false))"
      @add:tags="tags => addTags(item.id, tags)"
      @remove:tags="tags => removeTags(item.id, tags)"
    />
  </ProductItem>
</template>

<script setup lang="ts">
  import DialodProductUpdate from 'src/components/DialodProductUpdate.vue';
  import DialogWrapper from 'src/components/DialogWrapper.vue';
  import ProductItem from 'src/components/ProductItem.vue';
  import type { ProductBody, Product } from 'src/types/products';
  import { Tag } from 'src/types/tags';
  import { ref } from 'vue';

  const showModal = ref(false);

  function setModal(val: boolean) {
    showModal.value = val;
  }

  const { update } = defineProps<{
    item: Product,
    update: (id: number, body: Partial<ProductBody>, onSuccess?: (p: Product) => void) => Promise<null | undefined>,
    addTags: (productId: number, tags: Tag[]) => Promise<void>,
    removeTags: (productId: number, tags: Tag[]) => Promise<void>,
  }>();

  const updating = ref(false);

  function hideShow(id: number, product: Product) {
    update(id, { visible: !product.visible });
  }

</script>
