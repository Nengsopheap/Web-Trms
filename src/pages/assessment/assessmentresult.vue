<template>
  <Header />

  <div class="container">
    <div class="flex flex-col bg-white">
      <!-- Header Text -->
      <div class="flex flex-col gap-5 items-start ml-24">
        <div class="text-3xl mt-3 text-black/80 font-bold">ពិន្ទុការប្រលង</div>
        <div class="text-xs text-black/80 font-bold w-[400px] leading-5">
          ប្រព័ន្ធវាយតម្លៃសិស្សនឹងជួយអ្នកក្នុងការរៀនសូត្របានប្រសើរជាងមុនដោយផ្តល់នូវព័ត៌មានដ៏សំខាន់។
        </div>
      </div>

      <!-- Main Box -->
      <div class="flex justify-center items-center">
        <div
          class="flex flex-row justify-center items-center rounded-xl shadow-lg bg-white mt-6 mb-6 border"
          style="width: 1110px"
        >
          <!-- Left Side Info -->
          <div class="px-8 py-10">
            <p class="font-bold text-[25px] w-[300px]">
              🏆 ចំណាត់ថ្នាក់របស់អ្នក នៃការវាយតម្លៃ
              <span v-if="score > 50" class="text-green-600 font-medium">
                You passed! You're not at risk.</span
              >
              <span v-else class="text-red-600 font-medium">ទាបមធ្យម</span>
            </p>

            <div class="mt-3 font-bold text-gray-600 w-[400px]">
              សូមពិនិត្យមើលការវាយតម្លៃផ្អែកលើការប្រលងរបស់អ្នក។
              អ្នកអាចពង្រឹងចំណេះដឹងរបស់ខ្លួនដោយស្វែងរកការអប់រំនិងការវិភាគលទ្ធផល។
            </div>

            <!-- Toggle History Button -->
            <button
              @click="showHistory = !showHistory"
              class="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold"
            >
              {{ showHistory ? "Hide" : "Preview" }} Quiz History
            </button>
          </div>

          <!-- Score Circle -->
          <div class="flex flex-col items-center justify-center px-6 py-12">
            <div class="relative w-48 aspect-square">
              <svg
                class="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  stroke="currentColor"
                  stroke-width="4"
                  class="text-gray-200"
                  fill="none"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  :stroke-dasharray="`${score}, 100`"
                  stroke="url(#grad)"
                  stroke-width="4"
                  stroke-linecap="round"
                  fill="none"
                />
                <text
                  x="18"
                  y="20.5"
                  text-anchor="middle"
                  font-size="8"
                  class="text-white font-semibold"
                >
                  {{ score }}%
                </text>
                <defs>
                  <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4f46e5" />
                    <stop offset="100%" stop-color="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="text-center mt-8">
              <h1 class="text-3xl font-bold">🎉 You scored {{ score }}%!</h1>
              <p class="mt-2 text-base text-gray-600">
                Thanks for completing the quiz. Keep learning and growing! 🌱
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ Recommended Course -->
      <div
        v-if="recommendedCourse"
        class="max-w-xl mx-auto mt-6 mb-10 p-6 bg-indigo-50 rounded-lg border border-indigo-200 shadow"
      >
        <h3 class="text-lg font-bold text-indigo-800 mb-2">
          📚 Course Recommendation
        </h3>
        <p class="text-indigo-700 font-semibold text-base">
          {{ recommendedCourse.title }}
        </p>
        <p class="text-sm text-indigo-600 mt-2">
          {{ recommendedCourse.description }}
        </p>
        <div class="mt-4">
          <!-- <router-link
            :to="{ name: 'coursedetail', params: { id: recommendedCourse.id } }"
            class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            View Course
          </router-link> -->
        </div>
      </div>

      <!-- Quiz History Section -->
      <div v-if="showHistory" class="mt-8 px-4 sm:px-10">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">📝 Quiz Review</h2>

        <div
          v-for="(item, index) in quizHistory"
          :key="index"
          class="mb-8 p-6 bg-white rounded-xl shadow border border-gray-200"
        >
          <!-- Question -->
          <p class="text-lg font-semibold text-gray-800 mb-3">
            {{ index + 1 }}. {{ item.question_text }}
          </p>

          <!-- Options -->
          <div class="grid gap-3">
            <div
              v-for="option in item.options"
              :key="option.id"
              class="flex items-center justify-between px-4 py-2 rounded-md border transition"
              :class="{
                'bg-green-100 border-green-400 text-green-700':
                  item.correctOptionIds.includes(option.id) &&
                  item.selectedOptionIds.includes(option.id),
                'bg-red-100 border-red-400 text-red-700':
                  !item.correctOptionIds.includes(option.id) &&
                  item.selectedOptionIds.includes(option.id),
                'bg-white border-gray-200 text-gray-700':
                  !item.selectedOptionIds.includes(option.id),
              }"
            >
              <span>{{ option.option_text }}</span>
              <div class="flex gap-2 text-xs font-semibold">
                <span
                  v-if="item.correctOptionIds.includes(option.id)"
                  class="text-green-600"
                >
                  ✔ Correct
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "../../components/Header.vue";
import Footer from "../../components/footer.vue";

const route = useRoute();
const score = parseFloat(route.query.score || 0);
const showHistory = ref(false);

// Load quiz history
const quizHistory = JSON.parse(localStorage.getItem("quiz_history") || "[]");

// Load full result data (score, recommendation, etc.)
const recommendedCourse = ref(null);

try {
  const resultData = JSON.parse(
    localStorage.getItem("quiz_result_data") || "{}"
  );
  if (resultData.recommendedCourse) {
    recommendedCourse.value = resultData.recommendedCourse;
  }
} catch (err) {
  console.warn("Failed to parse result data", err);
}

// onMounted(() => {

//   setTimeout(() => {
//     localStorage.removeItem("quiz_result_data");
//     localStorage.removeItem("quiz_history");
//   }, 2000);
// });
</script>

<style scoped>
.custom-left::after {
  content: "";
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #1e1b4b;
}

.custom-right::after {
  content: "";
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid #1e1b4b;
}
</style>
