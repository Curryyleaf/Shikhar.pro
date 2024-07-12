<template>
  <div class="">
    <div class="flex justify-center mt-48 max-w-screen-xl rounded-lg mx-auto items-center h-screen bg-gray-100">
      <div class="max-w-2xl px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-semibold mb-4">Home Page</h1>
        <p class="text-gray-700">Welcome to your home page content.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
