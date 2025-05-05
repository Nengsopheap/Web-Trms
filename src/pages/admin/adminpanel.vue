<template>
  <div class="flex h-screen">
    <!-- Sidebar (hover-expandable) -->
    <aside
      class="group w-20 hover:w-64 transition-all duration-300 text-white flex flex-col overflow-hidden"
      style="background-color: #31247d"
    >
      <div class="p-4">
        <div class="flex items-center" style="width: 50px; height: 50px">
          <!-- Logo Image -->
          <img src="../../assets/image/FSA_Logo.png" alt="Logo" />
          <!-- <span class=" text-sm font-bold hidden group-hover:inline-block" >
            ការគ្រប់គ្រងហានិភ័យបច្ចេកវិទ្យាហិរញ្ញវត្ថុ
          </span> -->
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-5 px-2 space-y-2 flex-1">
        <!-- Dashboard -->
        <router-link
          to="/admin/dashboard"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group-hover:flex group-hover:justify-center"
        >
          <svg
            class="h-5 w-5"
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
          <span class="ml-3 hidden group-hover:inline">Dashboard</span>
        </router-link>

        <!-- Assessment -->
        <router-link
          to="/admin/assessment"
          class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group-hover:flex group-hover:justify-center"
        >
          <svg
            class="h-5 w-5"
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
          <span class="ml-3 hidden group-hover:inline">Assessment</span>
        </router-link>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-400">
        <div
          class="flex items-center justify-center group-hover:justify-start transition-all"
        >
          <span class="text-sm hidden group-hover:inline"
            >Logged in as Sopheap</span
          >
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-auto rounded-lg bg-white">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "adminPanel",
};
</script>
