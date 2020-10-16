import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible/index.js';
import 'vant/lib/index.css';
import { Tabbar, TabbarItem, Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';

Vue.config.productionTip = false;
Vue.use(Lazyload);
Vue.use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
