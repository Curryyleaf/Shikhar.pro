// src/main.js
import "./assets/tailwind.css"; // Import Tailwind CSS first
import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { useStore } from "./store/pinia";

const app = createApp(App);

const pinia = createPinia();

// Use toast plugin
app.use(Toast);

app.use(pinia);
app.use(router);
app.mount("#app");
