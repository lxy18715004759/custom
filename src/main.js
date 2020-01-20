import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

import '@/styles/reset.scss'
import '@/styles/common.scss'
import '@/styles/element.scss'
import '@/styles/font-awesome/css/font-awesome.min.css'

// 自定义指令
import "@/directives"

// 自定义过滤器
import "@/filters"

// 本地字典
import "@/utils/dict"

// 常量
import * as GLOBAL from "@/utils/global"
Vue.prototype.GLOBAL = GLOBAL

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
