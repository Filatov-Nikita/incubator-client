import type { ProductLazyFilter } from 'src/types/products';
import { reactive, computed } from 'vue';
import type { Tag } from 'src/types/tags';

export default (initialState: ProductLazyFilter) => {
  const filter: ProductLazyFilter = reactive(initialState);

  function toggleCategory(categoryId: number) {
    if(filter.categoryId === categoryId) {
      delete filter.categoryId;
    } else {
      filter.categoryId = categoryId;
    }

    clearTags();
  }

  function clearTags() {
    if(filter.tags) {
      filter.tags = [];
    }
  }

  function toggleTag(tag: Tag) {
    if(!filter.tags) filter.tags = [];

    if(hasTag(tag.id)) {
      filter.tags = filter.tags.filter(t => t !== tag.id);
    } else {
      filter.tags.push(tag.id);
    }
  }

  function hasTag(tagId: number) {
    return filter.tags?.includes(tagId) ?? false;
  }

  const isEmptyTags = computed(() => {
    if(!filter.tags) return true;
    return filter.tags.length === 0;
  });

  return {
    filter,
    toggleCategory,
    toggleTag,
    clearTags,
    hasTag,
    isEmptyTags
  }
}
