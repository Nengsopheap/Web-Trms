import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import en from "./locales/en.json";
import kh from "./locales/kh.json";
// main.js or main.ts

import './style.css'; // or './src/style.css' if it's in src


import { createI18n } from "vue-i18n";

const app = createApp(App);
const pinia = createPinia();

const i18n = createI18n({
  
  legacy: false, // <--- Add this line
  fallbackLocale: "en", 
  messages: {
    en,
    kh,
  },
});
app.use(Vue3Toastify, {
  autoClose: 3000, 
});
app.use(router);
app.use(i18n);
app.use(pinia);
app.mount("#app");
