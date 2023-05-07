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
  const { fetchList, reset } = usePagination({ limit: opts.limit });

  const loadMore = fetchList(async (res, opts, filter: ProductFilter) => {
    try {
      loading.value = true;
      const { meta, data } = await store.list({...filter, ...opts});

      if(!products.value) products.value = [];
      products.value = [ ...products.value, ...data ];

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