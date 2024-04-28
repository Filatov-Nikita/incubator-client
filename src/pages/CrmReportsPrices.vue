<template>
  <q-page class="tw-p-4 tw-pt-6">
    <div class="tw-mb-4 print tw-space-x-4">
      <q-btn color="primary" outline icon="print" label="Печать" @click="print" />
      <q-btn color="orange" outline icon="today" label="Сегодня" @click="setToday" />
      <q-btn color="purple" outline icon="calendar_today" label="+ 1 день" @click="setTomorrow" />
    </div>
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
            (от {{ item.birthday }})
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import useProducts from 'src/composables/products-pags';
  import { useCategoriesStore } from 'src/stores/categories';
  import { computed, onUnmounted, ref } from 'vue';
  import { Product } from 'src/types/products';

  document.body.classList.add('printable');

  const now = ref(new Date());

  function setTomorrow() {
    const dt = new Date(now.value);
    dt.setDate(dt.getDate() + 1);
    now.value = dt;
  }

  function setToday() {
    now.value = new Date();
  }

  onUnmounted(() => {
    document.body.classList.remove('printable');
  });

  function print() {
    window.print();
  }

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

  function getBirthday(days: number, now?: Date) {
    now = now ?? new Date();
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

  function getProductName(name: string) {
    const matched = name.match(/.+(?= [0-9]+ сут)/);
    if(!matched) throw new Error('Имя не указано');
    return matched[0];
  }

  const groupsLabels = {
    brojler: 'Бройлер',
    kurochka: 'Курочка',
    petuh: 'Петушок',
    nesushka: 'Несушка',
    dominant: 'Доминант',
    cvetBroiler: 'Цветной бройлер',
    utka: 'Утка',
    utkaBroiler: 'Бройлерная утка',
    mulard: 'Мулард',
    gus: 'Гусь',
    induk: 'Индюшата'
  }

  type GroupFilter = (name: string) => boolean;
  type Filters = { [ K: string ]: GroupFilter[] }

  const groupsFilters: Filters = {
    brojler: [
      (name: string) => name.indexOf('кобб') !== -1,
      (name: string) => name.indexOf('росс') !== -1,
      (name: string) => name.indexOf('арбор') !== -1,
      (name: string) => name.indexOf('айкрес') !== -1,
    ],
    kurochka: [
      (name: string) => /^курочк(а|и)/i.test(name),
      (name: string) => /^ломан браун/i.test(name),
    ],
    petuh: [
      (name: string) => /^пету(х|хи|шки|шок)/i.test(name)
    ],
    nesushka: [
      (name: string) => /^несушк(а|и)/i.test(name),
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
      (name: string) => /^ут(ка|енок|ята)/i.test(name),
      (name: string) => name.indexOf('цветная башкирская') !== -1,
      (name: string) => name.indexOf('агидель') !== -1,
      (name: string) => name.indexOf('фаворит') !== -1,
    ],
    utkaBroiler: [
      (name: string) => name.indexOf('бройлерная утка') !== -1,
      (name: string) => /стар\s?53/i.test(name),
      (name: string) => /st\s?5/i.test(name),
    ],
    mulard: [
      (name: string) => name.indexOf('мулард') !== -1,
    ],
    gus: [
      (name: string) => /серы(й|е)/i.test(name),
      (name: string) => /белы(й|е)/i.test(name),
      (name: string) => /итальянски(й|е) белы(й|е)/i.test(name),
      (name: string) => /крупно серы(й|е)/i.test(name),
      (name: string) => name.indexOf('линда') !== -1,
    ],
    induk: [
      (name: string) => /биг\s?6/i.test(name),
      (name: string) => /бронзовы(й|е)/i.test(name),
    ]
  }

  type PriceProduct = Pick<Product, 'name' | 'description' | 'price'> & {
    cleanedName: string,
    age: number,
    birthday: string,
    productName: string
  };

  function makeProduct(product: Product): PriceProduct {
    const cleanedName = cleanName(product.name);
    const productName = getProductName(cleanedName);
    const age = getAge(cleanedName);
    const birthday = prettyDate(getBirthday(age, new Date(now.value)));
    return {
      age,
      productName,
      cleanedName,
      birthday,
      price: product.price,
      description: product.description,
      name: product.name,
    }
  }

  const priceProducts = computed(() => {
    if(products.value === null) return [];
    const list: PriceProduct[] = [];

    for(const product of products.value) {
      try {
        list.push(makeProduct(product));
      } catch {
        continue;
      }
    }

    return list;
  });

  type GroupProducts = {
    [ Group: string ]: {
      [ Birthday: string ]: {
        [ Price: string ]: PriceProduct[]
      }
    }
  }

  function getGroupProducts(products: PriceProduct[], groupsFilters: Filters): GroupProducts {
    const groups: GroupProducts = {};

    for(const product of products) {
      for(const key in groupsFilters) {
        const filters = groupsFilters[key];
        const res = filters.some((filter) => filter(product.cleanedName));

        if(res) {
          if(!groups[key]) groups[key] = {};
          if(!groups[key][product.birthday]) groups[key][product.birthday] = {};
          if(!groups[key][product.birthday][product.price]) groups[key][product.birthday][product.price] = [];

          groups[key][product.birthday][product.price].push(product);
        }
      }
    }

    return groups;
  }

  const productsList = computed(() => getGroupProducts(priceProducts.value, groupsFilters));

  interface FlatList {
    products: string,
    group: string,
    birthday: string,
    age: number,
    price: number
  }

  function getFlatProducts(groups: GroupProducts, groupsLabels: Record<string, string>): FlatList[] {
    const list: FlatList[] = [];

    for(let group in groups) {
      for(let birthday in groups[group]) {
        for(let price in groups[group][birthday]) {
          const products = groups[group][birthday][price];
          list.push({
            birthday,
            price: +price,
            group: groupsLabels[group],
            age: products[0].age,
            products: products.map(p => `"${p.productName}"`).join(', '),
          });
        }
      }
    }

    return list.sort((a, b) => a.age - b.age);
  }

  const flatList = computed(() => getFlatProducts(productsList.value, groupsLabels));
</script>
<style>
  @media print {
    .printable .q-header, .printable .q-drawer-container, .printable .print {
      display: none !important;
    }

    .printable .q-page-container {
      padding: 0 !important;
    }
  }
</style>
