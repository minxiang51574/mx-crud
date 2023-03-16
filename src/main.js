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

Vue.use(ElementUI);
Vue.config.productionTip = false;

// Avue组件库
import Avue from "./mx-common/avue/index";
Vue.use(Avue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
