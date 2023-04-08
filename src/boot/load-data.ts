import { boot } from 'quasar/wrappers';
import { Notify, Loading } from 'quasar';
import { useCategoriesStore } from 'src/stores/categories';
import { useTagsStore } from 'src/stores/tags';

export default boot(async ({ router }) => {

  router.beforeEach(async (to, from, next) => {
    if(to.name === 'login') return next();

    const catsStore = useCategoriesStore();
    const tagsStore = useTagsStore();

    if(catsStore.items !== null && tagsStore.items !== null) {
      return next();
    }

    try {
      Loading.show();

      await Promise.all([
        catsStore.list(),
        tagsStore.list()
      ]);

      return next();

    } catch(e) {
      Notify.create({ type: 'negative', message: 'Не удалось загрузить данные' });
    } finally {
      Loading.hide();
    }
  });

});
