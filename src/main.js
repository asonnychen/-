/*jshint esnext: true*/
/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入模块
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

import './common/sass/index.scss';

Vue.config.productionTip = false;
// 注册模块
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
	routes: [{
			path: '/goods',
			name: 'goods',
			component: goods
    },
		{
			path: '/ratings',
			name: 'ratings',
			component: ratings
    },
		{
			path: '/seller',
			name: 'seller',
			component: seller
    }],
	linkActiveClass: 'active'
});
// 	linkActiveClass: 'active'选中时自动添加class="active"

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	},
	data: {
		// 注册一个空对象用于全局调用
		eventHub: new Vue()
	}
})

// 默认首页
router.push('/goods');
