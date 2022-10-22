import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorite-pokemons",
    name: "Favorites",
    component: () => import("../views/FavoritePokemons.vue"),
  },
//   {
//     path: "/:catchAll(.*)",
//     name: "PageNotFound",
//     component: () => import("../views/PageNotFound.vue"),
//   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
