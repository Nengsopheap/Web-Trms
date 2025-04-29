<template>
  <div class="container">
    <div
      v-if="assessmentStore.loading"
      class="text-center text-gray-500 text-lg"
    >
      Loading...
    </div>

    <div
      v-else-if="assessmentStore.error"
      class="text-center text-red-500 text-lg"
    >
      {{ assessmentStore.error }}
    </div>

    <div v-else>
      <!-- Cards -->
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5">
        <div
          v-for="assessment in paginatedAssessments"
          :key="assessment.id"
          class="bg-white border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <h3 class="text-2xl font-semibold text-gray-800 dark:text-black mb-2">
            {{ assessment.name }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {{ assessment.description || "No description provided." }}
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useAssessmentStore } from "../stores/assessment";
import { useRouter } from "vue-router";
import Pagination from "../components/Pagination.vue";

const assessmentStore = useAssessmentStore();
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 3;

onMounted(() => {
  assessmentStore.loadAssessments();
});

const totalPages = computed(() =>
  Math.ceil(assessmentStore.assessments.length / itemsPerPage)
);

const paginatedAssessments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return assessmentStore.assessments.slice(start, start + itemsPerPage);
});
</script>
