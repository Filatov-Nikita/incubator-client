import useTags from './tags';
import { computed } from 'vue';
import type { ProductFilter } from 'src/types/products';

export default (filter: ProductFilter) => {
  const { tagsVisible } = useTags();

  const tagsFiltred = computed(() => {
    if(!filter.categoryId) return tagsVisible.value;
    return tagsVisible.value.filter(tag => tag.categoryId === filter.categoryId);
  });

  return {
    tagsFiltred
  }
}
