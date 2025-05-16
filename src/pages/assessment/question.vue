<template>
  <div>
    <Header />

    <!-- Header Section -->
    <div class="min-h-screen" style="background-color: #31247d">
      <div
        class="flex flex-row justify-center items-center p-6 gap-10 text-white"
      >
        <div class="flex flex-col gap-4 mt-10" style="margin-right: 200px">
          <svg
            width="174"
            height="124"
            viewBox="0 0 174 174"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="174" height="174" fill="url(#pattern0_93_37)" />
            <defs>
              <pattern
                id="pattern0_93_37"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlink:href="#image0_93_37" transform="scale(0.0078125)" />
              </pattern>
              <image
                id="image0_93_37"
                width="128"
                height="128"
                preserveAspectRatio="none"
                xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>

          <div class="text-2xl font-bold">Cyber Security</div>
          <div>Updated devices are harder to hack and have newer features</div>
        </div>

        <!-- Quiz Card -->
        <div class="flex justify-center mt-10">
          <div
            class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-400 w-full max-w-xl text-center"
          >
            <h5 class="text-2xl font-bold mb-2 text-black text-start ml-5">
              Cyber Security Quiz
            </h5>
            <div class="text-gray-600 font-medium mb-4 ml-5">
              Test your knowledge about cybersecurity best practices.
            </div>
            <div
              class="flex flex-row justify-between items-center ml-5"
              style="margin-right: 30px"
            >
              <div>
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 96 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="96" height="96" fill="url(#pattern0_191_675)" />
                  <defs>
                    <pattern
                      id="pattern0_191_675"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlink:href="#image0_191_675"
                        transform="scale(0.0078125)"
                      />
                    </pattern>
                    <image
                      id="image0_191_675"
                      width="128"
                      height="128"
                      preserveAspectRatio="none"
                      xlink:href="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
              <button
                @click="startQuiz"
                style="background-color: #31247d; font-size: 15px"
                class="text-white px-4 py-2 shadow-sm border-spacing-3 rounded-lg"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Score After Quiz -->

    <!-- Popup Modal -->

    <div
      v-if="showPopup"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div
        class="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full text-gray-800 relative transition-all"
      >
        <div class="flex justify-center mt-10">
          <div class="w-full max-w-2xl">
            <div v-if="loading">Loading questions...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
              <div class="ml-1">
                Question {{ currentQuestionIndex + 1 }}
                <span class="text-red-500">*</span>
              </div>

              <p
                class="font-semibold mb-2 bg-gray-200 p-5 rounded-lg mt-1"
                style="height: 200px"
              >
                {{ filteredQuestions[currentQuestionIndex].question_text }}
              </p>

              <div class="ml-1">choice <span class="text-red-500">*</span></div>

              <div class="mb-6 p-4 rounded-md">
                <div
                  v-for="option in filteredQuestions[currentQuestionIndex]
                    .options"
                  :key="option.id"
                  class="flex items-center mb-2 mt-2 border bg-gray-200 rounded-lg p-1"
                >
                  <input
                    :type="
                      filteredQuestions[currentQuestionIndex].is_multiple_choice
                        ? 'checkbox'
                        : 'radio'
                    "
                    :name="'question_' + currentQuestionIndex"
                    :value="option.id"
                    v-model="selectedOptions[currentQuestionIndex]"
                    class="mr-2"
                  />
                  {{ option.option_text }}
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-end gap-3">
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
                  @click="submitQuiz"
                  class="px-4 py-2 rounded bg-green-400 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Close Button -->
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
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/question";
import router from "../../router";
import Header from "../../components/Header.vue";

// Routing & Store
const route = useRoute();
const assessmentId = parseInt(route.params.assessmentId);
const questionStore = useQuestionStore();

// State
const showPopup = ref(false);
const currentQuestionIndex = ref(0);
const selectedOptions = reactive({});
const score = ref(null);

// Load submitted answers on mount
onMounted(async () => {
  await questionStore.loadAllSubmittedAnswers(assessmentId);
});

// Get loading and error states from store
const { loading, error } = questionStore;

// Filter questions by assessment ID
const filteredQuestions = computed(() =>
  questionStore.submittedAnswers.filter(
    (q) => q.assessment && q.assessment.id == assessmentId
  )
);

// Initialize selectedOptions per question
watch(filteredQuestions, (questions) => {
  questions.forEach((q, index) => {
    if (!(index in selectedOptions)) {
      selectedOptions[index] = q.is_multiple_choice ? [] : null;
    }
  });
});

// Start and close popup
const startQuiz = () => {
  showPopup.value = true;
  score.value = null;
};

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

// Submit Quiz
const submitQuiz = async () => {
  let totalPoints = 0;
  const totalQuestions = filteredQuestions.value.length;

  for (let index in selectedOptions) {
    const question = filteredQuestions.value[index];
    const selected = selectedOptions[index];
    const selectedOptionIds = Array.isArray(selected) ? selected : [selected];

    const correctOptionIds = question.options
      .filter((option) => option.is_correct)
      .map((option) => option.id);

    console.log(`Question ${parseInt(index) + 1}:`);
    console.log(`Selected Options: ${JSON.stringify(selectedOptionIds)}`);
    console.log(`Correct Option IDs: ${JSON.stringify(correctOptionIds)}`);

    let points = 0;

    if (correctOptionIds.length > 1) {
      // Multiple-choice scoring
      const correctCount = selectedOptionIds.filter((id) =>
        correctOptionIds.includes(id)
      ).length;

      const wrongCount = selectedOptionIds.filter(
        (id) => !correctOptionIds.includes(id)
      ).length;

      const pointsPerCorrect = 1 / correctOptionIds.length;
      const pointsPerWrong = -1 / selectedOptionIds.length; // ❗Penalty per selection count

      points = correctCount * pointsPerCorrect + wrongCount * pointsPerWrong;
      points = Math.max(0, points); // Prevent negative scores

      console.log(`Correct Count: ${correctCount}, Wrong Count: ${wrongCount}`);
      console.log(
        `Calculated Points for Question ${parseInt(index) + 1}: ${points}`
      );
    } else {
      // Single-choice question
      points = correctOptionIds.includes(selectedOptionIds[0]) ? 1 : 0;
      console.log(
        `Calculated Points for Question ${parseInt(index) + 1}: ${points}`
      );
    }

    totalPoints += points;

    // Send answer to backend
    const answerData = {
      question_id: question.id,
      option_ids: selectedOptionIds,
      user_id: 11, // Replace with real user ID
    };

    try {
      const res = await questionStore.submitUserAnswer(answerData);
      console.log("Backend Response:", res);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  }

  const totalPercentage = (totalPoints / totalQuestions) * 100;
  score.value = totalPercentage.toFixed(2);

  console.log(
    `Total Points: ${totalPoints}, Total Percentage: ${score.value}%`
  );

  router.push({
    name: "assessmentresult",
    query: { score: score.value },
  });

  closePopup();
};
</script>

<style scoped>
/* Add any scoped custom styles here */
</style>
