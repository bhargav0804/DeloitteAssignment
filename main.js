import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import home from './components/home';
import details from './components/details';
//import vuetify from './plugins/vuetify';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueRouter);
Vue.use(VueSidebarMenu);


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: "/",
      name: "Home",
      component: home
    },
    {
      path: "/product/:param",
      name: "Details",
      component: details
    },
    {
      path: "/product",
      name: "Details",
      component: details
    },
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
 // vuetify,
  render: (h) => h(App)
}).$mount("#app");
