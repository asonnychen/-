import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import ratings from '@/components/ratings/ratings';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
		{
      path: '/',
      name: 'seller',
      component: seller
    },
		{
      path: '/',
      name: 'ratings',
      component: ratings
    }
  ]
});
