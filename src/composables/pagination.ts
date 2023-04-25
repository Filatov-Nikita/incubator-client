import { computed, ref } from 'vue';
import type { MetaResponse } from 'src/types/products';

interface Opts {
  limit: number
}

export interface Pag {
  limit: number,
  isEnd: boolean
  offset?: number,
}

type Fetcher = (res: (meta: MetaResponse) => void, pag: Pag, ...args: any) => void

export default (opts: Opts) => {
  const meta = ref<MetaResponse | null>(null);

  const pag = computed<Pag>(() => {
    if(meta.value === null) return {
      limit: opts.limit,
      isEnd: false
    };

    const offset = meta.value?.offset ?? 0;

    return {
      limit: opts.limit,
      offset: offset + opts.limit,
      isEnd: (offset + opts.limit) >= meta.value.total
    }
  });

  function res(metaResponse: MetaResponse) {
    meta.value = metaResponse;
  }

  function fetchList(fethcer: Fetcher) {
    return function (...args: any) {
      if(pag.value.isEnd) return;
      fethcer(res, pag.value, ...args);
    }
  }

  function reset() {
    meta.value = null;
  }

  return {
    meta,
    pag,
    fetchList,
    reset
  }
}
