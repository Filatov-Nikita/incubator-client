<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    @before-hide="resetForm"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">Добавить товар</div>
      <q-form class="tw-space-y-2" @submit="submit">
        <q-input v-model="form.name" label="Наименование" :rules="rules.name" hide-bottom-space />
        <q-input v-model="form.price" label="Цена" type="number" :rules="rules.price" hide-bottom-space />
        <q-input v-model="form.description" label="Описание (необязательно)" />
        <q-select
          v-model="form.category"
          label="Категория"
          :options="catsStore.items ?? []"
          optionLabel="name"
          optionValue="id"
          :rules="rules.category"
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
        />
        <q-file v-model="form.img" label="Изображение">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div class="tw-pt-4">
          <q-btn type="submit" color="primary" label="Сохранить" :loading="loading" />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import type { ProductBody } from 'src/types/products';
  import type { Category } from 'src/types/categories';
  import type { Tag } from 'src/types/tags';
  import { reactive, ref } from 'vue';
  import { useCategoriesStore } from 'src/stores/categories';
  import { useTagsStore } from 'src/stores/tags';

  defineProps<{
    modelValue: boolean,
    loading: boolean
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'create', product: ProductBody, tags: Tag[]): void,
  }>();

  const catsStore = useCategoriesStore();
  const tagsStore = useTagsStore();

  const tags = ref<Tag[]>([]);
  const tagsOpts = ref<Tag[]>();

  const requiredRule = (val: any) => !!val || 'Поле обязательно для заполнения';

  const rules = {
    name: [ requiredRule ],
    price: [ requiredRule ],
    category: [ requiredRule ],
  };

  const form = reactive({
    name: '',
    price: '',
    description: '',
    img: null as File | null,
    category: null as Category | null,
    visible: true
  });

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

  async function submit() {
    const body = {
      name: form.name,
      price: +form.price,
      description: form.description,
      img: form.img,
      categoryId: form.category?.id ?? null,
      visible: form.visible
    };

    emit('create', body, tags.value);
  }

  function resetForm() {
    tags.value = [];
    Object.assign(form, {
      name: '',
      price: '',
      description: '',
      img: null as File | null,
      category: null as Category | null,
      visible: true
    });
  }
</script>
