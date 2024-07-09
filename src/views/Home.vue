<template>
  <div class="">
   
    <nav class="bg-slate-500 text-white h-11 p-5 sticky top-0 left-0 right-0 z-30 marker:  justify-end flex items-center">
      <router-link to="/about" class="mr-4">About</router-link>
      <button class="ml-4" @click="logout">Logout</button>
      <router-link to="/categories" class="ml-4" >Categories</router-link>
    </nav>

   
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="max-w-2xl px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-semibold mb-4">Home Page</h1>
        <p class="text-gray-700">
          Welcome to your home page content. 
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style>

</style>
