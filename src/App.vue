<template>
  <div id="app" class="box-border m-0 p-0 overflow-x-hidden">
    <Navbar v-if="!isAdminRoute"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import ErrorNotification from './components/ErrorNotification.vue';
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
