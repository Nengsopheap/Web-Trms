import { defineStore } from 'pinia';
import { getToptips } from '../apis/toptip'; // Correct import path

export const useToptipStore = defineStore('toptip', {
  state: () => ({
    toptips: [], // State to store the list of toptips
  }),
  actions: {
    // Fetch toptips from the API and store them in the state
    async fetchToptips() {
      try {
        const toptips = await getToptips(); // Call the API to get toptips
        this.toptips = toptips; // Store the fetched toptips in the state
      } catch (error) {
        console.error('Error fetching toptips:', error);
      }
    },
  },
  getters: {
    allToptips: (state) => state.toptips, // Getter to retrieve all toptips
  },
});
