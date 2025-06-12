<template>
  <div class="min-h-screen flex justify-center">
    <div class="container flex flex-col gap-10 justify-center">
      <!-- Header Section -->
      <!-- <div class="text-center flex flex-col">
        <div class="text-3xl font-mono text-black mb-2 font-bold custom-font">
          Practical ways to protect yourself online
        </div>
        <div class="text-sm text-gray-600 font-thin mb-4 custom-font">
          Take control of your cyber security and reduce the impact of an attack
        </div>
      </div> -->

      <!-- Loading and Error States -->
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

      <!-- Cards Section -->
      <div v-else>
        <div class="flex flex-col rounded-md border shadow-xl p-4 gap-5">
          <div class="text-center">
            <div
              class="text-3xl font-mono text-black mb-2 font-bold custom-font"
            >
              Practical ways to protect yourself online
            </div>
            <div class="text-sm text-gray-600 font-thin mb-4 custom-font">
              Take control of your cyber security and reduce the impact of an
              attack
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between">
            <div
              v-for="assessment in paginatedAssessments"
              :key="assessment.id"
              class="flex-shrink-0 relative overflow-hidden bg-[#31247d] rounded-xl w-[310px] shadow-lg transition-all duration-300 group hover:shadow-[0_0_25px_#00ffff] hover:scale-[1.03] border border-transparent hover:border-cyan-300"
            >
              <!-- Decorative SVG Background -->
              <svg
                class="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform duration-300 ease-in-out animate-theft"
                viewBox="0 0 375 283"
                fill="none"
                style="opacity: 0.3"
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>

              <!-- Card Content -->
              <router-link
                :to="`/question/${assessment.id}`"
                class="relative pt-10 px-5 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300 h-[400px]"
              >
                <!-- Decorative Shadow Circle -->
                <div
                  class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style="
                    background: radial-gradient(black, transparent 60%);
                    transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1);
                    opacity: 0.2;
                  "
                ></div>

                <!-- Icon or Placeholder -->
                <div
                  class="w-20 h-20 mb-6 bg-white rounded-full flex items-center justify-center shadow-md text-indigo-500 font-bold text-xl"
                >
                  {{ assessment.name.charAt(0).toUpperCase() }}
                </div>

                <!-- Text Info -->
                <div class="text-white text-center px-4">
                  <span class="block font-semibold text-xl mb-1">{{
                    assessment.name
                  }}</span>
                  <p class="text-sm opacity-80 line-clamp-3">
                    {{ assessment.description || "No description provided." }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <Pagination
          v-model:currentPage="currentPage"
          :totalPages="totalPages"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useAssessmentStore } from "../stores/assessment";
import Pagination from "../components/Pagination.vue";

const assessmentStore = useAssessmentStore();

const currentPage = ref(1);
const itemsPerPage = 4;

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
@keyframes theft {
  0%,
  100% {
    transform: translateX(0) scale(1.5);
  }
  50% {
    transform: translateX(10px) scale(1.5);
  }
}

.animate-theft {
  animation: theft 3s ease-in-out infinite;
}
</style>
