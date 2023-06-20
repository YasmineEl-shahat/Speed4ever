import {
  signUp,
  verifyAccount,
  sendCode,
  checkCode,
  resetPassword,
  logOut,
  login,
} from "../../api/auth";

import { defineStore } from "pinia";
import cookieCutter from "cookie-cutter";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    accessToken: cookieCutter.get("auth"),
    user_id: localStorage.getItem("user_id"),
  }),
  getters: {
    isAuthenticated: (state) => state.accessToken,
  },
  actions: {
    async signup({ username, email, phone, password }) {
      const response = await signUp({
        username,
        email,
        phone,
        password,
      });
      return response.data;
    },

    async verifyAccount({ code, phone }) {
      const response = await verifyAccount({
        code,
        phone,
        device_token: "7485996",
        type: "ios",
      });
      return response.data;
    },

    async sendCode({ phone }) {
      const response = await sendCode({ phone });
      return response.data;
    },

    async checkCode({ phone, code }) {
      const response = await checkCode({ phone, code });
      return response.data;
    },

    async resetPassword({ phone, password, code }) {
      const response = await resetPassword({
        phone,
        password,
        code,
      });
      return response.data;
    },

    async logout() {
      const response = await logOut();
      return response.data;
    },

    async login({ username, password }) {
      const response = await login({
        username,
        password,
        device_token:
          "fDx-Ei9JAqw:APA91bGXMYyQnQWVI5Fhacc30qNAfx5Ev4tYp7_8hbUQCi8h55LL4aEVbTAKZ4FMEFq79OCykOrcauufdo7DLtiE-Mqi8_jWlZDCHBEQZ41QIJXa0mFPVWQmttgWKn6TnWpJg71X_zcW",
        type: "android",
      });

      return response.data;
    },
  },
});
