<template>
  <div class="form--container">
    <section class="form--content">
      <img alt="logo" src="../../assets/logo.svg" />
      <h1>أهلا بك</h1>
      <h2>من فضلك أدخل البيانات التالية لإنشاء حساب جديد</h2>
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
            id="email"
            v-model.lazy="email"
            required
            class="text--global"
          />
          <label for="email" class="label--global">البريد الإلكتروني:</label>
          <p v-if="email.$dirty && !isEmailValid" style="color: red">
            البريد الإلكتروني غير صحيح
          </p>
        </div>
        <div class="field">
          <input
            type="tel"
            id="phone"
            v-model.lazy="phone"
            required
            class="text--global"
          />
          <label for="phone" class="label--global">رقم الهاتف:</label>
          <p v-if="phone.$dirty && !isPhoneValid" style="color: red">
            رقم الهاتف غير صحيح
          </p>
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
        <div class="field">
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            required
            class="text--global"
          />
          <label for="confirm-password" class="label--global"
            >تأكيد كلمة المرور:</label
          >
          <p v-if="!isPasswordConfirmed" style="color: red">
            كلمة المرور غير متطابقة
          </p>
        </div>
        <button type="submit" class="btn--global">إنشاء حساب</button>
      </form>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    isPasswordConfirmed() {
      return this.password === this.confirmPassword;
    },
    isEmailValid() {
      const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      return emailRegex.test(this.email);
    },
    isPhoneValid() {
      const phoneRegex = /[0-9]{10}/;
      return phoneRegex.test(this.phone);
    },
  },
  methods: {
    async submitForm() {
      if (
        !this.isEmailValid ||
        !this.isPhoneValid ||
        !this.isPasswordConfirmed
      ) {
        return;
      }

      const authStore = useAuthStore();
      try {
        const result = await authStore.signup({
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
        console.log(result);
        // Redirect to success page
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
  },
};
</script>
