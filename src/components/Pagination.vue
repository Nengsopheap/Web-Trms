<!-- components/Pagination.vue -->
<template>
  <div class="flex items-end justify-end mt-8 space-x-2">
    <!-- Previous Button -->
    <button
      @click="$emit('update:currentPage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- Page Numbers -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('update:currentPage', page)"
      :class="[
        'px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200',
        currentPage === page ? 'text-white' : 'text-gray-700',
      ]"
      :style="currentPage === page ? { backgroundColor: '#31247D' } : {}"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      @click="$emit('update:currentPage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  (e: "update:currentPage", page: number): void;
}>();
</script>
