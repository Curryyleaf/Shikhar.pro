<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="mt-7"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components:{
    Navbar
  } ,
  name: 'App'
};
</script>

<style>
/* Add some global styles if necessary */
</style>
