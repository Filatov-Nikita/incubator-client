import { boot } from 'quasar/wrappers';
import { API } from 'src/config/app';
import { api } from 'src/api/index';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $imgPath: (path: string | null, fallback?: string) => string,
    $price: (price: number, currency?: string) => string,
    $prettyNumber: (number: number) => string,
  }
}

function prettyNumber(number: number) {
  return number.toLocaleString().replace(',', ' ');
}

export default boot(({ app, router }) => {
  (api as any).onAuthFailed = () => router.replace({ name: 'login' });

  app.config.globalProperties.$imgPath = function (path, fallback = '') {
    if(path === null) return fallback;
    return `${API}${path}`;
  }

  app.config.globalProperties.$price = function (price, currency = 'руб.') {
    return `${prettyNumber(price)} ${currency}`
  }

  app.config.globalProperties.$prettyNumber = prettyNumber
});
