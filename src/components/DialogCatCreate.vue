<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
    @beforeHide="resetForm"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">Добавить категорию</div>
      <q-form class="tw-space-y-2" @submit="submit">
        <q-input v-model="form.name" label="Наименование" :rules="[ requiredRule ]" />
        <q-input v-model="form.description" label="Описание" />
        <div  class="tw-pt-4">
          <q-btn color="primary" type="submit" :loading="loading">Сохранить</q-btn>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { CategoryBody } from 'src/types/categories';
  import { reactive } from 'vue';

  const props = defineProps<{
    modelValue: boolean,
    loading: boolean,
  }>();

  const requiredRule = (val: any) => !!val || 'Поле обязательно для заполнения';

  const form = reactive({
    name: '',
    description: ''
  });

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'create', cat: CategoryBody): void,
  }>();

  async function submit() {
    emit('create', form);
  }

  function resetForm() {
    form.name = '';
    form.description = '';
  }
</script>
