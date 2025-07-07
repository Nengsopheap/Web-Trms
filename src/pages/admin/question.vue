<template>
  <div class="p-3">
    <h1 class="text-2xl font-bold mb-6">{{ $t("title.Questions") }}</h1>

    <!-- Button to open modal -->
    <div class="flex justify-between items-center">
      <div>
        <label class="mr-2 text-sm text-gray-600"
          >{{ $t("title.Filter_by_Assessment") }}:</label
        >
        <select
          v-model="selectedAssessmentId"
          class="border rounded px-2 py-1 text-sm"
        >
          <option :value="null">All</option>
          <option v-for="a in assessments" :key="a.id" :value="a.id">
            {{ a.name }}
          </option>
        </select>
      </div>
      <button
        @click="showModal = true"
        class="bg-[#111827] p-1 px-3 rounded-md text-white"
      >
        + {{ $t("button.create_question") }}
      </button>
    </div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-full max-w-2xl rounded-lg shadow-lg relative">
        <!-- Close Modal Button -->
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-black"
          title="Close"
        >
          ✖
        </button>

        <!-- Header -->
        <div class="px-6 pt-6 pb-2 border-b">
          <h2 class="text-xl font-bold text-gray-800">
            {{
              isEditMode
                ? $t("title.update_question")
                : $t("button.create_question")
            }}
          </h2>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitQuestion" class="px-6 py-6 space-y-5">
          <!-- Select Assessment -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("title.select_assessment")
            }}</label>
            <select
              v-model="newQuestion.assessment_id"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#111827]"
              required
            >
              <option
                v-for="assessment in assessments"
                :key="assessment.id"
                :value="assessment.id"
              >
                {{ assessment.name }}
              </option>
            </select>
          </div>

          <!-- Question Text -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              $t("title.Questions")
            }}</label>
            <input
              v-model="newQuestion.question_text"
              :placeholder="$t('title.Enter_Question')"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#111827]"
              required
            />
          </div>

          <!-- Category / Level Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("title.level") }}
            </label>
            <select
              v-model="newQuestion.category"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#111827]"
            >
              <option value="easy">{{ $t("title.level1") }}</option>
              <option value="medium">{{ $t("title.level2") }}</option>
              <option value="hard">{{ $t("title.level3") }}</option>
            </select>
          </div>

          <!-- Type & Points -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("title.Type")
              }}</label>
              <select
                v-model="newQuestion.type"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#111827]"
                required
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="single_choice">Single Choice</option>
                <option value="yes_no">Yes/No</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{
                $t("title.Points")
              }}</label>
              <input
                v-model="newQuestion.points"
                type="number"
                min="1"
                placeholder="Points"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#111827]"
                required
              />
            </div>
          </div>

          <!-- Options for Multiple/Single -->
          <div
            v-if="
              ['multiple_choice', 'single_choice'].includes(newQuestion.type)
            "
          >
            <label class="block font-medium mb-2 text-sm text-gray-700"
              >{{ $t("title.Options") }}:</label
            >
            <div
              v-for="(option, index) in newQuestion.options"
              :key="index"
              class="flex items-center gap-2 mb-3"
            >
              <button
                type="button"
                @click="removeOption(index)"
                class="text-red-500 hover:text-red-700 text-sm"
                title="Remove option"
              >
                ✖
              </button>
              <input
                v-model="option.option_text"
                :placeholder="$t('title.enter_option')"
                class="flex-1 p-2 border rounded"
                required
              />
              <label class="flex items-center gap-1 text-sm text-gray-600">
                <input
                  type="checkbox"
                  :checked="option.is_correct"
                  @change="toggleCorrectOption(index, $event.target.checked)"
                />
                {{ $t("title.Correct") }}
              </label>
            </div>
            <button
              type="button"
              @click="addOption"
              class="bg-[#111827] text-white px-3 py-1.5 rounded-md text-sm"
            >
              + {{ $t("button.add_option") }}
            </button>
          </div>

          <!-- Yes/No Options -->
          <div v-if="newQuestion.type === 'yes_no'" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Yes/No Options:</label
            >
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="newQuestion.options[0].is_correct"
                @change="onYesNoChange(0)"
              />
              <span>Yes (Correct)</span>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="newQuestion.options[1].is_correct"
                @change="onYesNoChange(1)"
              />
              <span>No (Correct)</span>
            </div>
          </div>
        </form>

        <!-- Footer -->
        <div class="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            {{ $t("button.Cancel") }}
          </button>
          <button
            @click="submitQuestion"
            class="px-5 py-2 rounded bg-[#111827] text-white hover:bg-gray-900"
          >
            {{
              isEditMode
                ? $t("button.Save")
                : $t("button.create_question")
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- Filter + Table View -->
    <div class="w-full mx-auto mt-4">
      <div
        class="bg-white p-6 rounded-lg shadow-[0_4px_12px_rgba(76,56,187,0.25)] overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#111827] text-white">
            <tr>
              <th
                class="px-4 py-2 text-left text-sm font-medium"
                style="width: 3%"
              >
                #
              </th>
              <th
                class="px-4 py-2 text-left text-sm font-medium"
                style="width: 60%"
              >
                {{ $t("title.Questions") }}
              </th>
              <th
                class="px-4 py-2 text-center text-sm font-medium"
                style="width: 10%"
              >
                {{ $t("title.Type") }}
              </th>
              <th
                class="px-4 py-2 text-center text-sm font-medium"
                style="width: 10%"
              >
                {{ $t("title.Points") }}
              </th>
              <th
                class="px-4 py-2 text-center text-sm font-medium"
                style="width: 10%"
              >
                {{ $t("title.Quiz_Categoty") }}
              </th>
              <th class="px-4 py-2 text-right text-sm font-medium">
                {{ $t("title.Actions") }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="filteredQuestions.length === 0">
              <td colspan="6" class="text-center text-gray-500 py-4">
                {{ $t("title.No_questions_found") }}
              </td>
            </tr>
            <template
              v-for="(question, index) in paginatedQuestions"
              :key="question.id"
            >
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-2 text-sm text-gray-700">{{ index + 1 }}</td>
                <td class="px-4 py-2 text-sm text-gray-900">
                  {{ question.question_text }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 text-center">
                  {{
                    question.type ||
                    (question.is_yes_no
                      ? "Yes/No"
                      : question.is_multiple_choice
                      ? "Multiple"
                      : "Single")
                  }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 text-center">
                  {{ question.points }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 text-center">
                  {{ question.assessment?.name || "N/A" }}
                </td>
                <td class="px-4 py-2 text-sm text-right">
                  <div class="flex justify-end gap-2">
                    <button
                      @click="openEditModal(question)"
                      class="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <SquarePen width="19" height="19" />
                    </button>
                    <button
                      @click="openViewModal(question)"
                      class="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Icon icon="mdi:eye" class="w-5 h-5" />
                    </button>
                    <button
                      @click="deleteQuestion(question.id)"
                      class="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Icon icon="mdi:trash-can" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="isDropdownOpen(index)">
                <td colspan="6" class="px-4 py-2 bg-gray-50">
                  <ul class="list-disc ml-6 text-sm text-gray-700">
                    <li
                      v-for="(option, idx) in question.options"
                      :key="idx"
                      class="mb-1"
                    >
                      {{ option.option_text }}
                      <span
                        v-if="option.is_correct"
                        class="text-green-500 font-semibold"
                      >
                        (Correct)
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
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

    <!-- View Question Modal -->
    <div
      v-if="viewModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-white w-full max-w-xl rounded-lg shadow-lg relative">
        <div class="absolute top-3 text-black px-8">
          {{ $t("title.Questions") }}
        </div>
        <button
          @click="closeViewModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-black"
          title="Close"
        >
          ✖
        </button>
        <div class="px-8 pt-6 pb-4 mt-4">
          <h2 class="text-lg font-kantumruy font-semibold mb-4 text-gray-700">
            {{ viewQuestion.question_text }}
          </h2>
          <!-- Level (Category) -->
          <p class="text-sm text-gray-600 mb-4">
            {{ $t("title.level") }}:
            <span
              :class="{
                'text-green-600': viewQuestion.category === 'easy',
                'text-yellow-600': viewQuestion.category === 'medium',
                'text-red-600': viewQuestion.category === 'hard',
              }"
              class="capitalize font-semibold"
            >
              {{ viewQuestion.category }}
            </span>
          </p>
          <p class="text-sm text-gray-600 mb-4">
            {{ $t("title.Points") }}: {{ viewQuestion.points }}
          </p>
          <div v-if="viewQuestion.options && viewQuestion.options.length">
            <h3 class="text-sm font-semibold text-gray-700 mb-2">
              {{ $t("title.Options") }}:
            </h3>
            <ul class="list-disc ml-5 text-sm text-gray-700">
              <li
                v-for="(opt, idx) in viewQuestion.options"
                :key="idx"
                class="mb-1"
              >
                {{ opt.option_text }}
                <span
                  v-if="opt.is_correct"
                  class="text-green-500 font-semibold"
                >
                  (Correct)
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="px-6 py-4 border-t flex justify-end bg-gray-50">
          <!-- <button
            @click="closeViewModal"
            class="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            Close
          </button> -->
          <button
            type="button"
            @click="closeViewModal"
            class="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            {{ $t("button.Cancel") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useQuestionStore } from "../../stores/question";
import { useAssessmentStore } from "../../stores/assessment";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { ChevronLeft, ChevronRight, SquarePen } from "lucide-vue-next";

export default {
  components: {
    Icon,
    ChevronRight,
    ChevronLeft,
    SquarePen,
  },
  setup() {
    const { t } = useI18n();
    const showModal = ref(false);
    const questionStore = useQuestionStore();
    const assessmentStore = useAssessmentStore();
    const dropdownState = reactive({});
    const selectedAssessmentId = ref(null);

    const newQuestion = ref({
      question_text: "",
      assessment_id: null,
      points: 0,
      category: "easy",
      options: [{ option_text: "", is_correct: false }],
      type: "multiple_choice",
    });

    const assessments = computed(() => assessmentStore.assessments);
    const questions = computed(() => questionStore.submittedAnswers);

    const filteredQuestions = computed(() => {
      if (!questions.value || questions.value.length === 0) return [];
      if (!selectedAssessmentId.value) return questions.value;
      return questions.value.filter(
        (q) => q.assessment?.id === selectedAssessmentId.value
      );
    });

    // ✅ PAGINATION
    const currentPage = ref(1);
    const perPage = ref(10);

    const paginatedQuestions = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      return filteredQuestions.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredQuestions.value.length / perPage.value);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    // Reset to page 1 on filter
    watch(selectedAssessmentId, () => {
      currentPage.value = 1;
    });

    const resetForm = () => {
      newQuestion.value = {
        question_text: "",
        assessment_id: null,
        points: 0,
        options: [{ option_text: "", is_correct: false }],
        type: "multiple_choice",
      };
    };

    const submitQuestion = async () => {
      // Validation checks as before...

      newQuestion.value.is_multiple_choice =
        newQuestion.value.type === "multiple_choice";
      newQuestion.value.is_yes_no = newQuestion.value.type === "yes_no";

      let success;
      if (isEditMode.value && editingQuestionId.value) {
        success = await questionStore.updateQuestion(
          editingQuestionId.value,
          newQuestion.value
        );
      } else {
        success = await questionStore.addQuestion(newQuestion.value);
      }

      if (success) {
        await questionStore.loadAllSubmittedAnswers();
        showModal.value = false;
        resetForm();
        isEditMode.value = false;
        editingQuestionId.value = null;
        toast.success(t("validation.Create_successful"), {
          autoClose: 2000,
          position: "top-right",
        });
      }
    };

    const viewModalVisible = ref(false);
    const viewQuestion = ref({});

    const openViewModal = (question) => {
      viewQuestion.value = question;
      viewModalVisible.value = true;
    };

    const closeViewModal = () => {
      viewModalVisible.value = false;
      viewQuestion.value = {};
    };
    const closeModal = () => {
      resetForm();
      showModal.value = false;
      isEditMode.value = false;
      editingQuestionId.value = null;
    };
    const isEditMode = ref(false);
    const editingQuestionId = ref(null);
    const openEditModal = (question) => {
      isEditMode.value = true;
      editingQuestionId.value = question.id;

      const questionType =
        question.type ||
        (question.is_yes_no
          ? "yes_no"
          : question.is_multiple_choice
          ? "multiple_choice"
          : "single_choice");

      let options = question.options.map((opt) => ({
        option_text: opt.option_text,
        is_correct: opt.is_correct,
        id: opt.id,
      }));

      // Handle yes_no to always have Yes/No labels
      if (questionType === "yes_no") {
        const yesCorrect = options.find(
          (o) => o.option_text === "Yes"
        )?.is_correct;
        const noCorrect = options.find(
          (o) => o.option_text === "No"
        )?.is_correct;

        options = [
          { option_text: "Yes", is_correct: !!yesCorrect },
          { option_text: "No", is_correct: !!noCorrect },
        ];
      }

      newQuestion.value = {
        question_text: question.question_text || "",
        assessment_id: question.assessment?.id || null,
        points: question.points || 1,
        category: question.category || "easy",
        type: questionType,
        options,
      };

      showModal.value = true;
    };

    const deleteQuestion = async (id) => {
      const success = await questionStore.deleteQuestion(id);
      if (success) {
        toast.success("Delete successful!", {
          autoClose: 2000,
          position: "top-right",
        });
      } else {
        toast.error("Delete failed", {
          autoClose: 3000,
          position: "top-right",
        });
      }
    };

    // const closeModal = () => {
    //   resetForm();
    //   showModal.value = false;
    // };

    const addOption = () => {
      newQuestion.value.options.push({ option_text: "", is_correct: false });
    };

    const removeOption = (index) => {
      if (newQuestion.value.options.length > 1) {
        newQuestion.value.options.splice(index, 1);
      }
    };

    const onYesNoChange = (index) => {
      if (
        newQuestion.value.options[0].is_correct &&
        newQuestion.value.options[1].is_correct
      ) {
        newQuestion.value.options[index === 0 ? 1 : 0].is_correct = false;
      }
    };

    function toggleCorrectOption(index, checked) {
      if (newQuestion.value.type === "single_choice") {
        newQuestion.value.options.forEach((opt, i) => {
          opt.is_correct = i === index ? checked : false;
        });
      } else {
        newQuestion.value.options[index].is_correct = checked;
      }
    }

    const toggleDropdown = (index) => {
      dropdownState[index] = !dropdownState[index];
    };

    const isDropdownOpen = (index) => {
      return dropdownState[index] || false;
    };

    watch(
      () => newQuestion.value.type,
      (type) => {
        if (isEditMode.value) return; // ✅ Don't reset if in edit mode

        if (type === "yes_no") {
          newQuestion.value.options = [
            { option_text: "Yes", is_correct: false },
            { option_text: "No", is_correct: false },
          ];
        } else {
          newQuestion.value.options = [{ option_text: "", is_correct: false }];
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      await assessmentStore.loadAssessments();
      await questionStore.loadAllSubmittedAnswers();

      // console.log(
      //   "Assessments List:",
      //   JSON.stringify(assessmentStore.assessments, null, 2)
      // );
      // console.log(
      //   "Questions List:",
      //   JSON.stringify(questionStore.submittedAnswers, null, 2)
      // );

      const savedAssessmentId = localStorage.getItem("selectedAssessmentId");
      if (savedAssessmentId) {
        selectedAssessmentId.value = isNaN(savedAssessmentId)
          ? savedAssessmentId
          : parseInt(savedAssessmentId);
      }
    });

    return {
      showModal,
      newQuestion,
      assessments,
      questions,
      filteredQuestions,
      selectedAssessmentId,
      loading: computed(() => questionStore.loading),
      error: computed(() => questionStore.error),
      addOption,
      submitQuestion,
      onYesNoChange,
      removeOption,
      closeModal,
      resetForm,
      toggleCorrectOption,
      toggleDropdown,
      isDropdownOpen,
      deleteQuestion,
      viewModalVisible,
      viewQuestion,
      openViewModal,
      closeViewModal,

      // Pagination
      currentPage,
      perPage,
      totalPages,
      nextPage,
      prevPage,
      paginatedQuestions,

      // **Add this**
      openEditModal,
      isEditMode,
      editingQuestionId,
    };
  },
};
</script>
