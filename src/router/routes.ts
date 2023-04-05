import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainPage.vue'), name: 'home' },
      { path: '/products', component: () => import('pages/ProductsPage.vue'), name: 'products' },
    ],
  },
  {
    path: '/crm',
    component: () => import('layouts/CrmLayout.vue'),
    children: [
      { path: 'products', component: () => import('pages/CrmProductsPage.vue'), name: 'crm.products' },
      { path: 'categories', component: () => import('src/pages/CrmCategoriesPage.vue'), name: 'crm.categories' },
      { path: 'tags', component: () => import('src/pages/CrmTagsPage.vue'), name: 'crm.tags' },
      { path: 'reports/products', component: () => import('src/pages/CrmReportsProducts.vue'), name: 'crm.reports.products' },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '/login', component: () => import('pages/LoginPage.vue'), name: 'login' }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
