<template>
  <!-- <template v-for="(category, index) in list" :key="index">
        <nav class="flex ml-6 h-10 text-white items-center justify-center">
          <button class="" @click.prevent="setCategory(category)">
            {{ category }}
          </button>
        </nav>
      </template> -->

  <nav class="bg-white   fixed top-0 left-0 right-0 pt-3 z-50">
    <div
      class="max-w-screen-xl border-4 border-gray-300  rounded-full flex flex-wrap items-center justify-between mx-auto p-2"
    >
      <a href="#" class="flex items-center ml-2 space-x-3 rtl:space-x-reverse">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
  <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"/>
</svg>
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap  text-gray-700 "
        >
          The Basket</span
        >
      </a>
      <button
       
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      <div class="hidden w-full md:block md:w-auto text-gray-500" id="navbar-dropdown ">
        <ul
          class="flex mr-3 flex-col justify-center items-center  font-medium p-4 md:p-0 mt-4 border-2 border-gray-200 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white "
        >
          <router-link to="/" class="hover:text-gray-900 ">Home</router-link>

          <li>
            <button
              id="dropdownNavbarLink"
              @click="toggle"
              class="flex items-center relative justify-between w-full py-2 px-3  hover:text-gray-900 focus:text-gray-900  text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto md:dark:hover:text-gray-500 dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
              Categories
              <svg
                class="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
              <!-- <template v-for="(category, index) in list" :key="index">
        <nav class="flex ml-6 h-10 text-white items-center justify-center">
          <button class="" @click.prevent="setCategory(category)">
            {{ category }}
          </button>
        </nav>
       </template> -->
            
            <!-- Dropdown menu -->

            <div
              v-if="dropDownn"
              @mouseleave="closeDropdown"
              id="dropdownNavbar"
              class=" absolute font-normal bg-white divide-y left-[566px]   z-[999]  rounded-lg  w-34 hover:text-gray-800 pt-3 dark:divide-gray-600  transition-transform duration-1000 transform translate-x-full" 
             >
              <ul
              v-for="category in list"
                class="py-2 mr-3 text-sm text-gray-500 hover:bg-gray-100  hover:text-gray-700 "
                
              >
                <li class="">
                  <button 
                  @click.away="setCategory(category)"
                    href="#"
                    class="block px-4 pt-2 pb-0 hover:text-gray-900  "
                    >
                    {{ category }}
                  </button>
                </li>
              </ul>

              <div class="py-1">
               
              </div>

            </div>

            
          </li>

          <li>
            <a
              href="#"
              class="block py-2 px-3  hover:text-gray-900 focus:text-gray-900  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0    md:dark:hover:bg-transparent"
              >Services</a
            >
          </li>

          <li>
            <a
              href="#"
              class="block py-2 px-3  hover:text-gray-900 focus:text-gray-900  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0     md:dark:hover:bg-transparent"
              >Pricing</a
            >
          </li>

          <li>
            <a
              href="#"
              class="block py-2 px-3   hover:text-gray-900 focus:text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:dark:hover:bg-transparent"
              >Contact</a
            >
          </li>
          <router-link to="/cart" class="ml-auto mr-2  hover:text-gray-900 focus:text-gray-900 ">
        <span class="ml-auto">
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
        </span>
      </router-link>
       <li class="ml-4 ">
            
                  <button class="border-2 border-gray-300 rounded-lg p-1 text-xs hover:text-sm " @click="logout">Logout</button>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>


</template>

<script>
import { useStore } from "@/store/pinia";
export default {
  data() {
    return {
      dropDownn: false,
      
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
        logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
    toggle() {
      console.log("toggle is being used ");
      this.dropDownn = !this.dropDownn;
    },
        closeDropdown() {
      this.dropDownn = false;
    },
    async fetchData() {
      const store = useStore();
      await store.fetchProducts();
      await store.fetchCategories()
      await store.fetchCategoryProducts()

      console.log(this.list);
    },
    setCategory(category) {
       localStorage.setItem('category' , category)

            const store = useStore();
       store.fetchCategoryProducts(category)
      if(this.$route.path !== '/categories'){
        this.$router.replace('/categories')
      }
    },
  },
  computed: {
    list() {
      const store = useStore();
      return ["All", ...store.selectedCategory];
    },
  },
};
</script>
