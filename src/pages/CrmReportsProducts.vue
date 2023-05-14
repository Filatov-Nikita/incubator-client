<template>
  <q-page class="tw-p-4 tw-pt-6 tw-pb-10">
    <h1 class="tw-text-2xl tw-font-semibold tw-mb-4">Отчет продаж по товарам</h1>

    <section class="tw-mb-8">
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
              <div class="col">
                <q-select
                  filled
                  v-model="cat"
                  :options="catsStore.items ?? []"
                  label="Категория"
                  option-label="name"
                  option-value="id"
                />
              </div>
            </div>
            <div class="flex q-gutter-md">
              <q-btn label="Применить" color="secondary" @click="_e => showData()" />
              <q-btn
                v-if="showReset"
                label="Сбросить"
                color="negative"
                @click="resetFilter"
              />
            </div>
          </q-card-section>
        </q-slide-transition>
      </q-card>
    </section>

    <div class="tw-mb-2 tw-font-bold tw-text-xl" v-if="data">
      Выручка: {{ $price(data?.total) }}
    </div>
    <div class="tw-mb-4 tw-font-medium tw-text-md" v-if="data">
      Продано всего:
      <span class="tw-font-bold tw-text-lg text-primary">
        {{ $prettyNumber(data?.totalCount) }} (шт)
      </span>
    </div>

    <q-table
      v-if="data"
      :columns="columns"
      :rows="data.products"
      rows-per-page-label="Показывать на странице"
      :pagination-label="pagLabel"
      :rows-per-page-options="papOpts"
      hide-pagination
    >
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
  import { useReportsStore } from 'src/stores/reports';
  import { ref, getCurrentInstance, reactive, computed } from 'vue';
  import type { Report } from 'src/types/reports';
  import type { Category } from 'src/types/categories';
  import { useCategoriesStore } from 'src/stores/categories';

  const [ today ] = new Date().toISOString().split('T');

  const store = useReportsStore();
  const catsStore = useCategoriesStore();
  const data = ref<Report | null>(null);
  const inst = getCurrentInstance();
  const cat = ref<Category | null>(null);
  const filter = reactive({
    dateFrom: today,
    dateTo: today,
  });

  function pagLabel(firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) {
    return `${firstRowIndex}-${endRowIndex} из ${totalRowsNumber}`
  }

  // const papOpts = [20, 40, 60, 80, 100, 'Все'];

  const papOpts = [0];

  const columns = [
    {
      name: 'name',
      label: 'Наименование',
      field: (row: any) => row.product.name,
      align: 'left' as const
    },
    {
      name: 'count',
      label: 'Цена за ед.',
      field: (row: any) => row.productPrice,
      align: 'left' as const,
    },
    {
      name: 'count',
      label: 'Количество',
      field: (row: any) => row.count,
      align: 'left' as const,
    },
    {
      name: 'sum',
      label: 'Сумма',
      field: (row: any) => row.totalSum,
      format: (val: any) => inst?.appContext.config.globalProperties.$price(val),
      align: 'left' as const,
    },
  ];

  async function showData() {
    data.value = await store.showProductsSold({...filter, categoryId: cat.value?.id.toString() || ''});
  }

  function resetFilter() {
    Object.assign(filter, {
      dateFrom: '',
      dateTo: '',
      categoryId: ''
    });
    cat.value = null;

    showData();
  }

  const showReset = computed(() => {
    return filter.dateFrom || filter.dateTo || cat.value;
  });

  showData();
</script>
