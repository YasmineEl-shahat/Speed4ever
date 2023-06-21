<template>
  <NavbarComponent />
  <main class="mainContainer">
    <div id="slider" class="carousel slide" data-bs-ride="carousel">
      <!-- Carousel indicators -->
      <ol class="carousel-indicators">
        <li
          v-for="(slide, index) in slider"
          :key="index"
          :data-bs-target="'#slider'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
        ></li>
      </ol>

      <!-- Carousel slides -->
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

      <!-- Carousel controls -->
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

    <!-- Categories -->
    <div class="row mt-5">
      <div
        v-for="category in categories"
        :key="category.id"
        class="col-md-4 mb-4"
      >
        <div class="card">
          <img
            :src="category.image"
            class="card-img-top"
            alt="Category Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ category.name }}</h5>
            <a :href="'/category/' + category.id" class="btn btn-primary"
              >View Products</a
            >
          </div>
        </div>
      </div>
    </div>

    <h2>احدث المزادات</h2>
    <div id="slider" class="carousel slide" data-bs-ride="carousel">
      <!-- Carousel indicators -->
      <ol class="carousel-indicators">
        <li
          v-for="(slide, index) in latest_products"
          :key="index"
          :data-bs-target="'#slider'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
        ></li>
      </ol>

      <!-- Carousel items -->
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(product, index) in latest_products"
          :key="product.id"
          :class="{ active: index === 0 }"
        >
          <div class="d-flex justify-content-around">
            <div class="card" style="width: 18rem">
              <img :src="product.main_image" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.product_price }}</p>
                <!-- Add your share icon and favourite button here -->
              </div>
            </div>
            <!-- Add more cards here if you want to show more than one card per slide -->
          </div>
        </div>
      </div>

      <!-- Carousel controls -->
      <a
        class="carousel-control-prev"
        href="#slider"
        role="button"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#slider"
        role="button"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </div>
    <a href="/all-products">عرض الكل</a>
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
    return {
      slider: [],
      categories: [],
      latest_auctions: [],
      latest_products: [],
      error: "",
    };
  },
  async created() {
    try {
      const result = await getHome();
      this.slider = result.data.data.slider;
      this.categories = result.data.data.categories;
      this.latest_auctions = result.data.data.latest_auctions;
      this.latest_products = result.data.data.latest_products;
      console.log(result.data.data);
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

.carousel-indicators li {
  background-color: #ccc;
  border: none;
  height: 12px;
  width: 12px;
  margin-right: 5px;
  margin-left: 5px;
}

.card-img-top {
  height: 35rem;
}
.card {
  border-radius: 2rem;
}
</style>
