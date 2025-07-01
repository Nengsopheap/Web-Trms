<template>
  <div>
    <Header class="sticky top-0 z-50 bg-white shadow-md" />

    <div class="min-h-screen" style="background-color: #ffffff">
      <div class="min-h-screen flex justify-center items-center text-white">
        <div
          class="flex flex-col items-center justify-center gap-4"
          style="margin-right: 150px; margin-top: -100px"
        >
          <div class="ml-5">
            <img src="/src/assets/image/quiz.png" style="height: 330px" />
          </div>
          <div v-if="lessons.length > 0" style="margin-top: -40px">
            <div
              class="text-4xl font-bold text-black text-opacity-80 text-center"
            >
              {{ locale === "kh" ? lessons[0].name_kh : lessons[0].name_en }}
            </div>
            <div
              class="w-[530px] text-lg text-black text-opacity-80 mt-3 text-center"
            >
              {{
                locale === "kh" ? lessons[0].content_kh : lessons[0].content_en
              }}
            </div>
          </div>
        </div>

        <!-- Quiz Card -->
        <div
          class="flex justify-center"
          style="height: 250px; margin-top: -80px; width: 540px;"
        >
          <div
            class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#31247d] w-full max-w-2xl"
          >
            <div v-if="lessons.length > 0">
              <div
                class="text-3xl font-bold mb-2 text-black text-opacity-80 text-start ml-5"
              >
                {{ locale === "kh" ? lessons[0].name_kh : lessons[0].name_en }}
                Quiz
              </div>
            </div>
            <div class="text-gray-600 font-medium mb-4 ml-5">
              {{$t("title.knowledge")}}
            </div>
            <div
              class="flex flex-row justify-between items-center ml-5 mt-5"
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
                  <rect width="96" height="96" fill="url(#pattern0_112_11)" />
                  <defs>
                    <pattern
                      id="pattern0_112_11"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlink:href="#image0_112_11"
                        transform="scale(0.0078125)"
                      />
                    </pattern>
                    <image
                      id="image0_112_11"
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
                class="text-white px-6 py-2 shadow-sm border-spacing-3 rounded-lg"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-40 flex justify-center">
        <button
          class="flex items-center gap-2 px-6 py-3 bg-white text-[#31247D] text-opacity-90 border border-[#ddd] shadow hover:shadow-lg rounded-xl transition-transform duration-300 hover:scale-105 font-kantumruy font-bold"
        >
          <svg
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.29 11.5241C5.19627 11.619 5.12188 11.7319 5.07111 11.8563C5.02034 11.9806 4.9942 12.1141 4.9942 12.2488C4.9942 12.3836 5.02034 12.517 5.07111 12.6414C5.12188 12.7657 5.19627 12.8786 5.29 12.9735L8.29 16.0357C8.38296 16.1314 8.49356 16.2073 8.61542 16.2592C8.73728 16.311 8.86799 16.3377 9 16.3377C9.13201 16.3377 9.26272 16.311 9.38458 16.2592C9.50644 16.2073 9.61704 16.1314 9.71 16.0357L12.71 12.9735C12.8983 12.7813 13.0041 12.5206 13.0041 12.2488C13.0041 11.977 12.8983 11.7163 12.71 11.5241C12.5217 11.3319 12.2663 11.2239 12 11.2239C11.7337 11.2239 11.4783 11.3319 11.29 11.5241L10 12.851V1.02073C10 0.750018 9.89464 0.490391 9.70711 0.298966C9.51957 0.107541 9.26522 0 9 0C8.73478 0 8.48043 0.107541 8.29289 0.298966C8.10536 0.490391 8 0.750018 8 1.02073V12.851L6.71 11.5241C6.61704 11.4284 6.50644 11.3525 6.38458 11.3007C6.26272 11.2488 6.13201 11.2222 6 11.2222C5.86799 11.2222 5.73728 11.2488 5.61542 11.3007C5.49356 11.3525 5.38296 11.4284 5.29 11.5241ZM15 7.14513H13C12.7348 7.14513 12.4804 7.25268 12.2929 7.4441C12.1054 7.63553 12 7.89515 12 8.16587C12 8.43658 12.1054 8.69621 12.2929 8.88764C12.4804 9.07906 12.7348 9.1866 13 9.1866H15C15.2652 9.1866 15.5196 9.29414 15.7071 9.48557C15.8946 9.67699 16 9.93662 16 10.2073V17.3525C16 17.6232 15.8946 17.8828 15.7071 18.0742C15.5196 18.2657 15.2652 18.3732 15 18.3732H3C2.73478 18.3732 2.48043 18.2657 2.29289 18.0742C2.10536 17.8828 2 17.6232 2 17.3525V10.2073C2 9.93662 2.10536 9.67699 2.29289 9.48557C2.48043 9.29414 2.73478 9.1866 3 9.1866H5C5.26522 9.1866 5.51957 9.07906 5.70711 8.88764C5.89464 8.69621 6 8.43658 6 8.16587C6 7.89515 5.89464 7.63553 5.70711 7.4441C5.51957 7.25268 5.26522 7.14513 5 7.14513H3C2.20435 7.14513 1.44129 7.46776 0.87868 8.04203C0.316071 8.61631 0 9.39519 0 10.2073V17.3525C0 18.1646 0.316071 18.9435 0.87868 19.5178C1.44129 20.092 2.20435 20.4147 3 20.4147H15C15.7956 20.4147 16.5587 20.092 17.1213 19.5178C17.6839 18.9435 18 18.1646 18 17.3525V10.2073C18 9.39519 17.6839 8.61631 17.1213 8.04203C16.5587 7.46776 15.7956 7.14513 15 7.14513Z"
              fill="#31247D"
            />
          </svg>

          Learn More
        </button>
      </div> -->

      <!-- Cold System-Like Difficulty Selection Modal -->
      <div
        v-if="selectingDifficulty"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-full max-w-md mx-4 sm:mx-auto px-6 py-8 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 transition-all"
        >
          <!-- Title -->
          <h2
            class="text-2xl font-bold mb-6 text-center tracking-wide flex items-center justify-center gap-2"
          >
            🎯 សូមជ្រើសរើសកម្រិតនៃការសំណួរ
          </h2>

          <!-- Difficulty Buttons -->
          <div class="flex flex-col gap-4">
            <button
              @click="chooseDifficulty('easy')"
              class="w-full py-3 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-900 dark:text-white rounded-lg text-sm font-medium transition"
            >
              ងាយ — កម្រិតទី ១
            </button>
            <button
              @click="chooseDifficulty('medium')"
              class="w-full py-3 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-yellow-900 dark:text-white rounded-lg text-sm font-medium transition"
            >
              មធ្យម — កម្រិតទី ២
            </button>
            <button
              @click="chooseDifficulty('hard')"
              class="w-full py-3 bg-red-100 hover:bg-red-200 dark:bg-red-700 dark:hover:bg-red-600 text-red-900 dark:text-white rounded-lg text-sm font-medium transition"
            >
              ពិបាក — កម្រិតទី ៣
            </button>
          </div>

          <!-- Cancel -->
          <div class="text-center mt-6">
            <button
              @click="selectingDifficulty = false"
              class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white font-medium underline transition"
            >
              បោះបង់ & ត្រឡប់ទៅ
            </button>
          </div>
        </div>
      </div>

      <!-- Quiz Modal -->

      <div
        v-if="showPopup"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50"
      >
        <div
          class="bg-gray-900 text-white w-full max-w-2xl mx-auto p-8 rounded-2xl shadow-2xl border border-gray-700 relative"
        >
          <!-- Close Button -->
          <button
            @click="closePopup"
            class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl focus:outline-none"
          >
            &times;
          </button>

          <div v-if="loading" class="text-center font-mono text-gray-300">
            Loading questions...
          </div>

          <div v-else-if="error" class="text-red-400 text-center font-mono">
            {{ error }}
          </div>

          <div v-else>
            <!-- Question Header -->
            <div class="mb-4">
              <p class="text-sm font-mono text-gray-400">
                QUESTION {{ currentQuestionIndex + 1 }} /
                {{ filteredQuestions.length }}
                <span class="text-red-500">*</span>
              </p>
            </div>

            <!-- Question Box -->
            <div class="bg-gray-800 p-5 rounded-lg mb-6 min-h-[160px]">
              <p class="text-base font-semibold text-gray-100 leading-relaxed">
                {{ filteredQuestions[currentQuestionIndex].question_text }}
              </p>
            </div>

            <!-- Choices -->

            <div class="ml-1 text-sm text-gray-400 font-mono mb-2">
              Choice <span class="text-red-500">*</span>
              |
              <span class="italic">
                {{
                  filteredQuestions[currentQuestionIndex].is_yes_no
                    ? "Yes or No"
                    : filteredQuestions[currentQuestionIndex].is_multiple_choice
                    ? "Multiple answers"
                    : "Single answer"
                }}
              </span>
            </div>

            <!-- Choices -->
            <div class="space-y-3 mb-6">
              <label
                v-for="option in filteredQuestions[currentQuestionIndex]
                  .options"
                :key="option.id"
                class="flex items-center bg-gray-800 p-3 rounded-md border border-gray-700 hover:bg-gray-700 transition"
              >
                <input
                  type="checkbox"
                  v-if="
                    filteredQuestions[currentQuestionIndex].is_multiple_choice
                  "
                  :checked="
                    selectedOptions[currentQuestionIndex]?.includes(option.id)
                  "
                  @change="
                    handleCheckboxChange(
                      $event,
                      currentQuestionIndex,
                      option.id
                    )
                  "
                  class="mr-3 accent-indigo-500"
                />
                <input
                  type="radio"
                  v-else
                  :name="'question_' + currentQuestionIndex"
                  :value="option.id"
                  v-model="selectedOptions[currentQuestionIndex]"
                  class="mr-3 accent-indigo-500"
                />

                <span class="text-gray-200">{{ option.option_text }}</span>
              </label>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-8">
              <button
                @click="previousQuestion"
                :disabled="currentQuestionIndex === 0"
                class="bg-gray-700 hover:bg-gray-600 text-white font-mono px-4 py-2 rounded-md disabled:opacity-40 transition"
              >
                ◀ Prev
              </button>

              <div>
                <button
                  v-if="currentQuestionIndex < filteredQuestions.length - 1"
                  @click="nextQuestion"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white font-mono px-6 py-2 rounded-md transition"
                >
                  Next ▶
                </button>
                <button
                  v-else
                  @click="submitQuiz"
                  class="bg-green-500 hover:bg-green-600 text-white font-mono px-6 py-2 rounded-md transition"
                >
                  Submit ✔
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay="20">
        <Test />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/question";
