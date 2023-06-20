<template>
  <div class="form--container">
    <section class="form--content">
      <img alt="logo" src="../../assets/logo.svg" />
      <h1>نسيت كلمة المرور</h1>
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
        <button type="submit" class="btn--global">إرسال رمز التحقق</button>
        <p class="invalid">{{ this.error }}</p>
      </form>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "ForgotPassword",
  data() {
    return {
      phone: "",
      error: "",
    };
  },
  methods: {
    async submitForm() {
      const authStore = useAuthStore();
      try {
        const result = await authStore.sendCode({ phone: this.phone });
        console.log(result);

        // Redirect to reset password page after successful sendCode API call
        this.$router.push({
          name: "ResetPassword",
        });
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>
