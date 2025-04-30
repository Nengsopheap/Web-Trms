import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Homepage/Home.vue";
import Question from "../pages/assessment/question.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/question/:assessmentId",  // Use :assessmentId to define the dynamic route
    name: "question",
    component: Question,
    props: true,  // Pass the assessmentId as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
