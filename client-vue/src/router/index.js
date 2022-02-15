import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import("../views/Auth/Register.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((item) => item.meta.requiresAuth);

  if (authRequired && store.state.token === null) {
    next("/");
  } else {
    next();
  }
});

export default router;
