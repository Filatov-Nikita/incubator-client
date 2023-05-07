<template>
  <ProductItem :item="item">
    <template #actions>
      <q-btn
        color="blue"
        size="sm"
        round
        icon="content_copy"
        @click="toggleCopyModal"
      />
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
      @update="updateProduct"
      @add:tags="tags => addTags(item.id, tags)"
      @remove:tags="tags => removeTags(item.id, tags)"
    />
    <DialodProductCopy
      v-model="showCopyModal"
      :item="item"
      :loading="creating"
      @create="createProduct"
    />
  </ProductItem>
</template>

<script setup lang="ts">
  import DialodProductUpdate from 'src/components/DialodProductUpdate.vue';
  import DialodProductCopy from 'src/components/DialodProductCopy.vue';
  import ProductItem from 'src/components/ProductItem.vue';
  import type { ProductBody, Product } from 'src/types/products';
  import { Tag } from 'src/types/tags';
  import { ref } from 'vue';

  const showModal = ref(false);
  const showCopyModal = ref(false);

  function setModal(val: boolean) {
    showModal.value = val;
  }

  const props = defineProps<{
    item: Product,
    update: (id: number, body: Partial<ProductBody>, onSuccess?: (p: Product) => void) => Promise<null | undefined>,
    create: (body: ProductBody, tags: Tag[], onSuccess?: (p: Product) => void) => Promise<void>,
    addTags: (productId: number, tags: Tag[]) => Promise<void>,
    removeTags: (productId: number, tags: Tag[]) => Promise<void>,
  }>();

  const updating = ref(false);
  const creating = ref(false);

  async function hideShow(id: number, product: Product) {
    updating.value = true;
    await props.update(id, { visible: !product.visible });
    updating.value = false;
  }

  function toggleCopyModal() {
    showCopyModal.value = !showCopyModal.value;
  }

  async function updateProduct(body: Partial<ProductBody>) {
    updating.value = true;
    await props.update(props.item.id, body, () => setModal(false));
    updating.value = false;
  }

  async function createProduct(body: ProductBody, tags: Tag[]) {
    creating.value = true;
    await props.create(body, tags, toggleCopyModal);
    creating.value = false;
  }
</script>
