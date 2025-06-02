<template>
  <div class="container mt-10">
    <div class="text-center flex flex-col">
      <div class="text-3xl font-mono text-black mb-2 font-bold custom-font">
        Practical ways to protect yourself online
      </div>
      <div class="text-sm text-gray-600 font-thin mb-4 custom-font">
        Take control of your cyber security and reduce the impact of an attack
      </div>
    </div>
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
      <div class="flex flex-wrap gap-10 justify-center mt-3">
        <div
          v-for="assessment in paginatedAssessments"
          :key="assessment.id"
          class="w-[390px] h-[400px] bg-white border border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex justify-center"
        >
          <router-link
            :to="`/question/${assessment.id}`"
            class="block p-6 h-full"
          >
            <div>
              <svg
                width="118"
                height="118"
                viewBox="0 0 118 118"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="118" height="118" fill="url(#pattern0_161_174)" />
                <defs>
                  <pattern
                    id="pattern0_161_174"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_161_174"
                      transform="scale(0.00195312)"
                    />
                  </pattern>
                </defs>
              </svg>
            </div>
            <h3
              class="text-lg font-semibold text-gray-800 hover:text-indigo-600 mb-2 transition-colors duration-200"
            >
              {{ assessment.name }}
            </h3>
            <p class="text-gray-500 text-sm line-clamp-3">
              {{ assessment.description || "No description provided." }}
            </p>
          </router-link>
        </div>
      </div>

      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useAssessmentStore } from "../stores/assessment";
import Pagination from "../components/Pagination.vue";

const assessmentStore = useAssessmentStore();

const currentPage = ref(1);
const itemsPerPage = 3;

onMounted(async () => {
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

<style scoped>
.custom-font {
  font-family: "Ancizar Serif", serif;
}
</style>
