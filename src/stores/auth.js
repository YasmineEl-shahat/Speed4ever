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
  }),
  getters: {
    isAuthenticated: (state) => state.accessToken,
  },
  actions: {
    async signup({ username, email, password }) {
      const response = await signUp({
        username,
        email,
        password,
      });
      return response.data;
    },

    async verifyAccount({ code, phone }) {
      const response = await verifyAccount({ code, phone });
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
      const response = await login({ username, password });
      return response.data;
    },
  },
});
