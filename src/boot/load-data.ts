import { boot } from 'quasar/wrappers';
import { Notify, Loading } from 'quasar';
import { useCategoriesStore } from 'src/stores/categories';
import { useTagsStore } from 'src/stores/tags';

export default boot(async ({ app }) => {
  try {
    Loading.show();
    const catsStore = useCategoriesStore();
    const tagsStore = useTagsStore();

    await Promise.all([
      catsStore.list(),
      tagsStore.list()
    ]);

  } catch(e) {
    Notify.create({ type: 'negative', message: 'Не удалось загрузить данные' });
  } finally {
    Loading.hide();
  }
});
