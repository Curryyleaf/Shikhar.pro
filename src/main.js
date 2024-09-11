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
import VueLazyLoad from "vue3-lazyload";

// Import the Table component
import Table from './Table/TableComponenet.vue'
import VueVirtualScroller from "vue-virtual-scroller";

const pinia = createPinia();
const app = createApp(App); // Initialize the Vue app

// Use toast plugin
app.use(Toast);
app.use(pinia);
app.use(router);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error("Global error handler:", err, info);

  const rootElement = document.getElementById("app");

  const errorElement = document.createElement("div");
  errorElement.style.position = "fixed";
  errorElement.style.top = "0";
  errorElement.style.left = "0";
  errorElement.style.width = "100%";
  errorElement.style.backgroundColor = "red";
  errorElement.style.color = "white";
  errorElement.style.padding = "1rem";
  errorElement.style.textAlign = "center";
  errorElement.textContent = "We are updating, check again soon";

  // Append the error message element to the root
  rootElement.appendChild(errorElement);
};

  // app.mount("#app");



const MountTable = false;

if (MountTable) {
  createApp(Table)
    .use(pinia)
    .use(VueVirtualScroller)
    .use(VueLazyLoad)
    .use(router)
    .mount("#app2");
} else {

  app.mount("#app");
}
