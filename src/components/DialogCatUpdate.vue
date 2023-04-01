<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">{{ category.name }}</div>
      <q-form class="tw-space-y-2" @submit="submit">
        <q-input v-model="form.name" label="Наименование" :rules="[ requiredRule ]" />
        <q-input v-model="form.description" label="Описание" />
        <div class="tw-pt-4">
          <q-btn color="primary" type="submit" :loading="loading">
            Обновить
          </q-btn>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { Category, CategoryBody } from 'src/types/categories';
  import { reactive } from 'vue';

  const props = defineProps<{
    modelValue: boolean,
    loading: boolean,
    category: Category
  }>();

  const requiredRule = (val: any) => !!val || 'Поле обязательно для заполнения';

  const form = reactive({
    name: props.category.name,
    description: props.category.description
  });

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'update', product: Partial<CategoryBody>): void,
  }>();

  async function submit() {
    emit('update', form);
  }
</script>
