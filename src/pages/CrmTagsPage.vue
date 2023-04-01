<template>
  <q-page class="tw-p-4 tw-pt-6">
    <h1 class="tw-text-2xl tw-font-semibold tw-mb-4">Теги</h1>
    <div class="tw-mb-4">
      <q-btn color="primary" @click="toogleCreate">Добавить</q-btn>
    </div>

    <q-list separator bordered>
      <DialogWrapper
        #default="{ show, setValue }"
        v-for="tag in tagsStore.items"
        :key="tag.id"
      >
        <q-item>
          <q-item-section avatar>
            <div class="tw-w-4 tw-h-4 tw-rounded-full" :class="tag.color"></div>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ tag.name }}</q-item-label>
            <q-item-label caption lines="1">{{ getCat(tag)?.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div>
              <q-btn
                class="tw-mr-3"
                size="sm"
                color="positive"
                round
                icon="edit"
                @click="_e => setValue(true)"
              />
              <q-btn
                size="sm"
                color="negative"
                round
                icon="close"
                :loading="removing === tag.id"
                @click="_e => remove(tag.id)"
              />
            </div>
          </q-item-section>
        </q-item>
        <DialogTagUpdate
          :loading="updating === tag.id"
          :tag="tag"
          :model-value="show"
          @update:model-value="setValue"
          @update="body => update(tag.id, body, () => setValue(false))"
        />
      </DialogWrapper>
    </q-list>

    <DialogTagCreate v-model="showCreate" :loading="creating" @create="create" />
  </q-page>
</template>

<script setup lang="ts">
  import DialogTagCreate from 'src/components/DialogTagCreate.vue';
  import DialogTagUpdate from 'src/components/DialogTagUpdate.vue';
  import DialogWrapper from 'src/components/DialogWrapper.vue';
  import { useTagsStore } from 'src/stores/tags';
  import { useCategoriesStore } from 'src/stores/categories';
  import { ref } from 'vue';
  import { Notify } from 'quasar';
  import type { Tag, TagBody } from 'src/types/tags';

  const tagsStore = useTagsStore();
  const catsStore = useCategoriesStore();

  const showCreate = ref(false);
  const creating = ref(false);
  const updating = ref<number | null>(null);
  const removing = ref<number | null>(null);

  function toogleCreate() {
    showCreate.value = !showCreate.value
  }

  function getCat(tag: Tag) {
    if(tag.categoryId === null) return null;
    return catsStore.getItem(tag.categoryId);
  }

  async function create(body: TagBody) {
    try {
      creating.value = true;
      await tagsStore.create(body);
      toogleCreate();
      Notify.create({ type: 'positive', message: 'Создание тега выполнено' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось создать тег' });
    } finally {
      creating.value = false;
    }
  }

  async function update(id: number, body: Partial<TagBody>, cb: Function) {
    try {
      updating.value = id;
      await tagsStore.update(id, body);
      cb();
      Notify.create({ type: 'positive', message: 'Обновление тега выполнено' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось обновить тег' });
    } finally {
      updating.value = null;
    }
  }

  async function remove(id: number) {
    try {
      removing.value = id;
      await tagsStore.remove(id);
      Notify.create({ type: 'positive', message: 'Удаление тега выполнено' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось удалить тег' });
    } finally {
      removing.value = null;
    }
  }
</script>
