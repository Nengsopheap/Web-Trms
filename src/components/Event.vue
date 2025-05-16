<template>
  <div>
    <div class="flex items-center justify-center mt-10">
      <div
        class="rounded-lg flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
      >
        <!-- Left Section -->
        <div class="text-center md:text-left" style="width: 500px">
          <h1 class="text-3xl md:text-4xl font-bold mb-4 text-center">
            {{ items[currentIndex].title }}
          </h1>
          <p class="text-gray-600 mb-6 text-center">
            {{ items[currentIndex].description }}
          </p>
        </div>

        <!-- Right Section (Image) -->
        <div class="flex-2">
          <img
            :src="items[currentIndex].image"
            alt="Cybersecurity"
            style="width: 500px"
          />
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div v-if="items.length > 1" class="flex justify-center gap-4 mt-10">
      <button
        class="bg-indigo-800 hover:bg-indigo-600 text-white rounded"
        style="width: 40px; height: 40px"
        @click="prev"
        :disabled="currentIndex === 0"
      >
        <span class="text-2xl">&larr;</span>
      </button>
      <button
        class="bg-yellow-500 hover:bg-yellow-300 text-white rounded"
        style="width: 40px; height: 40px"
        @click="next"
        :disabled="currentIndex === items.length - 1"
      >
        <span class="text-2xl">&rarr;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import fsaLogo from "../assets/image/FSA_Logo.png";
const items = ref([
  {
    title: "Cybersecurity Hub",
    description:
      "Stay ahead of cyber threats with real-time insights and best practices. Learn how to protect your digital assets and secure your online presence.",
    image: fsaLogo,
  },
  {
    title: "Phishing Awareness",
    description:
      "Learn to identify phishing attacks and protect your organization from fraudulent messages and links.",
    image: fsaLogo,
  },
]);

const currentIndex = ref(0);

function next() {
  if (currentIndex.value < items.value.length - 1) {
    currentIndex.value++;
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}
</script>

<style scoped>
/* Optional styles */
</style>
