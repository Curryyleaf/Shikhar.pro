<template>
  <div class="w-screen sm:text-sm bg-slate-500 m-auto fixed top-0 left-0 right-0 z-50 ">
    <div
      class="flex justify-center items-center w-2/3 my-auto h-14 mx-auto bg-slate-500"
    >
      <template v-for="(category, index) in list" :key="index">
        <nav class="flex ml-6 h-10 text-white items-center justify-center">
          <button class="" @click.prevent="setCategory(category)">
            {{ category }}
          </button>
        </nav>
      </template>

      <router-link to="/cart" class="ml-auto">
        <p class="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
            />
          </svg>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store/pinia";
export default {
    created(){
        this.fetchData()
    } ,
  methods: {
   async fetchData() {
       const store = useStore();
    await  store.fetchProducts();
    },
    setCategory(category) {
      const store = useStore();
      store.setCategory(category);

      if(this.$route.path !== '/categories'){
        this.$router.replace('/categories')
      }
    },
  },
  computed: {
    list() {
      const store = useStore();
      return ["All", ...store.categories];
    },
  },
 
};
</script>
