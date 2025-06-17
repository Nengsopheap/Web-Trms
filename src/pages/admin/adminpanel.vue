<template>
  <div class="flex h-screen">
    <aside
      class="group w-20 hover:w-64 transition-all duration-300 ease-in-out text-white flex flex-col overflow-hidden"
      style="background-color: #111827"
    >
      <!-- Logo Section -->
      <div class="flex items-center p-4">
        <img
          src="../../assets/image/FSA_Logo.png"
          alt="FSA Logo"
          class="w-10 h-10"
        />
        <!-- FSA text: only visible on hover -->
        <span
          class="ml-3 text-sm font-medium transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-[-10px] whitespace-nowrap"
        >
          ការគ្រប់គ្រងហានិភ័យបច្ចេកវិទ្យា
        </span>
      </div>

      <!-- Navigation -->
      <nav class="mt-5 px-2 space-y-2 flex-1">
        <!-- Dashboard -->
        <router-link
          to="/admin/dashboard"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
        >
          <svg
            class="h-5 w-5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span
            class="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap"
          >
            {{ $t("title.dashboard") }}
          </span>
        </router-link>

        <!-- Assessment -->
        <router-link
          to="/admin/assessment"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
        >
          <svg
            class="h-5 w-5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 17v-6h13M5 12h.01M5 6h.01M5 18h.01"
            />
          </svg>
          <span
            class="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap"
          >
            {{ $t("title.Assessment") }}
          </span>
        </router-link>

        <!-- Question -->
        <router-link
          to="/admin/question"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
        >
          <svg
            class="h-5 w-5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 14a1 1 0 112 0 1 1 0 01-2 0zm.25-8a2.25 2.25 0 00-2.25 2.25.75.75 0 001.5 0 .75.75 0 011.5 0c0 .414-.336.75-.75.75a.75.75 0 00-.75.75v.75a.75.75 0 001.5 0v-.126A2.25 2.25 0 009.25 6z"
              clip-rule="evenodd"
            />
          </svg>
          <span
            class="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap"
          >
            {{ $t("title.question") }}
          </span>
        </router-link>
        <router-link
          to="/admin/user_assessment_history"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
        >
        <History class="h-5 w-5 flex-shrink-0" />
          <span
            class="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap"
          >
            {{ $t("title.user_assessment_history") }}
          </span>
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-gray-400">
        <button
          @click="logout"
          class="text-red-400 hover:text-red-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-5 overflow-auto rounded-lg bg-white">
      <div class="text-end"><LanguageSwitcher /></div>
      <router-view />
    </main>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import LanguageSwitcher from "../../components/LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";
import { History } from "lucide-vue-next";

export default {
  name: "adminPanel",
  components: {
    LanguageSwitcher,
    History, 
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("token");
      router.push("/");
    };

    return { logout, t };
  },
};
</script>
