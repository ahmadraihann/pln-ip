import MainLayout from "@/layouts/MainLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export const routeMain = [
  {
    path: "/:id/create/unit/:scope/:menu/scope",
    name: "main scope",
    component: () => import("@/modules/main/views/Scope.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/work-instruction",
    name: "main work instruction",
    component: () => import("@/modules/main/views/WorkInstruction.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/consumable-material",
    name: "main consumable material",
    component: () => import("@/modules/main/views/ConsumableMaterial.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/manpower",
    name: "main manpower",
    component: () => import("@/modules/main/views/Manpower.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/part",
    name: "main part",
    component: () => import("@/modules/main/views/Part.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/hse",
    name: "main hse",
    component: () => import("@/modules/main/views/Hse.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/qc-plan",
    name: "main qc plan",
    component: () => import("@/modules/main/views/QcPlan.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/squences",
    name: "main squences",
    component: () => import("@/modules/scope/views/Sequence.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/add-scope-table",
    name: "main add scope table",
    component: () => import("@/modules/main/views/AddScopeTable.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/add-scope-squences",
    name: "main add scope squences",
    component: () => import("@/modules/main/views/AddScopeSquences.vue"),
    meta: { layout: MainLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/add-scope-squences/:section",
    name: "main add scope squences section",
    component: () => import("@/modules/scope/views/CIAddScopeSection.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/add-scope-squences/:section/result",
    name: "main add scope squences section result",
    component: () =>
      import("@/modules/scope/views/CIAddScopeSectionResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
  {
    path: "/:id/create/unit/:scope/:menu/add-scope-squences/:section/result/finish",
    name: "main add scope squences section result finish",
    component: () => import("@/modules/scope/views/CIResult.vue"),
    meta: { layout: DefaultLayout, requireAuth: true },
  },
];
