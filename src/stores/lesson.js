import { defineStore } from 'pinia';
import {
  fetchLessonsByAssessmentId,
  fetchLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../apis/lesson';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lessons: [],
    currentLesson: null,
    loading: false,
    error: null,
  }),

  actions: {
    async loadLessonsByAssessmentId(assessmentId) {
      try {
        this.loading = true;
        this.lessons = await fetchLessonsByAssessmentId(assessmentId);
      } catch (e) {
        this.error = e;
        // console.error("Error in loadLessonsByAssessmentId:", e);
      } finally {
        this.loading = false;
      }
    },

    async loadLessonById(id) {
      try {
        this.currentLesson = await fetchLessonById(id);
      } catch (e) {
        this.error = e;
      }
    },

    async addLesson(lessonData) {
      try {
        const newLesson = await createLesson(lessonData);
        this.lessons.push(newLesson);
      } catch (e) {
        this.error = e;
      }
    },

    async editLesson(id, lessonData) {
      try {
        const updated = await updateLesson(id, lessonData);
        const index = this.lessons.findIndex((l) => l.id === id);
        if (index !== -1) this.lessons[index] = updated;
      } catch (e) {
        this.error = e;
      }
    },

    async removeLesson(id) {
      try {
        await deleteLesson(id);
        this.lessons = this.lessons.filter((l) => l.id !== id);
      } catch (e) {
        this.error = e;
      }
    },
  },
});
