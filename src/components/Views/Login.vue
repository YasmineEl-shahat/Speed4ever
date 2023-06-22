<template>
  <div class="form--container">
    <section class="form--content">
      <img alt="logo" src="../../assets/logo.svg" />
      <h1>تسجيل الدخول</h1>
      <form @submit.prevent="submitForm">
        <div class="field">
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="text--global"
          />
          <label for="username" class="label--global">اسم المستخدم:</label>
        </div>
        <div class="field">
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="text--global"
          />
          <label for="password" class="label--global">كلمة المرور:</label>
        </div>
        <div class="invalid">
          <router-link to="/forget-password">هل نسيت كلمة المرور؟</router-link>
        </div>
        <br />
        <button type="submit" class="btn--global">تسجيل الدخول</button>
        <p class="invalid">{{ this.error }}</p>
      </form>
      <div class="create--account--container">
        <span class="create--account--message">ليس لديك حساب؟</span>
        <router-link to="/signup" class="btn--light"
          >أنشئ حسابًا جديدًا</router-link
        >
      </div>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import cookieCutter from "cookie-cutter";

export default {
  name: "LoginComponent",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submitForm() {
      const authStore = useAuthStore();
      try {
        const result = await authStore.login({
          username: this.username,
          password: this.password,
        });

        cookieCutter.set("auth", result.data.token);
        localStorage.setItem("user_id", result.data.id);
        localStorage.setItem("username", result.data.username);

        // Redirect to home page after successful login

        // this.$router.push({ name: "Home" });
        window.location.assign("/");
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>
