<template>
  <div class="p-3">
    <h1 class="text-2xl font-bold mb-4">Questions</h1>
    <!-- Button to open modal -->
    <div class="flex justify-end items-end mb-4">
      <button
        @click="showModal = true"
        class="bg-[#B90C0E] p-2 rounded-md text-white"
      >
        Create Question
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          @click="showModal = false"
          class="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        <h2 class="text-lg font-bold mb-4">Create Question</h2>
        <form @submit.prevent="submitQuestion">
          <div class="flex flex-col gap-2">
            <div>Select Assessment</div>
            <select
              v-model="newQuestion.assessment_id"
              class="w-full mb-3 p-2 border rounded"
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

          <input
            v-model="newQuestion.question_text"
            placeholder="Enter question text"
            class="w-full mb-3 p-2 border rounded"
            required
          />
          <div class="flex flex-row gap-2">
            <select
              v-model="newQuestion.type"
              class="w-full mb-3 p-2 border rounded"
              required
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="single_choice">Single Choice</option>
              <option value="yes_no">Yes/No</option>
            </select>

            <input
              v-model="newQuestion.points"
              type="number"
              placeholder="Points"
              class="w-full mb-3 p-2 border rounded"
              required
            />
          </div>

          <!-- Options for multiple/single choice -->
          <div
            v-if="
              newQuestion.type === 'multiple_choice' ||
              newQuestion.type === 'single_choice'
            "
          >
            <label class="block font-medium mb-1">Options:</label>
            <div
              v-for="(option, index) in newQuestion.options"
              :key="index"
              class="flex gap-2 mb-3"
            >
              <input
                v-model="option.option_text"
                placeholder="Option Text"
                class="flex-1 p-2 border rounded"
                required
              />
              <label class="flex items-center gap-1">
                <input v-model="option.is_correct" type="checkbox" />
                Correct
              </label>
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                @click="addOption"
                class="bg-[#111827] p-2 rounded-md text-white mb-3"
              >
                + Add Option
              </button>
            </div>
          </div>

          <!-- Yes/No predefined options -->
          <div v-if="newQuestion.type === 'yes_no'" class="mb-3">
            <label class="block font-medium mb-1">Yes/No Options:</label>
            <div class="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                v-model="newQuestion.options[0].is_correct"
                @change="onYesNoChange(0)"
              />
              <span>Yes (Correct)</span>
            </div>
            <div class="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                v-model="newQuestion.options[1].is_correct"
                @change="onYesNoChange(1)"
              />
              <span>No (Correct)</span>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-[#111827] p-2 rounded-md text-white mb-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- List Questions -->
    <div class="container mx-auto p-4">
      <div v-if="loading" class="text-center text-lg">Loading questions...</div>
      <div v-else-if="error" class="text-center text-red-500">
        Error: {{ error }}
      </div>
      <div v-else>
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="mb-4 p-4 border border-gray-200 rounded-lg shadow-md"
        >
          <!-- inside your question card header, beside the dropdown icon -->
          <div
            class="text-xl font-semibold mb-2 flex items-center justify-between"
          >
            <span>{{ question.question_text }}</span>
            <div class="flex items-center gap-2">
              <!-- Dropdown Icon -->
              <button @click="toggleDropdown(index)" class="text-blue-500">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <!-- Delete Icon -->
              <button
                @click="deleteQuestion(question.id)"
                class="text-red-500 hover:text-red-700"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            v-if="isDropdownOpen(index)"
            class="mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <ul class="list-disc pl-5">
              <li
                v-for="(option, idx) in question.options"
                :key="idx"
                class="mb-1"
              >
                {{ option.option_text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, } from "vue";
import { useQuestionStore } from "../../stores/question";
import { useAssessmentStore } from "../../stores/assessment";

export default {
  setup() {
    const showModal = ref(false);
    const questionStore = useQuestionStore();
    const assessmentStore = useAssessmentStore();
    const dropdownState = reactive({});
    const assessments = ref([]);

    const newQuestion = ref({
      question_text: "",
      assessment_id: null,
      points: 0,
      options: [{ option_text: "", is_correct: false }],
      type: "multiple_choice",
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
      newQuestion.value.is_multiple_choice =
        newQuestion.value.type === "multiple_choice";
      newQuestion.value.is_yes_no = newQuestion.value.type === "yes_no";

      const success = await questionStore.addQuestion(newQuestion.value);
      if (success) {
        await questionStore.loadAllSubmittedAnswers(); // ✅ refresh the list
        showModal.value = false; // ✅ close modal
        resetForm(); // ✅ reset form
      }
    };
    const deleteQuestion = async (id) => {
  const success = await questionStore.deleteQuestion(id); // Call delete
  if (success) {
    // This will update the list of questions after deletion
    await questionStore.loadAllSubmittedAnswers(); 
  } else {
    alert("Failed to delete question");
  }
};



    const addOption = () => {
      newQuestion.value.options.push({ option_text: "", is_correct: false });
    };

    const onYesNoChange = (index) => {
      if (
        newQuestion.value.options[0].is_correct &&
        newQuestion.value.options[1].is_correct
      ) {
        newQuestion.value.options[index === 0 ? 1 : 0].is_correct = false;
      }
    };

    const toggleDropdown = (index) => {
      dropdownState[index] = !dropdownState[index];
    };

    const isDropdownOpen = (index) => {
      return dropdownState[index] || false;
    };

    watch(
      () => newQuestion.value.type,
      (type) => {
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
      assessments.value = assessmentStore.assessments;
      await questionStore.loadAllSubmittedAnswers();
    });

    return {
      showModal,
      newQuestion,
      assessments,
      questions: questionStore.submittedAnswers,
      loading: questionStore.loading,
      error: questionStore.error,
      addOption,
      submitQuestion,
      onYesNoChange,
      toggleDropdown,
      isDropdownOpen,
      deleteQuestion,
    };
  },
};
</script>
