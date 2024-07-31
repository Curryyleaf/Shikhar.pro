// src/main.js

import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/tailwind.css"; // Import Tailwind CSS first
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
  errorElement.textContent = "we are updating , chec again soon ";

  // Append the error message element to the root
  rootElement.appendChild(errorElement);

  // Remove the error message after a timeout
  setTimeout(() => {
    rootElement.removeChild(errorElement);
  }, 5000); // Remove after 5 seconds or adjust as needed
};
app.mount("#app");
