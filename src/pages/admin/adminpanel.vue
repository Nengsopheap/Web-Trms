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
          <LayoutDashboard class="h-5 w-5 flex-shrink-0" />
          <span
            class="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap"
          >
            {{ $t("title.dashboard") }}
          </span>
        </router-link>
        <router-link
          to="/admin/user"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
        >
          <UserCheck class="h-5 w-5 flex-shrink-0" />
          <span
            class="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap"
          >
            {{ $t("title.user") }}
          </span>
        </router-link>

        <!-- Assessment -->
        <router-link
          to="/admin/assessment"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out"
        >
          <AlignJustify class="h-5 w-5 flex-shrink-0" />
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
          <CircleHelp class="h-5 w-5 flex-shrink-0" />
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
import {
  History,
  LayoutDashboard,
  AlignJustify,
  CircleHelp,
  UserCheck,
} from "lucide-vue-next";
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  name: "adminPanel",
  components: {
    LanguageSwitcher,
    History,
    LayoutDashboard,
    AlignJustify,
    CircleHelp,
    UserCheck,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const logout = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("No token found.");
        return;
      }

      try {
        await axios.post(
          "http://localhost:3000/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        toast.success("Logged out successfully", {
          autoClose: 2000,
          position: "top-right",
        });

        router.push("/");
      } catch (err) {
        toast.error("Logout failed", {
          autoClose: 3000,
          position: "top-right",
        });
        console.error("Logout error:", err);
      }
    };

    return { logout, t };
  },
};
</script>
