<template>
  <q-page class="tw-p-4 tw-pt-6">
    <div class="tw-border tw-border-black tw-max-w-3xl">
      <div v-for="(dates, group) in productsList">
        <div v-for="(prices, date) in dates">
          <div
            class="tw-border-b tw-border-black tw-p-2"
            v-for="(products, price) in prices"
          >
            <div class="tw-flex tw-justify-between tw-mb-2">
              <p class="tw-text-4xl tw-font-bold">{{ (groupsLabels as any)[group] }} -</p>
              <p class="tw-text-4xl tw-font-bold">{{ $price(price) }}</p>
            </div>
            <div class="tw-flex tw-flex-wrap tw-space-x-2">
              <p>({{ products[0].age }} суточный)</p>
              <div v-for="product in products">
                "{{ product.name }}"
              </div>
              <p>(от {{ date }})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import useProducts from 'src/composables/products-pags';
  import { useCategoriesStore } from 'src/stores/categories';
  import { computed } from 'vue';
  import { Product } from 'src/types/products';

  type ParsedProduct = Product & { birthday: string, cleanedName: string, age: number };

  const catsStore = useCategoriesStore();
  const { products, loadMore } = useProducts({ limit: 1000 });

  if(catsStore.items === null) throw new Error('Нет категорий');

  const cat = computed(() => {
    if(catsStore.items === null) return;
    const cat = catsStore.items.find(i => i.name.toLowerCase() === 'птица');
    if(!cat) return;
    return cat;
  });

  loadMore({ categoryId: cat.value?.id, visible: true });

  function getBirthday(days: number) {
    const now = new Date();
    now.setDate(now.getDate() - (days - 1));
    return now;
  }

  function withZero(n: number) {
    return n < 10 ? `0${n}` : n.toString();
  }

  function prettyDate(date: Date) {
    return `${withZero(date.getDate())}.${withZero(date.getMonth() + 1)}.${date.getFullYear()}`;
  }

  function cleanName(name: string) {
    return name.toLowerCase().trim().replace(/[^A-Za-zА-Яа-я0-9]/g, ' ');
  }

  function getAge(name: string) {
    const age = name.match(/([0-9]+) сут/g);
    if(!age) throw new Error('Возраст не указан');
    return Number(age[0].split(' ')[0]);
  }

  const groupsLabels = {
    brojler: 'Бройлер',
    kurochka: 'Курочка'
  }

  const groupsFilters = {
    brojler: [
      (name: string) => name.indexOf('кобб') !== -1,
      (name: string) => name.indexOf('росс') !== -1,
    ],
    kurochka: [
      (name: string) => name.indexOf('ломан браун') !== -1,
    ],
  }

  function makeProduct(product: Product) {
    try {
      const cleanedName = cleanName(product.name);
      const age = getAge(cleanedName);
      const birthday = prettyDate(getBirthday(age));
      return {
        ...product,
        age,
        cleanedName,
        birthday,
      }
    } catch {
      return null;
    }
  }

  const parsedProducts = computed(() => {
    if(products.value === null) return [];
    return products.value.map(makeProduct).filter(p => p !== null) as ParsedProduct[];
  });

  const productsList = computed(() => {
    const groups: any = {};

    parsedProducts.value.forEach((product) => {
      for(let key in groupsFilters) {
        const filters = (groupsFilters as any)[key];
        const res = filters.some((filter: any) => filter(product.cleanedName));

        if(res) {
          if(!groups[key]) groups[key] = {};
          if(!groups[key][product.birthday]) groups[key][product.birthday] = {};
          if(!groups[key][product.birthday][product.price]) groups[key][product.birthday][product.price] = [];

          groups[key][product.birthday][product.price].push(product);
        }
      }
    });

    return groups;
  });

</script>
