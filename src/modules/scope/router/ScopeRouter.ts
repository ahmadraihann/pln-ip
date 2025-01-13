import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ScopeLayout from "@/layouts/ScopeLayout.vue";

export const routeScope = [
  {
    path: "/:id/create/unit/:scope",
    name: "scope",
    component: () => import("@/modules/scope/views/Scope.vue"),
    meta: { layout: ScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/ci/squences",
    name: "combustion inspection",
    component: () => import("@/modules/scope/views/CI.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/add-scope",
    name: "combustion inspection add scope",
    component: () => import("@/modules/scope/views/CIAddScope.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/add-scope/:section",
    name: "combustion inspection add scope section",
    component: () => import("@/modules/scope/views/CIAddScopeSection.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/add-scope/:section/result",
    name: "combustion inspection add scope section result",
    component: () =>
      import("@/modules/scope/views/CIAddScopeSectionResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/result",
    name: "combustion inspection result",
    component: () => import("@/modules/scope/views/CIResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/mi/squences",
    name: "major inspection",
    component: () => import("@/modules/scope/views/MI.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
