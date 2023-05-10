<template>
  <q-page class="tw-p-4 tw-pt-6">
    <div class="tw-border tw-border-black tw-max-w-3xl">
      <div
        v-for="item in flatList"
        class="tw-border-b tw-border-black tw-p-2 last:tw-border-0"
      >
        <div class="tw-flex tw-justify-between tw-mb-2">
          <p class="tw-text-4xl tw-font-bold">{{ item.group }} -</p>
          <p class="tw-text-4xl tw-font-bold">{{ $price(item.price) }}</p>
        </div>
        <div class="tw-flex tw-flex-wrap">
          <p>
            ({{ item.age }} суточный)
            {{ item.products }}
            (от {{ item.date }})
          </p>
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
    kurochka: 'Курочка',
    petuh: 'Петушок',
    nesushka: 'Несушка',
    dominant: 'Доминант',
    cvetBroiler: 'Цветной бройлер',
    utka: 'Утенок',
    utkaBroiler: 'Бройлерная утка',
    mulard: 'Мулард',
    gus: 'Гусь',
    induk: 'Индюшата'
  }

  const groupsFilters = {
    brojler: [
      (name: string) => name.indexOf('кобб') !== -1,
      (name: string) => name.indexOf('росс') !== -1,
      (name: string) => name.indexOf('арбор') !== -1,
      (name: string) => name.indexOf('айкрес') !== -1,
    ],
    kurochka: [
      (name: string) => name.indexOf('ломан браун') !== -1,
    ],
    petuh: [
      (name: string) => name.indexOf('пету') !== -1,
    ],
    nesushka: [
      (name: string) => name.indexOf('несушк') !== -1,
    ],
    dominant: [
      (name: string) => name.indexOf('доминант') !== -1,
    ],
    cvetBroiler: [
      (name: string) => name.indexOf('цветной бройлер') !== -1,
      (name: string) => name.indexOf('голошейка') !== -1,
      (name: string) => name.indexOf('мастер грей') !== -1,
      (name: string) => name.indexOf('редбро') !== -1,
    ],
    utka: [
      (name: string) => name.indexOf('цветная башкирская') !== -1,
      (name: string) => name.indexOf('агидель') !== -1,
      (name: string) => name.indexOf('фаворит') !== -1,
    ],
    utkaBroiler: [
      (name: string) => name.indexOf('стар53') !== -1,
      (name: string) => name.indexOf('ST-5') !== -1,
    ],
    mulard: [
      (name: string) => name.indexOf('мулард') !== -1,
    ],
    gus: [
      (name: string) => name.indexOf('Гусь') !== -1,
      (name: string) => name.indexOf('итальянский белы') !== -1,
      (name: string) => name.indexOf('крупно-серы') !== -1,
      (name: string) => name.indexOf('линда') !== -1,
    ],
    induk: [
      (name: string) => name.indexOf('биг-6') !== -1,
      (name: string) => name.indexOf('бронзовые') !== -1,
    ]
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

  const flatList = computed(() => {
    const groups = productsList.value;
    const list = [];
    for(let group in groups) {
      for(let date in groups[group]) {
        for(let price in groups[group][date]) {
          const products = groups[group][date][price];
          list.push({
            products: products.map((p: any) => `"${p.name}"`).join(', ') as string,
            group: (groupsLabels as any)[group] as string,
            price: +price,
            age: products[0].age as number,
            date
          });
        }
      }
    }
    return list;
  });
</script>
