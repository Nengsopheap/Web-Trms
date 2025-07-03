// store/userStore.js
import { defineStore } from "pinia";
import { fetchAllUserScores,fetchAllUsers,createUser,deleteUser,updateUser } from "../apis/user";

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

        async addUser(userData) {
      try {
        const newUser = await createUser(userData);
        this.users.push(newUser); // Update list locally
      } catch (err) {
        console.error(err);
        this.error = "Failed to create user";
      }
    },

    async removeUser(id) {
      try {
        await deleteUser(id);
        this.users = this.users.filter((u) => u.id !== id);
      } catch (err) {
        // console.error(err);
        // this.error = "Failed to delete user";
      }
    },
        async updateUser(id, userData) {
      try {
        const updatedUser = await updateUser(id, userData);
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      } catch (err) {
        console.error(err);
        this.error = "Failed to update user";
      }
    },
  },
});
