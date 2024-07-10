<template>
  <section>
   

    <main class="px-4 py-8">
      <div
     
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        <template v-for="product in filteredProducts" :key="product.id">
          <div
          @click="navigateToSingle(product.id)"
          class="bg-white overflow-hidden shadow-lg rounded-lg"
          >
            <img
            
              :src="product.image"
              :alt="product.title"
              class="w-full h-48 object-contain"
            />
            <div class="p-4 ">
              <h1 class="text-lg font-bold mb-2">{{ product.title }}</h1>
              <p class="text-gray-700 text-sm mb-2">${{ product.price }}</p>
              <div class="flex items-center mb-2">
                <aside class="text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-star-fill mr-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                  </svg>
                  <!-- {{ product.rating.rate }} -->
                </aside>
              </div>
              <p class="text-gray-500 text-sm">{{ product.description }}</p>
              <div class="flex justify-between mt-4">
                <a href="#" class="text-blue-800 font-bold text-sm"
                  >Remove from cart</a
                >
                <div class="flex justify-center items-center ">
                  <div class=" flex justify-center items-center">
                    <button @click.prevent="increaseQuantity(product.id)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-plus-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"
                        />
                      </svg>
                    </button>
                    <!-- <p class="bg-gray-300 inline-flex h-6 w-6 p-2 text-center justify-center items-center m-2 ">{{productQuantities[product.id] || 1}}</p> -->
                    <input type="number" v-model.number="productQuantities[product.id]" min="1" class="bg-gray-300 inline-flex h-6 w-12 text-center justify-center items-center m-2 no-spinner" />
                    <button @click.prevent="decreaseQuantity(product.id)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-dash-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    @click.prevent.stop="addToCart(product.id)"
                    class="font-bold text-sm text-white bg-blue-800 px-3 py-1 ml-4 rounded"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </section>
</template>
<script>
import { useStore } from "@/store/pinia";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      productQuantities: {},
      toast:useToast(),
    };
  },
  computed: {

    filteredProducts() {
      const store = useStore();
      if (!store.selectedCategory || store.selectedCategory === "All") {
        return store.products;
      }
      return store.products.filter(
        (product) => product.category === store.selectedCategory
      );
    },
  },
  methods: {
    navigateToSingle(productid){
      this.$router.push({name:'product' , params:{id:productid}})
    } ,
    fetchData() {
      const store = useStore();
      store.fetchProducts();
      store.fetchCategory();
      
    },
   showSuccessToast() {
      this.toast.success('Items Added!', {
        position: "top-center",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
      });
    },
    addToCart(productId) {
      
      const quantity = this.productQuantities[productId] || 1;
      const store = useStore();
      store.fetchCart()


      store.addToCart(productId, quantity );
      console.log('qunatity' , this.productQuantities);

      this.productQuantities[productId] = 1;
      this.showSuccessToast();
    },

    increaseQuantity(Id) {
      if (!this.productQuantities[Id]) {
        this.productQuantities[Id] = 1; // using [] sets a new key if the key doesnot exist yet and add the value of 1
      } else {
        this.productQuantities[Id]++;
      }
      console.log('btn is clickin' ,Id);
    },

    decreaseQuantity(Id) {
      if (
        this.productQuantities[Id] &&
        this.productQuantities[Id] > 0
      ) {
        this.productQuantities[Id]--; // Decrease quantity if it exists and is greater than 0
      }
      console.log('btn is clickin' , Id);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped></style>

<!--  <button @click="incrementQuantity(product.id)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-plus-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"
                        />
                      </svg>
                    </button> -->

<!-- <button @click="decrementQuantity(product.id)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-dash-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"
                        />
                      </svg>
                    </button> -->
