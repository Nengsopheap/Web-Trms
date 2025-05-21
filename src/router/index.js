import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Homepage/Home.vue";
import Question from "../pages/assessment/question.vue";
import assessmentresult from "../pages/assessment/assessmentresult.vue";
import Login from "../pages/login/Login.vue";
import Dashboard from "../pages/admin/dashboard.vue";
import Assessment from "../pages/admin/assessment.vue";
import Adminpanel from "../pages/admin/adminpanel.vue";
import adminQuestion from "../pages/admin/question.vue";
import LearnTipsByToptip from "../pages/learntip/learntip.vue";
import Faq from "../pages/FAQ/Faq.vue";
import Contact from "../pages/Contact/Contact.vue";
import Link from "../pages/FAQ/link.vue";
import Law from "../pages/law/law.vue";
import Regulation from "../pages/law/regulation.vue";
import News from "../pages/resources/news.vue";
import Report from "../pages/resources/report.vue";
import Event from "../pages/resources/event.vue";
import Takerisk from "../pages/aboutTRM/Takerisk.vue";
import Takecare from "../pages/aboutTRM/takecare.vue";
import TRM from "../pages/aboutTRM/TRM.vue";
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
  {
    path: "/toptip/:id/learntips",
    name: "learntipsByToptip",
    component: LearnTipsByToptip,
  },
  {
    path: "/faq-and-term",
    name: "FAQ",
    component: Faq,
  },
  {
    path: "/faq-and-term/Contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/faq-and-term/link",
    name: "link",
    component: Link,
  },
  {
    path: "/laws",
    name: "laws",
    component: Law,
  },
  {
    path: "/laws/regulation",
    name: "regulation",
    component: Regulation,
  },
  {
    path: "/resources/new",
    name: "resources",
    component: News,
  },
  {
    path: "/resources/reports",
    name: "report",
    component: Report,
  },
  {
    path: "/resources/event",
    name: "event",
    component: Event,
  },
  {
    path: "/about/takeRisk",
    name: "takerisk",
    component: Takerisk,
  },
  {
    path: "/about/takecare",
    name: "takecare",
    component: Takecare,
  },
  {
    path: "/about/TMR",
    name: "TMR",
    component: TRM,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
