import Vue from 'vue';
import VueRouter from 'vue-router';
import CasinoDapp from '@/components/casino-dapp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'casino-dapp',
    component: CasinoDapp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
