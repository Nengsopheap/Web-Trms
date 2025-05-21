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
        <router-link to="/Home" class="cursor-pointer">{{$t('Home')}}</router-link>

        <Dropdown
          label="ច្បាប់និងលិខិតបទដ្ឋានគតិយុត្ត"
          :items="[
            { text: 'ច្បាប់', href: '/laws' },
            { text: 'អនុក្រឹត្យ', href: '/laws/regulation' },
          ]"
        />
        <Dropdown
          label="ធនធាន"
          :items="[
            { text: 'ព័ត៌មាន', href: '/resources/new' },
            { text: 'របាយការណ៍', href: '/resources/reports' },
            { text: 'ព្រឹត្តិការណ៍', href: '/resources/event' },
          ]"
        />
        <Dropdown
          label="អំពី TRM"
          :items="[
            { text: 'ការវាយតម្លៃ', href: '/about/takeRisk' },
            { text: 'ការការពារខ្លូនរបស់អ្នក', href: '/about/takecare' },
            { text: 'TRM', href: '/about/TMR' },
          ]"
        />
        <Dropdown
          label="ផ្សេងៗ"
          :items="[
            { text: 'សំណួរ-ចម្លើយ', href: '/faq-and-term' },
            { text: 'ព័ត៌មានទំនាក់ទំនង', href: '/faq-and-term/Contact' },
            { text: 'តំណភ្ជាប់សំខាន់ៗ', href: '/faq-and-term/link' },
          ]"
        />
        <div class=""><LanguageSwitcher /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "../components/Dropdown.vue"; // Import the Dropdown component
import LanguageSwitcher from "../components/LanguageSwitcher.vue"; // Import LanguageSwitcher component

export default {
  components: {
    Dropdown, // Register the Dropdown component
    LanguageSwitcher,
  },
};
</script>
