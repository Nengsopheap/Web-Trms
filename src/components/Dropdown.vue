<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="inline-flex justify-between items-center w-full"
    >
      <span>{{ label }}</span>
      <svg
        class="w-4 h-4 ml-2 transform transition-transform duration-200"
        :class="{ 'rotate-180': open }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style="margin-left: 3px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <ul class="p-2">
        <li v-for="(item, index) in items" :key="index">
          <a
            :href="item.href"
            class="block px-4 py-1.5 hover:bg-[#31247D] hover:text-white text-[#31247D] rounded-md"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Dropdown",
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const open = ref(false);
const dropdownRef = ref(null);

function toggleDropdown() {
  open.value = !open.value;
}

function closeDropdown() {
  open.value = false;
}
</script>

<style scoped></style>
