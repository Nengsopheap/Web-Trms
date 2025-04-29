import { defineStore } from "pinia";
import {
  fetchAssessments,
  fetchAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  fetchAssessmentScore,
} from "../apis/assessment";

export const useAssessmentStore = defineStore("assessment", {
  state: () => ({
    assessments: [],
    selectedAssessment: null,
    loading: false,
    error: null,
    totalScore: null,
  }),

  actions: {
    async loadAssessments() {
      this.loading = true;
      this.error = null;
      try {
        this.assessments = await fetchAssessments();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async loadAssessment(id) {
      this.loading = true;
      this.error = null;
      try {
        this.selectedAssessment = await fetchAssessmentById(id);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async createNewAssessment(data) {
      try {
        await createAssessment(data);
        await this.loadAssessments(); // Refresh list after creation
      } catch (err) {
        this.error = err.message;
      }
    },

    async updateExistingAssessment(id, data) {
      try {
        await updateAssessment(id, data);
        await this.loadAssessments(); // Refresh list after update
      } catch (err) {
        this.error = err.message;
      }
    },

    async removeAssessment(id) {
      try {
        await deleteAssessment(id);
        await this.loadAssessments(); // Refresh list after deletion
      } catch (err) {
        this.error = err.message;
      }
    },

    async loadAssessmentScore(assessment_id) {
      try {
        const result = await fetchAssessmentScore(assessment_id);
        this.totalScore = result.total_score;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
