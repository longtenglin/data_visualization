import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "index",
    component: () => import("../views/layout/layout")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/layout/layout")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test")
  },
];

const router = new VueRouter({
  routes
});

export default router;
