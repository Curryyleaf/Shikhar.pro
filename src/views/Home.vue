<template>
  <div class="">
    <div
      class="flex justify-center mt-24 max-w-screen-xl rounded-lg mx-auto items-center h-screen bg-gray-100"
      role="main" 
      aria-label="Main content area"
    >
      <div 
        class="max-w-2xl px-4 py-8 bg-white shadow-lg rounded-lg"
      >
        <h1 
          id="home-heading" 
          class="text-2xl font-semibold mb-4"
          role="heading" 
          aria-level="1"
        >
          Home Page
        </h1>
        <Button
          buttonShape="round"
          :icon="'fa-solid'"
          :iconLibrary="'fa-bars'"
          :buttonSize="'large'"
          :buttonColor="'red'"
          role="button" 
          aria-label="Menu"
        >
        </Button>
        <p 
          class="text-gray-700"
          role="status" 
          aria-live="polite"
        >
          Welcome to your home page content.
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
