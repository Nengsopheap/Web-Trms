<template>
  <div class="p-3">
    <h1 class="text-2xl font-bold mb-6 font-kantumruy">
      {{ $t("title.admin_dashboard") }}
    </h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center text-gray-500 py-20">
      កំពុងផ្ទុកទិន្នន័យ...
    </div>

    <div v-else>
      <!-- Top Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Assessment Count -->
        <div
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6 flex items-center gap-4"
        >
          <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
            <HelpCircle class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xl font-bold">{{ assessments.length }}</p>
            <p class="text-gray-500">{{ $t("title.Assessment") }}</p>
          </div>
        </div>

        <!-- Question Count -->
        <div
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6 flex items-center gap-4"
        >
          <div class="bg-green-100 text-green-600 p-3 rounded-full">
            <CircleCheckBig />
          </div>
          <div>
            <p class="text-xl font-bold">{{ questions.length }}</p>
            <p class="text-gray-500">{{ $t("title.Questions") }}</p>
          </div>
        </div>

        <!-- System Status -->
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
            <p class="text-xl font-bold">Real‑Time</p>
            <p class="text-gray-500">System Status</p>
          </div>
        </div>
      </div>
      <!-- Quiz Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in quizSummary"
          :key="item.assessmentId"
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] p-6 rounded-lg"
        >
          <h3 class="text-lg font-semibold text-[#111827] mb-2">
            {{ item.assessmentName }}
          </h3>
          <p class="text-gray-700 text-sm">
            Total Attempts:
            <span class="font-bold">{{ item.totalQuizzes }}</span>
          </p>
          <p class="text-green-600 text-sm">
            Correct Option
            <span class="font-bold">{{ item.totalCorrect }}</span>
          </p>
          <p class="text-red-600 text-sm">
            Wrong Answers: <span class="font-bold">{{ item.totalWrong }}</span>
          </p>
          <!-- Percentage Progress Bar -->
          <div class="mt-2">
            <p class="text-sm text-gray-600 mb-1">Score</p>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                class="h-3 rounded-full transition-all duration-1000 ease-out"
                :class="{
                  'bg-green-500': animatedWidths[item.assessmentId] >= 80,
                  'bg-yellow-400':
                    animatedWidths[item.assessmentId] >= 50 &&
                    animatedWidths[item.assessmentId] < 80,
                  'bg-red-500': animatedWidths[item.assessmentId] < 50,
                }"
                :style="{ width: animatedWidths[item.assessmentId] + '%' }"
              ></div>
            </div>
            <p class="text-sm text-gray-600 mt-1">
              {{ animatedWidths[item.assessmentId]?.toFixed(2) || 0 }}%
            </p>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
        <!-- Questions per Assessment Line Chart -->
        <div
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-700">
            Questions per Assessment
          </h2>
          <div class="h-72">
            <Line :data="lineChartData" :options="lineChartOptions" />
          </div>
        </div>

        <!-- Overview Doughnut Chart -->
        <div
          class="bg-white shadow-[0_4px_12px_rgba(76,56,187,0.25)] rounded-lg p-6"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-700">Overview</h2>
          <div class="h-72">
            <Doughnut :data="doughnutChartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Doughnut, Line } from "vue-chartjs";
import { HelpCircle, CircleCheckBig } from "lucide-vue-next";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

import axios from "axios";
import { useAssessmentStore } from "../../stores/assessment";
import { useQuestionStore } from "../../stores/question";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const assessmentStore = useAssessmentStore();
const questionStore = useQuestionStore();

const isLoading = ref(true);
const attempts = ref([]);

const assessments = computed(() => assessmentStore.assessments);
const questions = computed(() => questionStore.submittedAnswers);

// Fetch quiz attempts
const fetchQuizAttempts = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/questions/quiz-attempts"
    );
    attempts.value = data;
  } catch (err) {
    console.error("Failed to load quiz attempts", err);
  }
};

// Summary computed property
const quizSummary = computed(() => {
  const groups = {};

  attempts.value.forEach((a) => {
    const id = a.assessment?.id || "unknown";
    const name = a.assessment?.name || `Assessment ${id}`;
    if (!groups[id]) {
      groups[id] = {
        assessmentId: id,
        assessmentName: name,
        totalQuizzes: 0,
        totalCorrect: 0,
        totalWrong: 0,
      };
    }
    groups[id].totalQuizzes++;
    groups[id].totalCorrect += a.correct_answers;
    groups[id].totalWrong += a.wrong_answers;
  });

  return Object.values(groups).map((g) => {
    const total = g.totalCorrect + g.totalWrong;
    return {
      ...g,
      percentage: total ? (g.totalCorrect / total) * 100 : 0,
    };
  });
});

// Charts data
const doughnutChartData = computed(() => ({
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

const questionCountsByAssessment = computed(() => {
  const map = {};
  assessments.value.forEach((a) => {
    map[a.id] = a.title || a.name || `Assessment ${a.id}`;
  });
  const counts = {};
  questions.value.forEach((q) => {
    const id = q.assessment_id || q.assessment?.id;
    if (!counts[id]) counts[id] = 0;
    counts[id]++;
  });
  const labels = [],
    data = [];
  Object.keys(counts)
    .sort()
    .forEach((id) => {
      labels.push(map[id] || `Assessment ${id}`);
      data.push(counts[id]);
    });
  return { labels, data };
});

const lineChartData = computed(() => ({
  labels: questionCountsByAssessment.value.labels,
  datasets: [
    {
      label: "Questions",
      data: questionCountsByAssessment.value.data,
      fill: false,
      borderColor: "#6366F1",
      backgroundColor: "#6366F1",
      tension: 0.3,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: { color: "#374151", font: { size: 14 } },
    },
    tooltip: {
      backgroundColor: "#111827",
      titleColor: "#ffffff",
      bodyColor: "#D1D5DB",
    },
  },
};

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1, color: "#4B5563" },
      title: { display: true, text: "Number of Questions", color: "#6B7280" },
    },
    x: { ticks: { color: "#4B5563" } },
  },
  plugins: {
    legend: {
      position: "top",
      labels: { color: "#374151", font: { size: 14 } },
    },
  },
};

// Reactive map for animated progress widths
const animatedWidths = ref({});

onMounted(async () => {
  await Promise.all([
    assessmentStore.loadAssessments(),
    questionStore.loadAllSubmittedAnswers(),
    fetchQuizAttempts(),
  ]);

  // Initialize widths to 0
  quizSummary.value.forEach((item) => {
    animatedWidths.value[item.assessmentId] = 0;
  });

  // Animate widths to actual percentages with a slight delay
  setTimeout(() => {
    quizSummary.value.forEach((item) => {
      animatedWidths.value[item.assessmentId] = item.percentage;
    });
  }, 200);
  isLoading.value = false;
});
</script>
