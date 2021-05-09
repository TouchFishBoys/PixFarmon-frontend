import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {
      title: "Pixfarmon"
    }
  },
  {
    path: "/connect",
    name: "connect",
    component: () => import("@/views/Connect"),
    meta: {
      title: "Connect to wallet"
    }
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
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
  if (to.name !== "connect" && to.name !== "404") {
    console.log("Connected:", window.ethereum.isConnected());
    if (!window.ethereum || !window.ethereum.isConnected()) {
      next({ name: "connect" });
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
