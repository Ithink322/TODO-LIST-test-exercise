import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "../components/pages/MainPage.vue";
import EditTaskPage from "../components/pages/EditTaskPage.vue";
import CreateTaskPage from "../components/pages/CreateTaskPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/EditTaskPage/:id",
    component: EditTaskPage,
  },
  {
    path: "/CreateTaskPage",
    component: CreateTaskPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
