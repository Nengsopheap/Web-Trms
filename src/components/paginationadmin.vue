<template>
  <div class="p-2 border-t dark:border-gray-700 w-full">
    <nav role="navigation" aria-label="Pagination Navigation" class="flex items-center justify-between">
      <!-- Mobile View -->
      <div class="flex justify-between items-center flex-1 lg:hidden">
        <button @click="$emit('prev')" :disabled="currentPage === 1" title="Previous"
          class="w-10 h-10 flex items-center justify-center rounded-full text-yellow-500 hover:bg-gray-500/5 disabled:opacity-70 disabled:pointer-events-none">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <select v-model="perPage" @change="$emit('update:perPage', +perPage)"
          class="h-8 text-sm px-2 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option v-for="n in [5,10,25,50]" :key="n" :value="n">{{ n }}</option>
          <option value="-1">All</option>
        </select>

        <button @click="$emit('next')" :disabled="currentPage === totalPages" title="Next"
          class="w-10 h-10 flex items-center justify-center rounded-full text-yellow-500 hover:bg-gray-500/5 disabled:opacity-70 disabled:pointer-events-none">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Desktop View -->
      <div class="hidden lg:grid grid-cols-3 w-full">
        <div class="pl-2 text-sm font-medium dark:text-white">
          Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
        </div>

        <div class="flex items-center justify-center">
          <select v-model="perPage" @change="$emit('update:perPage', +perPage)"
            class="h-8 text-sm pr-8 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option v-for="n in [5,10,25,50]" :key="n" :value="n">{{ n }}</option>
            <option value="-1">All</option>
          </select>
          <span class="text-sm font-medium dark:text-white ml-2">per page</span>
        </div>

        <div class="flex items-center justify-end">
          <ol class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <button @click="$emit('prev')" :disabled="currentPage === 1"
                class="px-2 py-1 rounded-md hover:bg-gray-500/5 focus:ring-yellow-500 text-yellow-600">
                ‹
              </button>
            </li>

            <li v-for="page in visiblePages" :key="page">
              <button @click="$emit('page', page)" :class="[
                  'px-2 py-1 rounded-md',
                  page === currentPage ? 'bg-yellow-500/10 text-yellow-600 ring-2 ring-yellow-500' : 'hover:bg-gray-500/5'
                ]">
                {{ page }}
              </button>
            </li>

            <li>
              <button @click="$emit('next')" :disabled="currentPage === totalPages"
                class="px-2 py-1 rounded-md hover:bg-gray-500/5 focus:ring-yellow-500 text-yellow-600">
                ›
              </button>
            </li>
          </ol>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  totalItems: Number,
  currentPage: Number,
  perPage: Number,
})

const totalPages = computed(() =>
  props.perPage === -1 ? 1 : Math.ceil(props.totalItems / props.perPage)
)

const startItem = computed(() => (props.currentPage - 1) * props.perPage + 1)
const endItem = computed(() =>
  props.perPage === -1
    ? props.totalItems
    : Math.min(props.currentPage * props.perPage, props.totalItems)
)

const visiblePages = computed(() => {
  const pages = []
  const range = 2
  const start = Math.max(1, props.currentPage - range)
  const end = Math.min(totalPages.value, props.currentPage + range)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>
