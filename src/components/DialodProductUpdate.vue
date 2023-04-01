<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
    @beforeHide="resetForm"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">{{ item.name }}</div>
      <q-form class="tw-space-y-2" @submit="submit">
        <q-input v-model="form.price" label="Цена" type="number" :rules="rules.price" hide-bottom-space />
        <q-input v-model="form.description" label="Описание (необязательно)" hide-bottom-space />
        <q-select
          v-model="form.category"
          label="Категория"
          :options="catsStore.items ?? []"
          optionLabel="name"
          optionValue="id"
          hide-bottom-space
        />
        <q-select
          v-model="tags"
          use-chips
          use-input
          label="Теги"
          :options="tagsOpts"
          option-label="name"
          option-key="id"
          clearable
          multiple
          @filter="filterFn"
          hide-bottom-space
          @add="({ value }) => addTags([ value as Tag ])"
          @remove="({ value }) => removeTags([ value as Tag ])"
          @clear="(tags) => removeTags(tags as Tag[])"
        >
        </q-select>
        <q-file v-model="form.img" label="Изображение">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div class="tw-pt-4">
          <q-btn type="submit" color="primary" label="Обновить" :loading="loading" />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import type { ProductBody, Product } from 'src/types/products';
  import type { Tag } from 'src/types/tags';
  import { reactive, ref } from 'vue';
  import { useCategoriesStore } from 'src/stores/categories';
  import { useTagsStore } from 'src/stores/tags';

  const props = defineProps<{
    modelValue: boolean,
    loading: boolean,
    item: Product
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'update', product: Partial<ProductBody>): void,
    (event: 'add:tags', tag: Tag[]): void,
    (event: 'remove:tags', tag: Tag[]): void,
  }>();

  const catsStore = useCategoriesStore();
  const tagsStore = useTagsStore();

  const tags = ref<Tag[]>(props.item.tags);
  const tagsOpts = ref<Tag[]>();

  function createForm() {
    return {
      price: props.item.price,
      description: props.item.description,
      img: null as File | null,
      category: props.item.categoryId ? catsStore.getItem(props.item.categoryId) : null,
    }
  }

  const form = reactive(createForm());

  function resetForm() {
    Object.assign(form, createForm());
  }

  const requiredRule = (val: any) => !!val || 'Поле обязательно для заполнения';

  const rules = {
    price: [ requiredRule ],
    category: [ requiredRule ],
  };

  async function submit() {
    const body = {
      price: +form.price,
      description: form.description,
      img: form.img,
      categoryId: form.category?.id ?? null,
    };

    emit('update', body);
  }

  function filterFn (val: any, update: any) {
    const list = tagsStore.items ?? [];
    if (val === '') {
      update(() => {
        tagsOpts.value = list;
      });
      return;
    }

    update(() => {
      const needle = val.toLowerCase()
      tagsOpts.value = list.filter(v => v.name.toLowerCase().indexOf(needle) > -1);
    })
  }

  function addTags(tags: Tag[]) {
    emit('add:tags', tags);
  }

  function removeTags(tags: Tag[]) {
    emit('remove:tags', tags);
  }
</script>
