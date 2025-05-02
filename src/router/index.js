import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Homepage/Home.vue";
import Question from "../pages/assessment/question.vue";
import assessmentresult from "../pages/assessment/assessmentresult.vue";
import Login from "../pages/login/Login.vue";
import Dashboard from "../pages/admin/dashboard.vue";

const routes = [
  { path: "/Home", name: "Home", component: Home },
  { path: "/", name: "login", component: Login },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  {
    path: "/question/:assessmentId",
    name: "question",
    component: Question,
    props: true,
  },
  {
    path: "/quiz-result",
    name: "assessmentresult",
    component: assessmentresult,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
