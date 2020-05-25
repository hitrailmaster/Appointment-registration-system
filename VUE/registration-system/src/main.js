
// 引入依赖
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Antd from 'ant-design-vue';
import axios from './js/axios';

// 引入基本样式文件
import 'ant-design-vue/dist/antd.css';
import "./css/normalize.css";
import "./css/main.css";
import 'vue2-animate/dist/vue2-animate.min.css';

// 设置为开发者模式
Vue.config.productionTip = false

// 设置工具属性
Vue.prototype.$axios = axios;

// 插件使用
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')