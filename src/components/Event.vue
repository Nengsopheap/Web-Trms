<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center overflow-hidden"
  >
    <div
      class="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center px-4 md:px-12 relative"
    >
      <!-- Text Section -->
      <div
        class="text-center md:text-left mb-10 md:mb-0 md:w-1/2 relative z-10"
      >
        <transition name="text-fancy" mode="out-in">
          <h1
            :key="items[currentIndex].title"
            class="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            {{ items[currentIndex].title }}
          </h1>
        </transition>

        <transition name="text-fancy" mode="out-in">
          <p
            :key="items[currentIndex].description"
            class="text-gray-700 text-lg leading-relaxed"
          >
            {{ items[currentIndex].description }}
          </p>
        </transition>
      </div>

      <!-- Image Section -->
      <div class="md:w-1/2 w-full relative">
        <transition name="image-fancy" mode="out-in">
          <img
            :key="items[currentIndex].image"
            :src="items[currentIndex].image"
            alt="Slide"
            class="w-full h-[300px] md:h-[400px] object-cover"
          />
        </transition>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex justify-center gap-4 mt-16 z-10">
      <button
        class="bg-indigo-800 hover:bg-indigo-600 text-white rounded-md shadow-md"
        style="width: 40px; height: 40px"
        @click="prev"
      >
        <span class="text-2xl">&larr;</span>
      </button>
      <button
        class="bg-yellow-500 hover:bg-yellow-400 text-white rounded-md shadow-md"
        style="width: 40px; height: 40px"
        @click="next"
      >
        <span class="text-2xl">&rarr;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import aiImg from "../assets/image/AI.png";
import cyberImg from "../assets/image/cyber2.jpg";

const items = [
  {
    title: "សន្តិសុខសាយបឺរ",
    description:
      "សន្តិសុខសាយបឺរគឺជាការអនុវត្តន៍ក្នុងការការពារប្រព័ន្ធ បណ្តាញ និងទិន្នន័យពីការគំរាមកំហែងតាមអ៊ីនធឺណិត។ វាជាផ្នែកសំខាន់ក្នុងការអភិរក្សសុវត្ថិភាពព័ត៌មាន។",
    image: cyberImg,
  },
  {
    title: "បញ្ញាសិប្បនិម្មិត (AI)",
    description:
      "បញ្ញាសិប្បនិម្មិត គឺជាបច្ចេកវិទ្យាដែលអាចអោយម៉ាស៊ីនសម្រេចចិត្ត ដូចមនុស្ស។ វាត្រូវបានប្រើនៅក្នុងការបញ្ជូនដំណឹង ឧបករណ៍ឆ្លាតវៃ និងការព្យាករណ៍។",
    image: aiImg,
  },
];

const currentIndex = ref(0);
let intervalId = null;

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % items.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + items.length) % items.length;
};

onMounted(() => {
  intervalId = setInterval(next, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Text fancy animation */
.text-fancy-enter-active,
.text-fancy-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.text-fancy-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.text-fancy-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

/* Image fancy animation */
.image-fancy-enter-active,
.image-fancy-leave-active {
  transition: all 0.7s ease-in-out;
}
.image-fancy-enter-from {
  opacity: 0;
  transform: scale(0.95) translateX(50px);
}
.image-fancy-leave-to {
  opacity: 0;
  transform: scale(1.05) translateX(-50px);
}
</style>
