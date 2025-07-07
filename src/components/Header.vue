<template>
  <div class="card">
    <div
      class="flex flex-row justify-between items-center p-4"
      style="background-color: #31247d"
    >
      <div class="flex flex-row justify-center items-center">
        <div>
          <img
            src="/src/assets/image/FSA_Logo.png"
            alt="FSA Logo"
            style="width: 50px"
          />
        </div>
        <div class="flex flex-col ml-4">
          <div class="text-white font-bold" style="font-size: 15px">
            ការគ្រប់គ្រងហានិភ័យបច្ចេកវិទ្យាហិរញ្ញវត្ថុ
          </div>
          <div class="text-white font-bold" style="font-size: 13px">
            ក្នុងវិស័យហិរញ្ញវត្ថុមិនមែនធនាគារ
          </div>
        </div>
      </div>
      <div
        class="flex flex-row gap-4 text-white font-bold justify-center items-center"
      >
        <router-link to="/Home" class="cursor-pointer">{{
          $t("Home")
        }}</router-link>

        <Dropdown
          :label="$t('Law_and_Regulation')"
          :items="[
            { text: 'ច្បាប់', href: '/laws' },
            { text: 'អនុក្រឹត្យ', href: '/laws/regulation' },
          ]"
        />
        <Dropdown
          :label="$t('Resources')"
          :items="[
            { text: 'ព័ត៌មាន', href: '/resources/new' },
            { text: 'របាយការណ៍', href: '/resources/reports' },
            { text: 'ព្រឹត្តិការណ៍', href: '/resources/event' },
          ]"
        />
        <Dropdown
          :label="$t('About')"
          :items="[
            { text: 'ការវាយតម្លៃ', href: '/about/takeRisk' },
            { text: 'ការការពារខ្លូនរបស់អ្នក', href: '/about/takecare' },
            { text: 'TRM', href: '/about/TMR' },
          ]"
        />
        <Dropdown
          :label="$t('Others')"
          :items="[
            { text: 'សំណួរ-ចម្លើយ', href: '/faq-and-term' },
            { text: 'ព័ត៌មានទំនាក់ទំនង', href: '/faq-and-term/Contact' },
            { text: 'តំណភ្ជាប់សំខាន់ៗ', href: '/faq-and-term/link' },
          ]"
        />
        <div class=""><LanguageSwitcher /></div>
        <div
          class="ml-4 px-3 py-1 border border-white rounded-md text-white font-semibold text-sm cursor-pointer hover:bg-white hover:text-[#31247d] transition-colors duration-200 ease-in-out"
          @click="logout"
        >
          {{ $t("Logout") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "../components/Dropdown.vue"; // Import the Dropdown component
import LanguageSwitcher from "../components/LanguageSwitcher.vue"; // Import LanguageSwitcher component

import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

export default {
  components: {
    Dropdown,
    LanguageSwitcher,
  },
  setup() {
    const router = useRouter();
    const { t } = useI18n();

    const logout = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning(t("No token found.") || "No token found.");
        return;
      }

      try {
        await axios.post(
          "http://localhost:3000/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        toast.success(
          t("Logged out successfully") || "Logged out successfully",
          {
            autoClose: 2000,
            position: "top-right",
          }
        );

        router.push("/");
      } catch (error) {
        toast.error(t("Logout failed") || "Logout failed", {
          autoClose: 3000,
          position: "top-right",
        });
        console.error("Logout error:", error);
      }
    };

    return { logout, t };
  },
};
</script>
