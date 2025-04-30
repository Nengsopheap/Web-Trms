<template>
  <Header />
  <div class="flex flex-col" style="background-color: #31247d">
    <div class="flex flex-col gap-5 items-start" style="margin-left: 200px">
      <div class="text-3xl mt-3 text-gray-100 font-bold">ពិន្ទុការប្រលង</div>
      <div class="text-xs text-gray-100 font-bold" style="width: 400px; line-height: 20px;">
        ប្រព័ន្ធវាយតម្លៃសិស្សនឹងជួយអ្នកក្នុងការរៀនសូត្របានប្រសើរជាងមុនដោយផ្តល់នូវព័ត៌មានដ៏សំខាន់។
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div
        class="flex flex-row justify-center items-center rounded-xl shadow-lg bg-white mt-6 mb-6"
        style="width: 1110px"
      >
        <div class="">
          <p class=" font-bold" style="font-size: 25px; width: 300px">
            🏆 ចំណាត់ថ្នាក់របស់អ្នក នៃការវាយតម្លៃ
            <span v-if="score > 50" class="text-red-600 font-medium">
              You passed! You're not at risk.</span
            >
            <span v-else class="text-red-600 font-medium">ទាបមធ្យម</span>
          </p>

          <div class="mt-3 font-bold text-gray-600" style="width: 400px">
            សូមពិនិត្យមើលការវាយតម្លៃផ្អែកលើការប្រលងរបស់អ្នក។
            អ្នកអាចពង្រឹងចំណេះដឹងរបស់ខ្លួនដោយស្វែងរកការអប់រំនិងការវិភាគលទ្ធផល។
          </div>
        </div>
        <div class="flex flex-col items-center justify-center px-6 py-12">
          <!-- Circular Progress Indicator -->
          <div class="relative w-48 aspect-square">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <!-- Background Circle -->
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                stroke="currentColor"
                stroke-width="4"
                class="text-gray-200"
                fill="none"
              />
              <!-- Progress Circle -->
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
              <!-- Score Text -->
              <text
                x="18"
                y="20.5"
                text-anchor="middle"
                font-size="8"
                class="text-white font-semibold"
              >
                {{ score }}%
              </text>

              <!-- Gradient Definition -->
              <defs>
                <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="" />
                  <stop offset="100%" stop-color="#BD2629" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- Completion Message -->
          <div class="text-center mt-8">
            <h1 class="text-3xl font-bold">🎉 You scored {{ score }}%!</h1>
            <p class="mt-2 text-base">
              Thanks for completing the quiz. Keep learning and growing! 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-xs mt-10 font-bold text-gray-500"
    style="margin-left: 200px; font-size: 15px; width: 600px; line-height: 30px"
  >
    សម្រាប់អ្នកដែលស្ថិតនៅចំណុចនេះគួរតែពិចារណាអំពីការត្រៀមខ្លួនរបស់សហគ្រាសអ្នកក្នុងការ
    ចាប់យកឌីជីថលដូចជា:
  </div>
  <div class="flex flex-col items-center justify-center py-10">
    <div class="flex flex-wrap justify-center gap-8 max-w-5xl">
      <!-- Left bubble -->
      <div
        class="relative bg-indigo-900 text-white p-6 w-80 rounded-lg shadow-md custom-left"
      >
        <p class="text-sm leading-relaxed">
          មតិយោបល់នេះបង្ហាញពីការសិក្សានិងកិច្ចការដែលពាក់ព័ន្ធនឹងបច្ចេកវិទ្យា
        </p>
      </div>

      <!-- Right bubble -->
      <div
        class="relative bg-indigo-900 text-white p-6 w-80 rounded-lg shadow-md custom-right"
      >
        <p class="text-sm leading-relaxed">
          មតិយោបល់នេះបង្ហាញពីការសិក្សានិងកិច្ចការដែលពាក់ព័ន្ធនឹងបច្ចេកវិទ្យា
        </p>
      </div>

      <!-- Left bubble -->
      <div
        class="relative bg-indigo-900 text-white p-6 w-80 rounded-lg shadow-md custom-left"
      >
        <p class="text-sm leading-relaxed">
          មតិយោបល់នេះបង្ហាញពីការសិក្សានិងកិច្ចការដែលពាក់ព័ន្ធនឹងបច្ចេកវិទ្យា
        </p>
      </div>

      <!-- Right bubble -->
      <div
        class="relative bg-indigo-900 text-white p-6 w-80 rounded-lg shadow-md custom-right"
      >
        <p class="text-sm leading-relaxed">
          មតិយោបល់នេះបង្ហាញពីការសិក្សានិងកិច្ចការដែលពាក់ព័ន្ធនឹងបច្ចេកវិទ្យា
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const score = parseFloat(route.query.score || 0);
    return { score };
  },
};
</script>

<style scoped>
/* Add any additional styling you may need here */
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
  border-left: 20px solid #1e1b4b; /* Indigo-900 */
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
  border-right: 20px solid #1e1b4b; /* Indigo-900 */
}
</style>
