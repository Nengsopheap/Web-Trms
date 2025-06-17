// store/userStore.js
import { defineStore } from "pinia";
import { fetchAllUserScores } from "../apis/user";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    loading: false,
    scores: [],
    error: null,
  }),
  actions: {
    async loadUsers() {
      this.loading = true;
      this.error = null;
      try {
        this.users = await fetchAllUsers();
      } catch (err) {
        this.error = "Failed to load users";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async loadScores() {
      this.loading = true;
      this.error = null;
      try {
        this.scores = await fetchAllUserScores(); 
      } catch (err) {
        this.error = "Failed to load scores";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
