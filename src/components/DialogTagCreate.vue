<template>
  <q-dialog
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    @beforeHide="resetForm"
  >
    <q-card class="tw-w-full tw-p-4">
      <div class="tw-text-lg tw-font-semibold tw-mb-4">Добавить тег</div>
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
        <div class="tw-pt-4">
          <q-btn color="primary" type="submit" :loading="loading">Сохранить</q-btn>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useCategoriesStore } from 'src/stores/categories';
  import { type TagBody, colors } from 'src/types/tags';
  import { type Category } from 'src/types/categories';
  import { reactive, ref } from 'vue';

  const catsStore = useCategoriesStore();

  defineProps<{
    modelValue: boolean,
    loading: boolean
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
    (event: 'create', tag: TagBody): void,
  }>();

  const requiredRule = (val: any) => !!val || 'Поле обязательно для заполнения';

  const rules = {
    name: [ requiredRule ],
    category: [ requiredRule ],
    colors: [ requiredRule ],
  };

  const category = ref<Category | null>(null);

  const form: TagBody = reactive({
    name: '',
    color: 'purple',
    categoryId: null,
    visible: true
  });

  async function submit() {
    form.categoryId = category.value?.id ?? null;
    emit('create', form);
  }

  function resetForm() {
    form.name = '';
    form.color = 'purple';
    form.categoryId = null;
    form.visible = true;
    category.value = null;
  }
</script>
