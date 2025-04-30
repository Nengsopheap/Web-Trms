import { defineStore } from "pinia";
import { getAllquestion, createQuestion, submitAnswer } from "../apis/question";

export const useQuestionStore = defineStore("question", {
  state: () => ({
    submittedAnswers:
      JSON.parse(localStorage.getItem("submittedAnswers")) || [],
    loading: false,
    error: null,
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
          ); // Save to localStorage
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
        // Optionally, you can reload or notify the user
      } catch (err) {
        this.error = err.message || "Failed to create question";
      }
    },

    async submitUserAnswer(answerData) {
      try {
        await submitAnswer(answerData);
        // Optionally, you can reload or notify the user
      } catch (err) {
        this.error = err.message || "Failed to submit answer";
      }
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
