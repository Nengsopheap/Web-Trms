import { defineStore } from "pinia";
import {
  getAllquestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
  getassessmentid,
} from "../apis/question";

export const useQuestionStore = defineStore("question", {
  state: () => ({
    submittedAnswers:
      JSON.parse(localStorage.getItem("submittedAnswers")) || [],
    questions: [],
    totalPoints: 0,
    totalCorrect: 0,
    totalQuizzes: 0,
    totalIncorrect: 0,
    loading: false,
    error: null,
    selectedAssessment: null,
  }),

  actions: {
    async loadAllSubmittedAnswers() {
      this.loading = true;
      this.error = null;
      try {
        const data = await getAllquestion();
        if (data && Array.isArray(data)) {
          this.submittedAnswers = data;
          localStorage.setItem(
            "submittedAnswers",
            JSON.stringify(this.submittedAnswers)
          );
        } else {
          console.warn("No data received from server.");
        }
      } catch (err) {
        this.error = err.message || "Failed to fetch submitted answers";
      } finally {
        this.loading = false;
      }
    },

    async addQuestion(questionData) {
      try {
        await createQuestion(questionData);
        return true;
      } catch (err) {
        this.error = err.message || "Failed to create question";
      }
    },

    async updateQuestion(id, updatedData) {
      try {
        await updateQuestion(id, updatedData);
        await this.loadAllSubmittedAnswers();
        return true;
      } catch (err) {
        this.error = err.message || "Failed to update question";
        return false;
      }
    },

    async deleteQuestion(id) {
      try {
        await deleteQuestion(id);
        await this.loadAllSubmittedAnswers();
        return true;
      } catch (err) {
        this.error = err.message || "Failed to delete question";
        return false;
      }
    },

    // ✅ BATCH submission for new backend
    async submitUserAnswersBatch(answersPayload) {
      try {
        const response = await submitAnswer(answersPayload); // Updated to send array
        return response;
      } catch (err) {
        this.error = err.message || "Failed to submit batch answers";
        throw err;
      }
    },

    getTotalPercentage() {
      if (this.totalQuizzes === 0) return 0;
      return (this.totalCorrect / this.totalQuizzes) * 100;
    },

    async getassessmentid(id) {
      this.loading = true;
      this.error = null;
      try {
        this.selectedAssessment = await getassessmentid(id);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
