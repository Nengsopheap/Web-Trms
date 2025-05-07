import { defineStore } from "pinia";
import { getAllquestion, createQuestion, submitAnswer,deleteQuestion } from "../apis/question";

export const useQuestionStore = defineStore("question", {
  state: () => ({
    submittedAnswers:
      JSON.parse(localStorage.getItem("submittedAnswers")) || [],
    questions: [],

    // Store the total incorrect answers
    totalPoints: 0,
    totalCorrect: 0,
    totalQuizzes: 0,
    totalIncorrect: 0,
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
        return true;
      } catch (err) {
        this.error = err.message || "Failed to create question";
      }
    },

    async updateQuestion(id, updatedData) {
      try {
        await updateQuestion(id, updatedData);
        // Reload questions after update
        await this.loadAllSubmittedAnswers();
        return true;
      } catch (err) {
        this.error = err.message || "Failed to update question";
        return false;
      }
    },

    async deleteQuestion(id) {
      try {
        await deleteQuestion(id); // API call to delete the question
        // Reload questions after deletion
        await this.loadAllSubmittedAnswers(); 
        return true;
      } catch (err) {
        this.error = err.message || "Failed to delete question";
        return false;
      }
    },
    
    

    async submitUserAnswer(answerData) {
      try {
        const response = await submitAnswer(answerData);
        console.log("Response from backend:", response);

        if (response) {
          // Accumulate the total points
          this.totalPoints += response.points;

          // Accumulate the number of correct and incorrect answers
          if (response.correct) {
            this.totalCorrect += 1;
          } else {
            this.totalIncorrect += 1;
          }

          // Increment the total number of quizzes attempted
          this.totalQuizzes += 1;

          // Optionally, save the updated data to localStorage
          localStorage.setItem("totalPoints", JSON.stringify(this.totalPoints));
          localStorage.setItem(
            "totalCorrect",
            JSON.stringify(this.totalCorrect)
          );
          localStorage.setItem(
            "totalIncorrect",
            JSON.stringify(this.totalIncorrect)
          );
          localStorage.setItem(
            "totalQuizzes",
            JSON.stringify(this.totalQuizzes)
          );
        }

        return response; // return the response for further processing in the component
      } catch (err) {
        this.error = err.message || "Failed to submit answer";
        return null;
      }
    },

    // Optional: Method to calculate total percentage based on accumulated scores
    getTotalPercentage() {
      if (this.totalQuizzes === 0) return 0; // Avoid division by zero
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
