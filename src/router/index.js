import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/booking/:id",
    name: "Booking",
    component: () =>
      import(/* webpackChunkName: "Booking" */ "../views/BookingSeat.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/*webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
