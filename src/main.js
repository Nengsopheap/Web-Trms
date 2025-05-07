import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import { createPinia } from 'pinia';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);
const pinia = createPinia(); 
app.use(Vue3Toastify, {
    autoClose: 3000, // Toast auto-close duration in milliseconds
  });
app.use(router);
app.use(pinia);    
app.mount("#app");
