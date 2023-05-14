<template>
  <section>
    <q-card>
      <q-card-section class="bg-primary text-white q-py-sm">
        <div class="flex justify-between items-center">
          <div class="text-md text-weight-bold">Фильтр</div>
        </div>
      </q-card-section>

      <q-separator />
      <q-slide-transition>
        <q-card-section>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col">
              <q-input
                v-model="filter.dateFrom"
                filled
                type="date"
                hint="Начало периода"
              />
            </div>
            <div class="col">
              <q-input
                v-model="filter.dateTo"
                filled
                type="date"
                hint="Конец периода"
              />
            </div>
          </div>
          <div class="flex q-gutter-md">
            <q-btn label="Применить" color="secondary" @click="apply" />
            <q-btn
              label="Сбросить"
              color="negative"
              @click="reset"
            />
          </div>
        </q-card-section>
      </q-slide-transition>
    </q-card>
  </section>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  interface Filter {
    dateFrom: string,
    dateTo: string
  }

  const emit = defineEmits<{
    (event: 'apply', filter: Filter): void
  }>();

  const [ today ] = new Date().toISOString().split('T');

  const filter = reactive({
    dateFrom: today,
    dateTo: today
  });

  function reset() {
    Object.assign(filter, { dateFrom: '', dateTo: '' });
  }

  function apply() {
    emit('apply', filter);
  }

  apply();
</script>