import { useLessonStore } from "../../stores/lesson";
import router from "../../router";
import Header from "../../components/Header.vue";
import Test from "../../components/test.vue";
import Footer from "../../components/footer.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const route = useRoute();
const assessmentId = parseInt(route.params.assessmentId);
const questionStore = useQuestionStore();
const lessonStore = useLessonStore();
const lessons = ref([]);
const showPopup = ref(false);
const selectingDifficulty = ref(false);
const difficulty = ref(null); // 'easy', 'medium', 'hard'
const currentQuestionIndex = ref(0);
const selectedOptions = reactive({});
const score = ref(null);

onMounted(async () => {
  await questionStore.loadAllSubmittedAnswers(assessmentId);
  loadLessons(route.params.assessmentId);
});

const { loading, error } = questionStore;

const filteredQuestions = computed(() =>
  questionStore.submittedAnswers.filter(
    (q) =>
      q.assessment &&
      q.assessment.id == assessmentId &&
      (!difficulty.value || q.category === difficulty.value)
  )
);

watch(filteredQuestions, (questions) => {
  questions.forEach((q, index) => {
    if (!(index in selectedOptions)) {
      selectedOptions[index] = q.is_multiple_choice ? [] : null;
    }
  });
});
const loadLessons = async (assessmentId) => {
  lessonStore.lessons = [];
  lessons.value = [];

  const id = parseInt(assessmentId);
  if (!isNaN(id)) {
    await lessonStore.loadLessonsByAssessmentId(id);
    lessons.value = [...lessonStore.lessons]; // Ensure reactivity
  }
};

