import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./routers";
import App from "./App.vue";

import "../styles/globals.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
