<template>
  <div>
    <Header />

    <!-- Header Section -->
    <div
      class="flex flex-row justify-center items-center p-6 gap-10 text-white"
      style="background-color: #31247d"
    >
      <div class="flex flex-col">
        <div class="text-2xl font-bold">Cyber Security</div>
        <div>Updated devices are harder to hack and have newer features</div>
      </div>

      <!-- Quiz Card -->
      <div class="flex justify-center mt-10">
        <div
          class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-400 w-full max-w-xl text-center"
        >
          <h5 class="text-2xl font-bold mb-2 text-black text-start">
            Cyber Security Quiz
          </h5>
          <p class="text-gray-600 mb-4">
            Test your knowledge about cybersecurity best practices.
          </p>
          <div class="flex flex-row justify-between items-center">
            <button
              @click="startQuiz"
              style="background-color: #31247d"
              class="text-white px-4 py-2 shadow-sm border-spacing-3 rounded-lg"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Modal -->
    <div
      v-if="showPopup"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div
        class="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full text-gray-800 relative transition-all"
      >
        <!-- Close Button -->
        <div class="flex justify-center mt-10">
          <div class="w-full max-w-2xl">
            <div v-if="loading">Loading questions...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
              <div
                class="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50 shadow"
              >
                <p class="font-semibold mb-2">
                  Question {{ currentQuestionIndex + 1 }}:
                  {{ filteredQuestions[currentQuestionIndex].question_text }}
                </p>
                <ul class="list-disc ml-5">
                  <div
                    v-for="(option, optionIndex) in filteredQuestions[
                      currentQuestionIndex
                    ].options"
                    :key="optionIndex"
                    class="flex items-center mb-2"
                  >
                    <input
                      type="checkbox"
                      :value="option.option_text"
                      v-model="selectedOptions[currentQuestionIndex]"
                      class="mr-2"
                    />
                    {{ option.option_text }}
                  </div>
                </ul>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between">
                <button
                  @click="previousQuestion"
                  :disabled="currentQuestionIndex === 0"
                  class="px-4 py-2 rounded bg-gray-400 text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  v-if="currentQuestionIndex < filteredQuestions.length - 1"
                  @click="nextQuestion"
                  class="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Next
                </button>
                <button
                  v-else
                  @click="closePopup"
                  class="px-4 py-2 rounded bg-green-600 text-white"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="closePopup"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/question";
import Header from "../../components/Header.vue";

// Routing & Store
const route = useRoute();
const assessmentId = parseInt(route.params.assessmentId);
const questionStore = useQuestionStore();

// State variables
const quizStarted = ref(false);
const showPopup = ref(false);
const currentQuestionIndex = ref(0);

// Initialize selected options array for each question
const selectedOptions = ref({});

// Load submitted answers on mount
onMounted(async () => {
  await questionStore.loadAllSubmittedAnswers(assessmentId);
});

// Get loading and error states from store
const { loading, error } = questionStore;

// Filter questions by assessment ID
const filteredQuestions = computed(() =>
  questionStore.submittedAnswers.filter(
    (q) => q.assessment && q.assessment.id === assessmentId
  )
);

// Watch for changes in filteredQuestions to initialize selectedOptions
watch(filteredQuestions, (questions) => {
  questions.forEach((_, index) => {
    if (!selectedOptions.value[index]) {
      selectedOptions.value[index] = [];
    }
  });
});

// Start quiz popup
const startQuiz = () => {
  showPopup.value = true;
};

// Close modal popup
const closePopup = () => {
  showPopup.value = false;
};

// Navigation
const nextQuestion = () => {
  if (currentQuestionIndex.value < filteredQuestions.value.length - 1) {
    currentQuestionIndex.value++;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};
</script>

<style scoped>
/* Add any scoped custom styles here if needed */
</style>
