<template>
  <div class="p-3">
    <h1 class="text-2xl font-semibold mb-4">User Quiz Attempts</h1>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-600 font-medium">
      Error: {{ error }}
    </div>
    <div v-else-if="attempts.length === 0" class="text-gray-500">
      No data found.
    </div>

    <div v-else class="w-full mx-auto">
      <div
        class="bg-white p-6 rounded-lg shadow-[0_4px_12px_rgba(76,56,187,0.25)] overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#111827] text-white">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium">#</th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.username") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.Assessment") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.total_quizs") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.user_score") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.Correct_Answers") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.Wrong_Answers") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.percentage") }}
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                {{ $t("title.submitted_at") }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(attempt, index) in paginatedAttempts"
              :key="attempt.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2 text-sm text-gray-700">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ attempt.user?.username || "N/A" }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ attempt.assessment?.name || "N/A" }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ attempt.total_quizzes }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ attempt.score }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ attempt.correct_answers }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ attempt.wrong_answers }}
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ attempt.percentage.toFixed(2) }}%
              </td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-600">
                {{ formatDate(attempt.submitted_at) }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
      </div>
      <div class="flex items-center justify-center mt-4 gap-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-md text-gray-700 disabled:opacity-50"
        >
          <ChevronLeft />
        </button>

        <span class="text-sm text-gray-600">
          {{ $t("button.Page") }} {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-md text-gray-700 disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const attempts = ref([]);
const loading = ref(true);
const error = ref(null);

const currentPage = ref(1);
const perPage = ref(10); // change this to modify how many per page

const fetchQuizAttempts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/questions/quiz-attempts"
    );
    // Sort by submitted_at descending (latest first)
    attempts.value = response.data.sort((a, b) => {
      return new Date(b.submitted_at) - new Date(a.submitted_at);
    });
  } catch (err) {
    error.value = err.message || "Failed to fetch quiz attempts.";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

const totalPages = computed(() => {
  return Math.ceil(attempts.value.length / perPage.value);
});

const paginatedAttempts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return attempts.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

onMounted(() => {
  fetchQuizAttempts();
});
</script>
