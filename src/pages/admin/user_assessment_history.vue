<template>
  <div class="p-3">
    <h1 class="text-2xl font-bold mb-6 text-[#111827]">
      {{ $t("title.user_score") }}
    </h1>

    <div v-if="userStore.loading" class="text-gray-500 mb-4">Loading...</div>
    <div v-if="userStore.error" class="text-red-600 mb-4">
      {{ userStore.error }}
    </div>

    <div v-if="userStore.scores.length" class="w-full mx-auto">
      <div
        class="bg-white p-6 rounded-lg shadow-[0_4px_12px_rgba(76,56,187,0.25)] overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#111827] text-white">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium">#</th>
              <th class="px-4 py-2 text-left text-sm font-medium">User ID</th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                Assessment ID
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">Score</th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                Total Quiz
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium">Correct</th>
              <th class="px-4 py-2 text-left text-sm font-medium">Wrong</th>
              <th class="px-4 py-2 text-left text-sm font-medium">
                Percentage
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 text-gray-700 text-sm">
            <tr
              v-for="(score, index) in userStore.scores"
              :key="score.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ score.user?.id }}</td>
              <td class="px-4 py-2">{{ score.assessment?.name }}</td>
              <td class="px-4 py-2 font-semibold">
                {{ formatDecimal(score.score) }}
              </td>
              <td class="px-4 py-2">{{ score.total_quizzes }}</td>
              <td class="px-4 py-2 text-green-700">
                {{ score.correct_answers }}
              </td>
              <td class="px-4 py-2 text-red-700">{{ score.wrong_answers }}</td>
              <td class="px-4 py-2 font-semibold text-blue-700">
                {{ formatDecimal(score.percentage) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else-if="!userStore.loading" class="text-gray-500 mt-4">
      No scores found.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const formatDecimal = (num) => {
  if (typeof num !== "number") return num;
  return num.toFixed(2);
};

onMounted(() => {
  userStore.loadScores();
});
</script>
