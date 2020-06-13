import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
// @ts-ignore
import CKEditor from "@ckeditor/ckeditor5-vue";

// @ts-ignore
Vue.use(CKEditor);
Vue.config.productionTip = false;

// @ts-ignore
new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
  // mounted() {
  //   store.dispatch('getFoodTest')
  // }
}).$mount("#app");
