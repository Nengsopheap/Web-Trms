<template>
  <div class="relative inline-block text-left group">
    <!-- Current Language Button with Only Flag -->
    <button class="px-6 py-1 text-white rounded flex items-center space-x-2">
      <img :src="currentFlag" alt="flag" class="w-10" />
    </button>

    <!-- Language Dropdown with Flags (on hover) -->
    <div class="absolute hidden group-hover:block">
      <ul>
        <li
          v-for="lang in otherLangs"
          :key="lang"
          @click="changeLanguage(lang)"
          class="px-4 py-1 cursor-pointer flex items-center"
        >
          <img
            :src="flags[lang]"
            alt="flag"
            class="w-10 ml-2 inline-block mr-2"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

// Define your flags
import enFlag from "../assets/image/flag/en.png";
import khFlag from "../assets/image/flag/kh.png";

const flags = {
  en: enFlag,
  kh: khFlag,
};

const { locale } = useI18n();

// Current language
const currentLang = computed(() => locale.value);

// List of available languages
const allLangs = ["en", "kh"];
const otherLangs = computed(() => allLangs.filter((l) => l !== locale.value));

// Get the current flag based on the locale
const currentFlag = computed(() => flags[locale.value]);

// Change language function
function changeLanguage(lang) {
  locale.value = lang;
}
</script>

<style scoped>
.group:hover .group-hover\:block {
  display: block;
}
</style>
