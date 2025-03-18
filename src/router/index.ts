import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/modules/auth/stores/AuthStore";
import { routeAuth } from "@/modules/auth/router/AuthRouter";
import { routeMaster } from "@/modules/master/router/MasterRouter";
import { api } from "@/api/axios";
import { routeLocation } from "@/modules/location/router/LocationRouter";
import { routeUnit } from "@/modules/unit/router/UnitRouter";
import { routeInspection } from "@/modules/inspection/router/InspectionRouter";
import { routeTransaction } from "@/modules/transaction/router/TransactionRouter";
import { routeUser } from "@/modules/user/router/UserRouter";
import { routeNotFound } from "@/modules/not-found/router/NotFoundRouter";

const routes = [
  ...routeAuth,
  ...routeLocation,
  ...routeUnit,
  ...routeInspection,
  ...routeTransaction,
  ...routeMaster,
  ...routeUser,
  ...routeNotFound,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { access_token, users } = storeToRefs(authStore);
  const token = access_token.value;

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const handleNavigation = () => {
    if (token) {
      if (to.matched.some((record) => record.meta.onlyGuest)) {
        next({ path: "/" });
      } else if (to.matched.some((record) => record.meta.requireAuth)) {
        if (users.value?.role === to.meta?.role) {
          next();
        } else {
          next({ path: "/not-found" });
        }
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.requireAuth)) {
      if (!token) {
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }
  };

  return handleNavigation();
});

export default router;
