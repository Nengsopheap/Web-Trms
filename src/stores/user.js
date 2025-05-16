// store/userStore.js
import { defineStore } from 'pinia';
import { fetchAllUsers } from '@/api/userApi';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  actions: {
    async loadUsers() {
      this.loading = true;
      this.error = null;
      try {
        this.users = await fetchAllUsers();
      } catch (err) {
        this.error = 'Failed to load users';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
