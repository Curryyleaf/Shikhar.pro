<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="mt-11"></router-view>
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

</style>
