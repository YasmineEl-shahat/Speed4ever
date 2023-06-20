<template>
  <div class="form--container">
    <section class="form--content">
      <img alt="logo" src="../../assets/logo.svg" />
      <h1>إعادة تعيين كلمة المرور</h1>
      <form @submit.prevent="submitForm">
        <div class="field">
          <input
            type="text"
            id="phone"
            v-model="phone"
            required
            class="text--global"
          />
          <label for="phone" class="label--global">رقم الجوال:</label>
        </div>
        <div class="field">
          <input
            type="text"
            id="code"
            v-model="code"
            required
            class="text--global"
          />
          <label for="code" class="label--global">رمز التحقق:</label>
        </div>
        <div class="field">
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="text--global"
          />
          <label for="password" class="label--global"
            >كلمة المرور الجديدة:</label
          >
        </div>
        <button type="submit" class="btn--global">إرسال</button>
        <p class="invalid">{{ this.error }}</p>
      </form>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "ResetPassword",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submitForm() {
      const authStore = useAuthStore();
      try {
        const result = await authStore.resetPassword({
          phone: this.phone,
          code: this.code,
          password: this.password,
        });
        console.log(result);

        // Redirect to Login component after successful resetPassword API call
        this.$router.push({ name: "Login" });
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>
