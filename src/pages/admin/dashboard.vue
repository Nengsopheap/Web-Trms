<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

    <!-- Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6 flex items-center gap-4"
      >
        <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <p class="text-xl font-bold">{{ assessments.length }}</p>
          <p class="text-gray-500">Assessments</p>
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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <p class="text-xl font-bold">{{ questions.length }}</p>
          <p class="text-gray-500">Questions</p>
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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4l3 3"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
        </div>
        <div>
          <p class="text-xl font-bold">Real-Time</p>
          <p class="text-gray-500">System Status</p>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div
      class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6"
    >
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Overview</h2>
      <div class="h-72">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { Doughnut } from "vue-chartjs";
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
  components: { Doughnut },
  setup() {
    const assessmentStore = useAssessmentStore();
    const questionStore = useQuestionStore();

    onMounted(async () => {
      await assessmentStore.loadAssessments();
      await questionStore.loadAllSubmittedAnswers();
    });

    const assessments = assessmentStore.assessments;
    const questions = questionStore.submittedAnswers;

    const chartData = computed(() => ({
      labels: ["Assessments", "Questions"],
      datasets: [
        {
          label: "Total Count",
          data: [assessments.length, questions.length],
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

    return {
      assessments,
      questions,
      chartData,
      chartOptions,
    };
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
