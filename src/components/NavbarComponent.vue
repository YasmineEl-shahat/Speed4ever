<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="mainContainer">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">إضافة إعلان</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">اتصل بنا</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">الباقات</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">العروض</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">من نحن</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active">الرئيسية</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ username }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a class="dropdown-item" href="#" @click="logoutUser"
                  >تسجيل الخروج</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import Popper from "popper.js";
window.Popper = Popper;
import "bootstrap/dist/js/bootstrap.js";

import cookieCutter from "cookie-cutter";
import { useAuthStore } from "../stores/auth";

import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "NavbarComponent",
  data() {
    return {
      username: useAuthStore().username,
    };
  },

  methods: {
    logoutUser() {
      // Remove auth cookie
      cookieCutter.set("auth", "", {
        expires: new Date(1970, 0, 1),
      });

      // Remove user_id from localStorage
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      // Redirect the user to the login page or perform any other necessary actions
      window.location.assign("/login");
    },
  },
};
</script>
