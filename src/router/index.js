import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-page",
      component: () => import("../pages/HomePage.vue"),
    },
    {
      path: "/convert",
      name: "convert-page",
      component: () => import("../pages/ConvertPage.vue"),
    },
  ],
});

export default router;
