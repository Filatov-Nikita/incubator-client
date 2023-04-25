import { computed } from 'vue';
import { useTagsStore } from 'src/stores/tags';

export default () => {
  const store = useTagsStore();

  const tagsVisible = computed(() => {
    if(store.items === null) return [];
    return store.items.filter(tag => tag.visible);
  });

  return {
    tagsVisible
  }
}
