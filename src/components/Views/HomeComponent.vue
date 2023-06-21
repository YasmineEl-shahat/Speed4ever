<template>
  <NavbarComponent />
  <main class="mainContainer">
    <div id="slider" class="carousel slide" data-bs-ride="carousel">
      <ol class="carousel-indicators">
        <li
          v-for="(slide, index) in slider"
          :key="index"
          :data-bs-target="'#slider'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
        ></li>
      </ol>
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slider"
          :key="slide.id"
          :class="{ active: index === 0 }"
          class="carousel-item"
        >
          <a :href="slide.link" target="_blank">
            <img :src="slide.image" class="d-block w-100" alt="Slide Image" />
            <div class="carousel-caption d-none d-md-block">
              <h5>{{ slide.name }}</h5>
            </div>
          </a>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#slider"
        role="button"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#slider"
        role="button"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </main>
  <FooterComponent />
</template>

<script>
import NavbarComponent from "../NavbarComponent.vue";
import FooterComponent from "../FooterComponent.vue";
import { getHome } from "../../../api/home";

export default {
  name: "HomeComponent",
  components: { NavbarComponent, FooterComponent },
  data() {
    return { slider: [], error: "" };
  },
  async created() {
    try {
      const result = await getHome();
      console.log(result.data.data);
      this.slider = result.data.data.slider;
    } catch (error) {
      this.error = error.response.data.message;
    }
  },
  methods: {},
};
</script>

<style>
.carousel-inner {
  max-height: 50vh;
}
</style>
