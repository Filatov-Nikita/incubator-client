<template>
  <q-form class="tw-space-y-2" @submit="submit">
    <q-input
      v-if="!hiddenName"
      v-model="form.name"
      label="Наименование"
      :rules="rules.name"
      hide-bottom-space
    />
    <q-input
      v-model="form.price"
      label="Цена"
      type="number"
      :rules="rules.price"
      hide-bottom-space
    />
    <q-input
      v-model="form.description"
      label="Описание (необязательно)"
      hide-bottom-space
    />
    <q-select
      v-model="form.category"
      label="Категория"
      :options="categories"
      optionLabel="name"
      optionValue="id"
      :rules="rules.category"
      hide-bottom-space
    />
    <q-select
      v-model="form.tags"
      :options="tagOptions"
      use-chips
      use-input
      clearable
      multiple
      hide-bottom-space
      label="Теги"
      option-label="name"
      option-key="id"
      @filter="filterTags"
      @add="addTag"
      @remove="removeTag"
      @clear="clearTags"
    />
    <q-file v-model="form.img" label="Изображение">
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <div class="tw-pt-4">
      <q-btn type="submit" color="primary" :label="submitLabel" :loading="loading" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Category } from 'src/types/categories';
  import { Tag } from 'src/types/tags';
  import useRules from 'src/composables/use-rules';

  const props = defineProps<{
    hiddenName?: boolean,
    loading?: boolean,
    categories: Category[],
    tags: Tag[],
    submitLabel: string,
    initialValues?: Partial<Form>
  }>();

  const emit = defineEmits<{
    (event: 'submit', form: Form): void
    (event: 'remove:tag', tag: Tag): void
    (event: 'add:tag', tag: Tag): void
    (event: 'clear:tag', tags: Tag[]): void
  }>();

  export interface Form {
    name?: string,
    price: string,
    description: string,
    img: File | null,
    category: Category | null,
    visible: boolean,
    tags: Tag[]
  }

  function initForm(): Form {
    return Object.assign({
      name: props.hiddenName ? undefined : '',
      price: '',
      description: '',
      img: null,
      category: null,
      visible: true,
      tags: [],
    }, props.initialValues ?? {})
  }

  const form: Form = reactive(initForm());

  const tagOptions = ref<Tag[]>([]);
  const { required } = useRules();

  const rules = {
    name: [ required() ],
    price: [ required() ],
    category: [ required() ],
  };

  function filterTags (val: any, update: any) {
    if (val === '') {
      update(() => {
        tagOptions.value = props.tags;
      });
      return;
    }

    update(() => {
      const needle = val.toLowerCase()
      tagOptions.value = props.tags.filter(v => v.name.toLowerCase().indexOf(needle) > -1);
    })
  }

  function submit() {
    emit('submit', form);
  }

  function addTag(payload: { value: Tag }) {
    emit('add:tag', payload.value);
  }

  function removeTag(payload: { value: Tag }) {
    emit('remove:tag', payload.value);
  }

  function clearTags(tags: Tag[]) {
    emit('clear:tag', tags);
  }

  function resetForm() {
    Object.assign(form, initForm());
  }

  defineExpose({ resetForm });
</script>
