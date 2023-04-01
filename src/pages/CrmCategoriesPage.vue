<template>
  <q-page class="tw-p-4 tw-pt-6">
    <h1 class="tw-text-2xl tw-font-semibold tw-mb-4">Категории</h1>
    <div class="tw-mb-4">
      <q-btn color="primary" @click="toogleCreate">Добавить</q-btn>
    </div>

    <q-list padding bordered separator>
      <DialogWrapper
        #default="{ show, setValue }"
        v-for="cat in catsStore.items"
        :key="cat.id"
      >
        <q-item>
          <q-item-section>
            <q-item-label>{{ cat.name }}</q-item-label>
            <q-item-label caption lines="2">{{ cat.description }}</q-item-label>
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
                :loading="removing === cat.id"
                @click="_e => remove(cat.id)"
              />
            </div>
          </q-item-section>
          <DialogCatUpdate
            :loading="updating === cat.id"
            :category="cat"
            :model-value="show"
            @update:model-value="setValue"
            @update="body => update(cat.id, body, () => setValue(false))"
          />
        </q-item>
      </DialogWrapper>
    </q-list>

    <DialogCatCreate v-model="showCreate" :loading="creating" @create="create" />
  </q-page>
</template>

<script setup lang="ts">
  import DialogCatCreate from 'src/components/DialogCatCreate.vue';
  import DialogCatUpdate from 'src/components/DialogCatUpdate.vue';
  import DialogWrapper from 'src/components/DialogWrapper.vue';
  import { useCategoriesStore } from 'src/stores/categories';
  import { ref } from 'vue';
  import { Notify } from 'quasar';
  import type { CategoryBody } from 'src/types/categories';

  const removing = ref<number | null>(null);
  const creating = ref(false);
  const updating = ref<number | null>(null);
  const catsStore = useCategoriesStore();
  const showCreate = ref(false);

  function toogleCreate() {
    showCreate.value = !showCreate.value
  }

  async function create(body: CategoryBody) {
    try {
      creating.value = true;
      await catsStore.create(body);
      toogleCreate();
      Notify.create({ type: 'positive', message: 'Обновление категории выполнено' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось обновить категорию' });
    } finally {
      creating.value = false;
    }
  }

  async function update(id: number, body: Partial<CategoryBody>, cb: Function) {
    try {
      updating.value = id;
      await catsStore.update(id, body);
      cb();
      Notify.create({ type: 'positive', message: 'Создание категории выполнено' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось создать категорию' });
    } finally {
      updating.value = null;
    }
  }

  async function remove(id: number) {
    try {
      removing.value = id;
      await catsStore.remove(id);
      Notify.create({ type: 'positive', message: 'Удаление категории выполнено' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось удалить категорию' });
    } finally {
      removing.value = null;
    }
  }
</script>
