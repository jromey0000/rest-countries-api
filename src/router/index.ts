import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
// import NotFound from '@/pages/NotFound.vue';
import CountryPage from '../pages/CountryPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: NotFound,
  // },
  {
    path: '/country/:name',
    name: 'CountryPage',
    component: CountryPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
