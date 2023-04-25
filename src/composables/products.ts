import { ref } from 'vue';
import type { Product, ProductFilter, ProductBody } from 'src/types/products';
import { useProductsStore } from 'src/stores/products';
import { Notify } from 'quasar';
import { Tag } from 'src/types/tags';

export default () => {
  const products = ref<Product[] | null>(null);
  const loading = ref(false);
  const creating = ref(false);

  const productsStore = useProductsStore();

  function getItem (itemId: number) {
    if(products.value === null) return null;
    const item = products.value.find(pr => pr.id === itemId);
    if(!item) return null;
    return item;
  }

  async function create(body: ProductBody, tags: Tag[], onSuccess = (p: Product) => {}) {
    try {
      creating.value = true;

      const product = await productsStore.create(body);

      const newProduct = await attachTags(product.id, tags);

      const p = newProduct ?? product;

      if(products.value === null) products.value = [];

      products.value.unshift(p);
      onSuccess(p);
      Notify.create({ type: 'positive', message: 'Продукт создан успешно' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось создать продукт' });
    } finally {
      creating.value = false;
    }
  }

  async function attachTags(productId: number, tags: Tag[]) {
    try {
      if(tags.length === 0) return null;
      const product = await productsStore.attachTags(productId, tags);
      return product;
    } catch(e) {
      Notify.create({ type: 'negative', message: 'Не удалось добавить теги' })
      return null;
    }
  }

  async function dettachTags(productId: number, tags: Tag[]) {
    try {
      if(tags.length === 0) return null;
      const product = await productsStore.dettachTags(productId, tags);
      return product;
    } catch(e) {
      Notify.create({ type: 'negative', message: 'Не удалось удалить теги' })
      return null;
    }
  }

  function updateLocal(id: number, body: Partial<Product>) {
    const product = getItem(id);

    if(product === null) return null;

    Object.assign(product, body);

    return product;
  }

  async function update(id: number, body: Partial<ProductBody>, onSuccess = (p: Product) => {}) {
    try {
      const newProduct = await productsStore.update(id, body);

      const product = updateLocal(id, newProduct);

      if(product === null) return null;

      onSuccess(product);
      Notify.create({ type: 'positive', message: 'Продукт обновлен успешно' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Не удалось обновить продукт' });
    }
  }

  return {
    products,
    loading,
    creating,
    create,
    update,
    updateLocal,
    attachTags,
    dettachTags
  }
}
