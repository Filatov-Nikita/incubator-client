<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
    @beforeHide="formRef?.resetForm"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">{{ item.name }}</div>
      <FormProduct
        ref="formRef"
        hiddenName
        :initialValues="initialValues"
        :categories="categories"
        :tags="tags"
        submitLabel="Обновить"
        @submit="submit"
        @add:tag="addTags"
        @remove:tag="removeTag"
        @clear:tag="clearTags"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import type { ProductBody, Product } from 'src/types/products';
  import type { Tag } from 'src/types/tags';
  import { ref, computed } from 'vue';
  import { useCategoriesStore } from 'src/stores/categories';
  import { useTagsStore } from 'src/stores/tags';
  import FormProduct, { type Form } from './FormProduct.vue';

  const props = defineProps<{
    modelValue: boolean,
    loading: boolean,
    item: Product
  }>();

  const formRef = ref<InstanceType<typeof FormProduct> | null>(null);

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'update', product: Partial<ProductBody>): void,
    (event: 'add:tags', tag: Tag[]): void,
    (event: 'remove:tags', tag: Tag[]): void,
  }>();

  const catsStore = useCategoriesStore();
  const tagsStore = useTagsStore();

  const categories = computed(() => catsStore.items ?? []);
  const tags = computed(() => tagsStore.items ?? []);

  const initialValues = computed(() => {
    const item = props.item;
    return {
      price: item.price.toString(),
      description: item.description ?? '',
      category: item.categoryId ? catsStore.getItem(item.categoryId) : null,
      tags: item.tags
    }
  });

  async function submit(form: Form) {
    const body = {
      price: +form.price,
      description: form.description,
      img: form.img,
      categoryId: form.category?.id ?? null,
    };

    emit('update', body);
  }

  function addTags(tag: Tag) {
    emit('add:tags', [ tag ]);
  }

  function removeTag(tag: Tag) {
    emit('remove:tags', [ tag ]);
  }

  function clearTags(tags: Tag[]) {
    emit('remove:tags', tags);
  }
</script>
