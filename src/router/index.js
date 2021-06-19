import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "pixfarm-main" */ "@/views/Main.vue"),
    meta: {
      title: "Pixfarmon"
    }
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "@/views/NotFound.vue"),
    meta: {
      title: "404"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // if (to.name !== "connect" && to.name !== "404") {
  //   console.log("Connected:", window.ethereum.isConnected());
  //   if (!window.ethereum || !window.ethereum.isConnected()) {
  //     next({ name: "connect" });
  //   }
  // }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
