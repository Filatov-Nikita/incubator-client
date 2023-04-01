<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">{{  }}</div>
      <q-form class="tw-space-y-2" @submit="submit">
        <q-input v-model="form.name" label="Наименование" :rules="rules.name" />
        <q-select v-model="form.color" :options="colors" label="Цвет" :rules="rules.colors">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <div class="tw-w-4 tw-h-4 tw-rounded-full" :class="scope.opt"></div>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="category"
          :options="catsStore.items ?? []"
          label="Категория"
          optionLabel="name"
          optionValue="id"
          :rules="rules.category"
        >
        </q-select>
        <q-toggle v-model="form.visible" label="Показать" left-label />
        <div class="tw-pt-4">
          <q-btn color="primary" type="submit" :loading="loading">Обновить</q-btn>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useCategoriesStore } from 'src/stores/categories';
  import { type TagBody, type Tag, colors } from 'src/types/tags';
  import { type Category } from 'src/types/categories';
  import { reactive, ref } from 'vue';

  const catsStore = useCategoriesStore();

  const props = defineProps<{
    modelValue: boolean,
    loading: boolean,
    tag: Tag
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'update', tag: Partial<TagBody>): void,
  }>();

  const requiredRule = (val: any) => !!val || 'Поле обязательно для заполнения';

  const rules = {
    name: [ requiredRule ],
    category: [ requiredRule ],
    colors: [ requiredRule ],
  };

  const category = ref<Category | null>(
    props.tag.categoryId ? catsStore.getItem(props.tag.categoryId) : null
  );

  const form: TagBody = reactive({
    name: props.tag.name,
    color: props.tag.color,
    categoryId: null,
    visible: props.tag.visible
  });

  async function submit() {
    form.categoryId = category.value?.id ?? null;
    emit('update', form);
  }
</script>
