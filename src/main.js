import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// AOS imports
import AOS from "aos";
import "aos/dist/aos.css";

// i18n setup
import en from "./locales/en.json";
import kh from "./locales/kh.json";
import { createI18n } from "vue-i18n";

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages: {
    en,
    kh,
  },
});

// Create app
const app = createApp(App);
const pinia = createPinia();

app.use(Vue3Toastify, { autoClose: 3000 });
app.use(router);
app.use(i18n);
app.use(pinia);

// Mount app
app.mount("#app");

AOS.init({
  duration: 800,
  once: false,
  mirror: true,
});
