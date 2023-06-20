<template>
  <div class="form--container">
    <section class="form--content">
      <img alt="logo" src="../../assets/logo.svg" />
      <h1>تفعيل الحساب</h1>
      <h2>تم إرسال كود التفعيل إلى رقم هاتفك: {{ phone }}</h2>
      <form @submit.prevent="submitForm">
        <div class="field">
          <input
            type="text"
            id="verification-code"
            v-model.lazy="verificationCode"
            required
            class="text--global"
          />
          <label for="verification-code" class="label--global"
            >أدخل كود التفعيل:</label
          >
        </div>
        <p>{{ message }}</p>
        <button class="btn--light" @click="resendCode" :disabled="resending">
          {{ resending ? "جاري إعادة الإرسال..." : "إعادة إرسال الكود" }}
        </button>
        <button type="submit" class="btn--global">تفعيل الحساب</button>
      </form>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "VerifyAccount",

  data() {
    return {
      phone: this.$route.params.phone,
      verificationCode: "",
      message: "",
      resending: false,
    };
  },
  methods: {
    async submitForm() {
      const authStore = useAuthStore();
      try {
        const result = await authStore.checkCode({
          phone: this.phone,
          code: this.verificationCode,
        });
        const verify = await authStore.verifyAccount({
          phone: this.phone,
          code: this.verificationCode,
        });
        console.log(result, verify);

        this.message = "تم تفعيل الحساب بنجاح";

        this.$router.push({
          name: "Login",
        });
      } catch (error) {
        console.error(error);
        this.message = "حدث خطأ أثناء تفعيل الحساب";
        // Handle error
      }
    },
    async resendCode() {
      const authStore = useAuthStore();
      try {
        this.resending = true;
        await authStore.sendCode({ phone: this.phone });
        this.message = "تم إعادة إرسال الكود";
      } catch (error) {
        console.error(error);
        this.message = "حدث خطأ أثناء إعادة إرسال الكود";
        // Handle error
      } finally {
        this.resending = false;
      }
    },
  },
};
</script>
