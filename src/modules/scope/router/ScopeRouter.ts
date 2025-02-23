import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ScopeLayout from "@/layouts/ScopeLayout.vue";

export const routeScope = [
  {
    path: "/:id/create/unit/:id_unit",
    name: "scope",
    component: () => import("@/modules/scope/views/Scope.vue"),
    meta: { layout: ScopeLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/add-scope",
    name: "combustion inspection add scope",
    component: () => import("@/modules/scope/views/CIAddScope.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/add-scope/:section",
    name: "combustion inspection add scope section",
    component: () => import("@/modules/scope/views/CIAddScopeSection.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/add-scope/:section/result",
    name: "combustion inspection add scope section result",
    component: () =>
      import("@/modules/scope/views/CIAddScopeSectionResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:id_unit/result",
    name: "combustion inspection result",
    component: () => import("@/modules/scope/views/CIResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  // {
  //   path: "/:id/create/unit/:id_unit/ci/squences",
  //   name: "combustion inspection",
  //   component: () => import("@/modules/scope/views/CI.vue"),
  //   meta: { layout: DefaultLayout, requireAuth: true },
  // },
  // {
  //   path: "/:id/create/unit/:id_unit/mi/squences",
  //   name: "major inspection",
  //   component: () => import("@/modules/scope/views/MI.vue"),
  //   meta: { layout: DefaultLayout, requireAuth: true },
  // },
  // {
  //   path: "/:id/create/unit/:id_unit/ti/squences",
  //   name: "turbine inspection",
  //   component: () => import("@/modules/scope/views/TI.vue"),
  //   meta: { layout: DefaultLayout, requireAuth: true },
  // },
];
