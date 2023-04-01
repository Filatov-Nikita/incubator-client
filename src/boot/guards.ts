import { boot } from 'quasar/wrappers';
import  * as Tokens from 'src/core/tokens';

export default boot(async ({ router }) => {
  router.beforeEach((to, from, next) => {
    if(to.name === 'login') return next();
    if(Tokens.get() === null) return next({ name: 'login' });
    next();
  })
});
