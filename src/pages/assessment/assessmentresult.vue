<template>
  <Header />

  <div class="container mx-auto px-4 py-6">
    <div class="flex flex-col bg-white">
      <!-- Main Box -->
      <div class="flex justify-center items-center">
        <div
          class="flex flex-wrap justify-between items-center rounded-2xl shadow-xl bg-white my-8 border border-gray-200 px-10 py-8 max-w-6xl w-full"
        >
          <!-- Left Side Info -->
          <div class="px-4 py-4">
            <p
              class="text-2xl font-semibold text-gray-800 w-[300px] leading-snug"
            >
              🏆 ចំណាត់ថ្នាក់របស់អ្នក នៃការវាយតម្លៃ
              <span v-if="score >= 85" class="text-green-600 font-medium">
                You passed! Excellent performance.
              </span>
              <span v-else-if="score >= 60" class="text-yellow-600 font-medium">
                Good job! Keep improving.
              </span>
              <span v-else class="text-red-600 font-medium">
                ទាបមធ្យម (Below Average)
              </span>
            </p>

            <div
              class="mt-4 text-gray-600 text-base leading-relaxed w-[400px] font-medium"
            >
              សូមពិនិត្យមើលការវាយតម្លៃផ្អែកលើការប្រលងរបស់អ្នក។
              អ្នកអាចពង្រឹងចំណេះដឹងរបស់ខ្លួនដោយស្វែងរកការអប់រំនិងការវិភាគលទ្ធផល។
            </div>

            <!-- Toggle History Button -->
            <button
              @click="showHistory = !showHistory"
              class="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold shadow-sm transition"
            >
              {{ showHistory ? "Hide" : "Preview" }} Quiz History
            </button>
          </div>

          <!-- Score Circle -->
          <div class="flex flex-col items-center justify-center px-6 py-6">
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
                  y="18"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="7"
                  class="text-white font-semibold"
                  transform="rotate(90, 18, 18)"
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
            <div class="text-center mt-6">
              <h1 class="text-3xl font-bold text-gray-800">
                🎉 You scored {{ score }}%!
              </h1>
              <p class="mt-2 text-base text-gray-600">
                Thanks for completing the quiz. Keep learning and growing! 🌱
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Quiz History Section -->
      <div v-if="showHistory" class="mt-10 px-4 sm:px-10">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">📝 Quiz Review</h2>

        <div
          v-for="(item, index) in quizHistory"
          :key="index"
          class="mb-6 p-6 bg-white rounded-xl shadow border border-gray-200"
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

      <!-- ✅ Recommended Course + Tips + Video Section -->
      <div v-if="recommendedCourse" class="px-4 py-10 max-w-7xl mx-auto">
        <div
          class="bg-white rounded-2xl shadow-lg border border-indigo-200 p-8"
        >
          <!-- Section Heading -->
          <h2
            class="text-2xl sm:text-3xl font-bold text-indigo-900 mb-8 text-center"
          >
            🎯 Personalized Learning Tips & Video
          </h2>

          <!-- Tips Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div
              v-for="(tip, index) in [
                recommendedCourse.tip1,
                recommendedCourse.tip2,
                recommendedCourse.tip3,
                recommendedCourse.tip4,
              ]"
              :key="index"
              class="flex items-start gap-4 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div class="text-3xl">📘</div>
              <div>
                <h3 class="text-lg font-semibold text-indigo-800 mb-1">
                  Tip {{ index + 1 }}
                </h3>
                <p class="text-sm text-gray-700 leading-relaxed">
                  {{ tip }}
                </p>
              </div>
            </div>
          </div>

          <!-- Embedded Video -->
          <div v-if="embedUrl" class="w-full">
            <div
              class="aspect-video w-full rounded-xl overflow-hidden shadow-md border border-gray-300 h-[500px]"
            >
              <iframe
                :src="embedUrl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="Recommended Course Video"
                class="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "../../components/Header.vue";
import Footer from "../../components/footer.vue";

const route = useRoute();
const score = parseFloat(route.query.score || 0);
const showHistory = ref(false);

const quizHistory = JSON.parse(localStorage.getItem("quiz_history") || "[]");

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

// --- Additions for YouTube video embed ---

function getYouTubeVideoId(url) {
  if (!url) return null;
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const videoId = computed(() => {
  if (recommendedCourse.value && recommendedCourse.value.course_url) {
    return getYouTubeVideoId(recommendedCourse.value.course_url);
  }
  return null;
});

const embedUrl = computed(() => {
  return videoId.value
    ? `https://www.youtube.com/embed/${videoId.value}`
    : null;
});
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