const handleCheckboxChange = (event, questionIndex, optionId) => {
  const question = filteredQuestions.value[questionIndex];
  const correctOptionCount = question.options.filter(
    (o) => o.is_correct
  ).length;

  if (!selectedOptions[questionIndex]) {
    selectedOptions[questionIndex] = [];
  }

  const selected = selectedOptions[questionIndex];

  if (event.target.checked) {
    if (selected.length < correctOptionCount) {
      selected.push(optionId);
    } else {
      event.target.checked = false; // Revert UI
      // alert(
      //   `You can only select ${correctOptionCount} option(s) for this question.`
      // );
    }
  } else {
    const idx = selected.indexOf(optionId);
    if (idx !== -1) {
      selected.splice(idx, 1);
    }
  }
};

const startQuiz = () => {
  selectingDifficulty.value = true;
};

const chooseDifficulty = (level) => {
  difficulty.value = level;
  selectingDifficulty.value = false;
  showPopup.value = true;
  score.value = null;
};

const closePopup = () => {
  showPopup.value = false;
};

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

const submitQuiz = async () => {
  const userId = localStorage.getItem("user_id");
  const answersPayload = [];

  const totalQuestions = filteredQuestions.value.length;
  let totalPoints = 0;
  const quizHistory = [];
  for (let i = 0; i < totalQuestions; i++) {
    const question = filteredQuestions.value[i];
    const selected = selectedOptions[i];
    const selectedOptionIds = Array.isArray(selected) ? selected : [selected];

    if (!question || !question.options) continue;

    answersPayload.push({
      question_id: question.id,
      option_ids: selectedOptionIds,
      user_id: parseInt(userId),
    });

    const correctOptionIds = question.options
      .filter((o) => o.is_correct)
      .map((o) => o.id);

    let points = 0;
    if (correctOptionIds.length > 1) {
      const correctCount = selectedOptionIds.filter((id) =>
        correctOptionIds.includes(id)
      ).length;
      const wrongCount = selectedOptionIds.filter(
        (id) => !correctOptionIds.includes(id)
      ).length;
      const pointsPerCorrect = 1 / correctOptionIds.length;
      const pointsPerWrong = -1 / selectedOptionIds.length;
      points = Math.max(
        0,
        correctCount * pointsPerCorrect + wrongCount * pointsPerWrong
      );
    } else {
      points = correctOptionIds.includes(selectedOptionIds[0]) ? 1 : 0;
    }

    totalPoints += points;

    quizHistory.push({
      question_text: question.question_text,
      options: question.options,
      selectedOptionIds,
      correctOptionIds,
      isCorrect:
        selectedOptionIds.length === correctOptionIds.length &&
        selectedOptionIds.every((id) => correctOptionIds.includes(id)),
    });
  }

  try {
    const response = await questionStore.submitUserAnswersBatch(answersPayload);
    console.log("Batch submission response:", response);

    score.value = response.percentage.toFixed(2);

    // Save quiz history
    localStorage.setItem("quiz_history", JSON.stringify(quizHistory));

    // Save full result data, including recommendation
    localStorage.setItem(
      "quiz_result_data",
      JSON.stringify({
        user_id: response.user_id,
        score: response.score,
        correctAnswers: response.correctAnswers,
        wrongAnswers: response.wrongAnswers,
        percentage: response.percentage,
        totalQuizzes: response.totalQuizzes,
        recommendedCourse: response.recommendedCourse,
      })
    );

    // Navigate to result page with score in query
    router.push({
      name: "assessmentresult",
      query: { score: score.value },
    });

    closePopup();
  } catch (error) {
    console.error("Batch submission failed:", error);
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
