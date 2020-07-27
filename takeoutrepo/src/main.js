/*
入口JS
 */
import Vue from "vue";
import { Button } from "mint-ui";
import VueLazyload from "vue-lazyload";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import SlideVerify from "vue-monoplasty-slide-verify";

import "./mock/mockServer"; // 加载mockServer即可
import loading from "./common/imgs/loading.gif";
import "./fiters"; // 加载过滤器
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

// 注册全局组件标签
Vue.component(Button.name, Button); // <mt-button>
Vue.use(VueLazyload, {
  // 内部自定义一个指令lazy
  loading,
});
//Vue.use(SlideVerify);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router, //使用上vue-router
  store, // 使用上vuex
});
