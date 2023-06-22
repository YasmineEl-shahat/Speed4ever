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

    <section class="about-us row">
      <div class="col-md-6">
        <h2>معلومات عنا</h2>
        <p>
          شركة ونهتم بتوفير أفضل خدماتنا لجميع العملاء. نسعى دائمًا لتحقيق الرضا
          التام لدى عملائنا في المقام الأول. تأسست الشركة عام xxxx من قبل المؤسس
          الذي كان لديه رؤية واضحة في تقديم خدماتنا بأفضل جودة ممكنة وبأسعار
          منافسة. رؤيتنا على سعينا الدائم لتحقيق التميز في الخدمات التي نقدمها،
          مع التزامنا بالمعايير والمواصفات العالمية. نسعى لتطوير أدائنا وخبراتنا
          باستمرار، حتى نتمكن من تلبية احتياجات عملائنا بشكل أفضل. تتلخص رسالتنا
          في تقديم أفضل الخدمات والمنتجات بأعلى مستويات الجودة، وتحقيق الرضا
          التام لدى عملائنا. نسعى دائمًا للتطور والابتكار، لتلبية طموحات عملائنا
          وتوسيع قاعدتنا العملائية. إننا فخورون بفريق العمل المتميز والمحترف
          لدينا، الذي يضع تحقيق رضا عملائنا في المقام الأول دائمًا.
        </p>
      </div>
      <div class="col-md-6">
        <img
          alt="about"
          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
        />
      </div>
    </section>
    <!-- Categories -->
    <section class="row mt-5">
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
    </section>

    <!-- Latest Auctions -->
    <section class="slider-container">
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
              <div>
                <i class="fas fa-share"></i>
                <button
                  class="btn-favorite"
                  @click="addToFavorite(auction.id, $event)"
                  :class="{ active: isProductFavorite(product.id) }"
                >
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a v-if="latest_auctions.length > 0" href="#" class="view-all-link"
        >عرض الكل</a
      >
    </section>

    <section class="ad-section">
      <a href="#">Shop now</a>
      <img
        src="https://media.istockphoto.com/id/998851134/photo/speak-up-in-the-name-of-justice.jpg?s=612x612&w=0&k=20&c=5J3HffZhwosheLR9lsOk7r8vUaPOG_uEbnmes1kC5wE="
      />
    </section>

    <!-- Latest Products -->
    <section class="slider-container">
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
              <div>
                <i class="fas fa-share-nodes"></i>
                <button
                  @click="addToFavorite(product.id, $event)"
                  class="btn-favorite"
                  :class="{ active: isProductFavorite(product.id) }"
                >
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="view-all-link">عرض الكل</a>
    </section>
  </main>
  <FooterComponent />
</template>

<script>
import NavbarComponent from "../NavbarComponent.vue";
import FooterComponent from "../FooterComponent.vue";
import { getHome } from "../../../api/home";
import { addToFav, getMyFav } from "../../../api/favorite";

export default {
  name: "HomeComponent",
  components: { NavbarComponent, FooterComponent },

  data() {
    return {
      slider: [],
      categories: [],
      latest_auctions: [],
      latest_products: [],
      favoriteProducts: [],
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
      // Fetch the user's favorite products
      const favoriteResponse = await getMyFav();
      this.favoriteProducts = favoriteResponse.data.data;
    } catch (error) {
      this.error = error.response.data.message;
    }
  },

  methods: {
    isProductFavorite(productId) {
      return this.favoriteProducts.some((product) => product.id === productId);
    },
    addToFavorite(itemId, e) {
      const button = e.target;
      if (
        button.classList.contains("active") ||
        button.parentElement.classList.contains("active")
      ) {
        button.classList.remove("active");
        button.parentElement.classList.remove("active");
      } else button.classList.add("active");
      addToFav({ product_id: itemId })
        .then(() => {
          // Handle success, e.g., show a success message
          console.log("Item added to favorites");
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          console.error("Failed to add item to favorites:", error);
        });
    },

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
        event.preventDefault();
        if (event.type === "touchstart") {
          startPosition = event.touches[0].clientX;
        } else {
          startPosition = event.clientX;
          slider.classList.add("grabbing");
        }
        isDragging = true;
      }

      function drag(event) {
        event.preventDefault();
        if (!isDragging) return;

        let currentPosition = 0;
        if (event.type === "touchmove") {
          currentPosition = event.touches[0].clientX;
        } else {
          currentPosition = event.clientX;
        }

        const dragDistance = currentPosition - startPosition;
        currentTranslate = prevTranslate + dragDistance;

        // Apply the translation to each card within the slider
        const cards = slider.querySelectorAll(".card");
        const cardWidth = cards[0].offsetWidth; // Assuming all cards have the same width

        cards.forEach((card, index) => {
          const cardTranslate = currentTranslate - index * cardWidth;
          card.style.transform = `translateX(${cardTranslate}px)`;
        });
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
.btn-favorite.active,
.fa-heart.active {
  color: red;
}

.ad-section {
  position: relative;
}
.ad-section img {
  width: 100%;
  height: 30rem;
}
.ad-section a {
  color: #fff;
  position: absolute;
  top: 15rem;
  right: 7vw;
  font-size: 2rem;
}
.ad-section a:hover {
  color: #fff;
}
.about-us {
  font-size: 2rem;
  margin: 4rem 0;
}
.about-us h2 {
  font-size: 3rem;
  line-height: 5rem;
}
.about-us img {
  width: 100%;
}
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
  margin: 4rem 0;
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
  justify-content: space-between;
}
.slider-container .price-share-container button {
  margin-right: 1rem;
}
.view-all-link {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
}
</style>
