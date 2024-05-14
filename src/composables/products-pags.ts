import { useProductsStore } from 'src/stores/products';
import useProducts from './products';
import usePagination from './pagination';
import { ProductFilter } from 'src/types/products';

interface Opts {
  limit: number
}

export default (opts: Opts) => {
  const store = useProductsStore();
  const { create, update, attachTags, dettachTags, products, loading, creating, updateLocal } = useProducts();
  const { fetchList, reset: resetPag } = usePagination({ limit: opts.limit });

  const loadedIds: Record<string, boolean> = {};

  const loadMore = fetchList(async (res, opts, filter: ProductFilter) => {
    try {
      loading.value = true;
      const { meta, data } = await store.list({...filter, ...opts});

      if(!products.value) products.value = [];

      const list = data.filter(p => !loadedIds[p.id]);
      list.forEach(p => loadedIds[p.id] = true);

      products.value = [...products.value, ...list];

      res(meta);

    } catch(e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  });

  const getProducts = fetchList(async (res, opts, filter: ProductFilter) => {
    try {
      loading.value = true;
      const { meta, data } = await store.list({...filter, ...opts});

      products.value = data;

      res(meta);

    } catch(e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  });

  function reset() {
    resetPag();
    for(let key in loadedIds) {
      delete loadedIds[key];
    };
  }

  return {
    products,
    loadMore,
    getProducts,
    updateLocal,
    create,
    creating,
    update,
    attachTags,
    dettachTags,
    reset
  }
}
