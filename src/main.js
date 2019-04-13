import Vue from "vue";
import * as fb from "firebase";
import Vuetify from "vuetify";
import Vuelidate from "vuelidate";
import BuyDialogComponent from "@/components/Common/BuyDialog";
import Modal_Buy_Component from "@/components/Common/Modal_Buy";
import MyForm from "@/components/Common/Form";
import Product_Card_Component from "@/components/Products/Product_Card";
import SliderComponent from "@/components/Slider";
import SliderItemComponent from "@/components/SliderItem";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import colors from "vuetify/es5/util/colors";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken2,
    secondary: colors.blue.darken4,
    accent: colors.shades.black,
    error: colors.red.accent3,
    warning: colors.orange.darken2,
    success: colors.green.darken2,
    loader: colors.purple.darken2
  }
});

Vue.component("app-buy-dialog", BuyDialogComponent);
Vue.component("product-card", Product_Card_Component);
Vue.component("modal-buy", Modal_Buy_Component);
Vue.component("slider", SliderComponent);
Vue.component("slider-item", SliderItemComponent);
Vue.component("my-form", MyForm);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let config = {
      apiKey: "AIzaSyBRBsH3qun-uKGbkGnDjBQrTszot-6tCCU",
      authDomain: "itc-ads-a3932.firebaseapp.com",
      databaseURL: "https://itc-ads-a3932.firebaseio.com",
      projectId: "itc-ads-a3932",
      storageBucket: "itc-ads-a3932.appspot.com",
      messagingSenderId: "598247049148"
    };
    fb.initializeApp(config);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("USER_AUTOLOGIN", user);
      }
    }),
      this.$store.dispatch("PRODUCTS_FETCH");
  }
}).$mount("#app");
