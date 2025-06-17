<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center text-gray-500 py-20">
      កំពុងផ្ទុកទិន្នន័យ...
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6 flex items-center gap-4"
        >
          <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
            <HelpCircle class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xl font-bold">{{ assessments.length }}</p>
            <p class="text-gray-500">{{$t("title.Assessment")}}</p>
          </div>
        </div>

        <div
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6 flex items-center gap-4"
        >
          <div class="bg-green-100 text-green-600 p-3 rounded-full">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p class="text-xl font-bold">{{ questions.length }}</p>
            <p class="text-gray-500">{{$t("title.Questions")}}</p>
          </div>
        </div>

        <div
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6 flex items-center gap-4"
        >
          <div class="bg-yellow-100 text-yellow-600 p-3 rounded-full">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
          </div>
          <div>
            <p class="text-xl font-bold">Real-Time</p>
            <p class="text-gray-500">System Status</p>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">Overview</h2>
        <div class="h-72">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { Doughnut } from "vue-chartjs";
import { HelpCircle } from "lucide-vue-next";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useAssessmentStore } from "../../stores/assessment";
import { useQuestionStore } from "../../stores/question";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    Doughnut,
    HelpCircle,
  },
  setup() {
    const isLoading = ref(true);

    const assessmentStore = useAssessmentStore();
    const questionStore = useQuestionStore();

    const assessments = computed(() => assessmentStore.assessments);
    const questions = computed(() => questionStore.submittedAnswers);

    const chartData = computed(() => ({
      labels: ["Assessments", "Questions"],
      datasets: [
        {
          label: "Total Count",
          data: [assessments.value.length, questions.value.length],
          backgroundColor: ["#3B82F6", "#10B981"],
          hoverBackgroundColor: ["#2563EB", "#059669"],
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#374151",
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          backgroundColor: "#111827",
          titleColor: "#ffffff",
          bodyColor: "#D1D5DB",
        },
      },
    };

    onMounted(async () => {
      await Promise.all([
        assessmentStore.loadAssessments(),
        questionStore.loadAllSubmittedAnswers(),
      ]);
      isLoading.value = false;
    });

    return {
      isLoading,
      assessments,
      questions,
      chartData,
      chartOptions,
    };
  },
};
</script>
