import { createRouter, createWebHistory } from "vue-router";

import App from "../App.vue";
import UnderConstructionComponent from "../components/Views/UnderConstructionComponent.vue";
import SignUp from "../components/Views/SignUp.vue";
import { useAuthStore } from "@/stores/auth";

const authGuard = () => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return "/login";
  }
};

const guestGuard = () => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    return "/";
  }
};

//  create object for routes :
const routes = [
  {
    path: "/",
    component: App,
    beforeEnter: authGuard,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter: guestGuard,
  },
  {
    path: "/:catchAll(.*)/",
    component: UnderConstructionComponent,
    beforeEnter: authGuard,
  },
];

// create router object
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
