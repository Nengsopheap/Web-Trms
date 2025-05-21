<template>
  <div class="card">
    <div
      class="flex flex-row justify-between items-center p-4"
      style="background-color: #31247d"
    >
      <div class="flex flex-row justify-center items-center">
        <div>
          <img
            src="/src/assets//image/FSA_Logo.png"
            alt=""
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
      <div class="flex flex-row​ gap-4 text-white font-bold">
        <router-link to="/Home" class="cursor-pointer">ទំព័រដើម</router-link>

        <Dropdown
          label="ច្បាប់និងលិខិតបទដ្ឋានគតិយុត្ត"
          :items="[
            { text: 'ច្បាប់', href: '#' },
            { text: 'អនុក្រឹត្យ', href: '#' },
          ]"
        />
        <Dropdown
          label="ធនធាន"
          :items="[
            { text: 'ព័ត៌មាន', href: '#' },
            { text: 'របាយការណ៍', href: '#' },
            { text: 'ព្រឹត្តិការណ៍', href: '#' },
          ]"
        />
        <Dropdown
          label="អំពី TRM"
          :items="[
            { text: 'ការវាយតម្លៃ', href: '#' },
            { text: 'ការការពារខ្លូនរបស់អ្នក', href: '#' },
            { text: 'TRM', href: '#' },
          ]"
        />
        <Dropdown
          label="ផ្សេងៗ"
          :items="[
            { text: 'សំណួរ-ចម្លើយ', href: '/faq' },
            { text: 'ព័ត៌មានទំនាក់ទំនង', href: '/Contact' },
            { text: 'តំណភ្ជាប់សំខាន់ៗ', href: '#' },
          ]"
        />
        <!-- <svg
          width="49"
          height="31"
          viewBox="0 0 49 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect width="48.3944" height="31" fill="url(#pattern0_343_86)" />
          <defs>
            <pattern
              id="pattern0_343_86"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlink:href="#image0_343_86"
                transform="scale(0.00355872 0.00555556)"
              />
            </pattern>
            <image
              id="image0_343_86"
              width="281"
              height="180"
              preserveAspectRatio="none"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
        </svg> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Dropdown from "./Dropdown.vue";
</script>
