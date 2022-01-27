import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./plugins/axio";
import "./index.css";

Vue.config.productionTip = false;

const config = {
  STRIPE_PUBLISHER_KEY: "pk_test_0etbslYdC2UPruuh3uLZgSut",
};

new Vue({
  data: { config },
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
