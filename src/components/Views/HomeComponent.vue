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

    <!-- Latest Auctions -->
    <div class="slider-container">
      <h3 v-if="latest_auctions.length > 0" class="slider-title">
        احدث المزادات
      </h3>
      <div class="card-slider" ref="auctionSlider">
        <div class="card" v-for="auction in latest_auctions" :key="auction.id">
          <img :src="auction.image" class="card-img-top" alt="Auction Image" />
          <div class="card-body">
            <h5 class="card-title">{{ auction.name }}</h5>
            <div class="price-share-container">
              <p class="price">{{ auction.price }}</p>
              <i class="fas fa-share"></i>
              <button class="btn-favorite">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <a v-if="latest_auctions.length > 0" href="#" class="view-all-link"
        >عرض الكل</a
      >
    </div>

    <!-- Latest Products -->
    <div class="slider-container">
      <h3 class="slider-title">احدث المنتجات</h3>
      <div class="card-slider" ref="productSlider">
        <div class="card" v-for="product in latest_products" :key="product.id">
          <img
            :src="product.main_image"
            class="card-img-top"
            alt="Product Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="price-share-container">
              <p class="price">{{ product.product_price }}</p>
              <i class="fas fa-share"></i>
              <button class="btn-favorite">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="view-all-link">عرض الكل</a>
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
      this.initializeSlider("auctionSlider"); // Initialize the auction slider
      this.initializeSlider("productSlider"); // Initialize the product slider
    } catch (error) {
      this.error = error.response.data.message;
    }
  },

  methods: {
    initializeSlider(refName) {
      const slider = this.$refs[refName]; // Get the slider element using the provided refName
      if (!slider) return; // Return if the slider element is null

      let isDragging = false;
      let startPosition = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;

      slider.addEventListener("mousedown", startDragging);
      slider.addEventListener("touchstart", startDragging);
      slider.addEventListener("mouseup", stopDragging);
      slider.addEventListener("touchend", stopDragging);
      slider.addEventListener("mouseleave", stopDragging);
      slider.addEventListener("mousemove", drag);
      slider.addEventListener("touchmove", drag);

      function startDragging(event) {
        if (event.type === "touchstart") {
          startPosition = event.touches[0].clientX;
        } else {
          startPosition = event.clientX;
          slider.classList.add("grabbing");
        }
        isDragging = true;
      }

      function drag(event) {
        if (!isDragging) return;
        event.preventDefault();

        let currentPosition = 0;
        if (event.type === "touchmove") {
          currentPosition = event.touches[0].clientX;
        } else {
          currentPosition = event.clientX;
        }

        currentTranslate = prevTranslate + currentPosition - startPosition;
      }

      function stopDragging() {
        slider.classList.remove("grabbing");
        prevTranslate = currentTranslate;
        isDragging = false;
      }
    },
  },
};
</script>

<style>
.swiper-slide {
  width: 300px;
}
.card {
  border-radius: 10px;
}
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

.slider-container {
  margin-bottom: 2rem;
}

.slider-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.slider-container .card-slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Remove scrollbar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-color: transparent;
  scroll-behavior: smooth;
}

.slider-container .card-slider::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Remove scrollbar background */
}

.slider-container .card {
  flex: 0 0 auto;
  width: 18rem;
  margin-right: 1rem;
  scroll-snap-align: start;
  border-radius: 1rem;
}

.slider-container .card-img-top {
  height: 15rem;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.slider-container .card-body {
  padding: 1rem;
}

.slider-container .card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.slider-container .price-share-container {
  display: flex;
  align-items: center;
}
</style>
