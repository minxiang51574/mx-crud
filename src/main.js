/*
 * @Author: Mx
 * @Date: 2022-08-01 21:12:59
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { deepClone, vaildData } from "./utils";
Vue.prototype.deepClone = deepClone;
Vue.prototype.vaildData = vaildData;

Vue.use(ElementUI);
Vue.config.productionTip = false;

// Avue组件库
import Avue from "./components/index";
Vue.use(Avue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
