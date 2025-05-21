<template>
  <div class="inline-block text-left">
    <!-- Clickable Flag to Toggle Language -->
    <button
      @click="toggleLanguage"
      class="px-6 py-1 text-white rounded flex items-center space-x-2"
    >
      <img :src="currentFlag" alt="flag" class="w-10" />
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

// Import flag images
import enFlag from "../assets/image/flag/en.png";
import khFlag from "../assets/image/flag/kh.png";

// Map of flag images
const flags = {
  en: enFlag,
  kh: khFlag,
};

const { locale } = useI18n();

// Current flag
const currentFlag = computed(() => flags[locale.value]);

// Toggle function: Switch between 'en' and 'kh'
function toggleLanguage() {
  locale.value = locale.value === "en" ? "kh" : "en";
}
</script>
