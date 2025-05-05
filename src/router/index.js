import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Homepage/Home.vue";
import Question from "../pages/assessment/question.vue";
import assessmentresult from "../pages/assessment/assessmentresult.vue";
import Login from "../pages/login/Login.vue";
import Dashboard from "../pages/admin/dashboard.vue";
import Assessment from "../pages/admin/assessment.vue";
import Adminpanel from "../pages/admin/adminpanel.vue";
import adminQuestion from "../pages/admin/question.vue";

const routes = [
  // for admin
  { path: "/", name: "login", component: Login },
  // Admin routes under layout
  {
    path: "/admin",
    component: Adminpanel,
    children: [
      { path: "dashboard", name: "dashboard", component: Dashboard },
      { path: "assessment", name: "assessment", component: Assessment },
      { path: "question", name: "adminquestion", component: adminQuestion },
    ],
  },
  // for user
  { path: "/Home", name: "Home", component: Home },
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
