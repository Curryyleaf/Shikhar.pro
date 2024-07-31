<template>
  <div v-if="errorMessage.visible" class="error-notification">
    <p>{{ errorStore.message }}</p>
    <button @click="errorStore.clearError">Close</button>
  </div>
</template>

<script>
import { useStore } from '@/store/pinia';

export default {
  computed: {
      errorMessage(){
        const store= useStore();
        return store.errorMessage

      } 
  },
};
</script>

<style>
.error-notification {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: red;
  color: white;
  padding: 1rem;
  text-align: center;
}
</style>
