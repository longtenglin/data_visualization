import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from "@vue/composition-api";
import echarts from "echarts";
import moment from "moment";
import ElementUI from "element-ui";
import dataV from "@jiaminghi/data-view";
import 'element-ui/lib/theme-chalk/index.css';
import "./icon";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.use(dataV);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
