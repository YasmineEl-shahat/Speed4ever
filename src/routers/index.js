import { createRouter, createWebHistory } from "vue-router";

import App from "../App.vue";
import UnderConstructionComponent from "../components/Views/UnderConstructionComponent.vue";
import SignUp from "../components/Views/SignUp.vue";
import VerifyAccount from "../components/Views/VerifyAccount.vue";
import ForgetPassword from "../components/Views/ForgetPassword.vue";
import ResetPassword from "../components/Views/ResetPassword.vue";
import LoginComponent from "../components/Views/Login.vue";

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
    name: "Home",
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
    path: "/login",
    name: "Login",
    component: LoginComponent,
    beforeEnter: guestGuard,
  },
  {
    path: "/verify-account",
    name: "VerifyAccount",
    component: VerifyAccount,
    props: (route) => ({ phone: route.params.phone }),
    beforeEnter: guestGuard,
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: ForgetPassword,
    beforeEnter: guestGuard,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
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
