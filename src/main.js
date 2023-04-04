/*
 * @Author: Mx
 * @Date: 2022-08-14 21:30:04
 * @Description: 
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './mock';

Vue.use(ElementUI);
Vue.config.productionTip = false;

// 组件库
import mxCrud from "./packages/src/index";
Vue.use(mxCrud);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
