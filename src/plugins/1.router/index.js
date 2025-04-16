import { useCookie } from "@/@core/composable/useCookie";
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupGuards } from "./guards";

function recursiveLayouts(route) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i]);

    return route;
  }

  return setupLayouts([route])[0];
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to) {},
  extendRoutes: (pages) => [
    ...[
      {
        path: "/",
        name: "index",
        redirect: (to) => {
          return { name: "productos", query: to.query };
        },
      }],
    ...[
      ...pages,
      ...[
        {
          path: "/productos-lista",
          name: "productos",
          component: () => import("@/pages/products.vue"),
        }     
    ]].map((route) => recursiveLayouts(route)),
  ],
});

setupGuards(router);
export { router };
export default function (app) {
  app.use(router);
}
