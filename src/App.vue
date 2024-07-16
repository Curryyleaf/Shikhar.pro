<template>
  <div id="app">
    <Navbar v-if="!isAdminRoute"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  computed: {
    isAdminRoute() {
      return this.$route.meta.isAdmin;
    }
  }
};
</script>

<style>

</style>
