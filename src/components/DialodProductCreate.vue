<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    @before-hide="formRef?.resetForm"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">Добавить товар</div>
      <FormProduct
        ref="formRef"
        :tags="tags"
        :categories="categories"
        :loading="loading"
        submitLabel="Сохранить"
        @submit="submit"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { ProductBody } from 'src/types/products';
  import type { Tag } from 'src/types/tags';
  import { useCategoriesStore } from 'src/stores/categories';
  import { useTagsStore } from 'src/stores/tags';
  import FormProduct, { type Form } from './FormProduct.vue';
  import { computed } from 'vue';

  defineProps<{
    modelValue: boolean,
    loading: boolean
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'create', product: ProductBody, tags: Tag[]): void,
  }>();

  const formRef = ref<InstanceType<typeof FormProduct> | null>(null);

  const catsStore = useCategoriesStore();
  const tagsStore = useTagsStore();

  const categories = computed(() => catsStore.items ?? []);
  const tags = computed(() => tagsStore.items ?? []);

  async function submit(form: Form) {
    const body = {
      name: form.name!,
      price: +form.price,
      description: form.description,
      img: form.img ?? form.imgUrl,
      categoryId: form.category?.id ?? null,
      visible: form.visible
    };

    emit('create', body, form.tags);
  }
</script>
