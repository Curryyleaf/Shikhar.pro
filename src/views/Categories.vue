<template>
  <!-- <template v-for="product in filteredProducts" :key="product.id"></template> -->

  <!-- <img
            @click="navigateToSingle(product.id)"
              :src="product.image"
              :alt="product.title"
              class="w-full h-48 object-contain"
            /> -->

  <!-- <button @click.prevent="increaseQuantity(product.id)"></button> -->

  <!-- <input type="number" v-model.number="productQuantities[product.id]" min="1" class="bg-gray-300 inline-flex h-6 w-12 text-center justify-center items-center m-2 no-spinner" /> -->

  <div class="bg-white">
    <div
      class="relative bg-white text-center top-36 w-screen mb-14 font-extralight text-black text-6xl"
    >
      <h1>Products</h1>
    </div>
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8"
    >
      <div
        class="grid w-full grid-cols-1 mt-56 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-y-36 xl:gap-x-14"
      >
        <div
          v-for="product in displayingLogic"
          @click.prevent.stop="navigateToSingle(product.id)"
          :key="product.id"
          :id="product.id"
          class="hover:shadow-2xl border rounded-xl p-2 hover:scale-105 transition duration-300 ease-in-out"
          @mouseover="mouseOver(product.id)"
          @mouseleave="mouseLeave(product.id)"
          aria-label="product-item"
        >
          <div class="aspect-h-1 aspect-w-1 w-full xl:aspect-h-8 xl:aspect-w-7">
            <img
              :src="product.image"
              :alt="product.title"
              class="h-full w-1/4 object-contain rounded-3xl object-center group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm m-2 text-gray-700">{{ product.title }}</h3>

          <p class="mt-1 text-lg font-medium mx-2 text-gray-900">
            {{ product.price }}
          </p>

          <!-- add to cart  -->
          <div
            v-if="hover[product.id]"
            class="flex justify-between i mt-2 items-center"
          >
            <!-- increase and  decrease  -->
            <div class="flex justify-center m-2 items-center">
              <button @click.prevent.stop="increaseQuantity(product.id)">
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
              <input
                type="number"
                v-model.stop="productQuantities[product.id]"
                min="1"
            
                @click.prevent.stop="preventNavigation"
                class="border border-gray-300 w-6 inline-flex h-6 text-center justify-center items-center m-2 no-spinner"
              />
              <button @click.prevent.stop="decreaseQuantity(product.id)">
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

            <!-- button last -->
            <button
              @click.prevent.stop="addToCart(product.id)"
              class="font-bold text-xs text-white bg-red-600 px-3 py-1 m-2 rounded"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "@/store/pinia";
import { useToast } from "vue-toastification";
import SingleProduct from "./SingleProduct.vue";
export default {
  data() {
    return {
      // products:[] ,
      hover: {},
      productQuantities: {},
      toast: useToast(),

      isLoading: false,
    };
  },
  computed: {
    // filteredProducts() {
    //   const store = useStore();
    //    return store.categories
    // },
    displayingLogic() {
      const store = useStore();
      if (store.temporaryCategories.length) {
        return store.temporaryCategories;
      } else {
        return store.categories;
      }
    },
  },
  methods: {
    preventNavigation(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    mouseOver(productId) {
      this.hover[productId] = true;
    },
    mouseLeave(productId) {
      this.hover[productId] = false;
    },
    navigateToSingle(productid) {
      this.$router.push({ name: "product", params: { id: productid } });
    },
    async fetchData() {
      const store = useStore();

      // await store.fetchProducts();
   
      // await store.fetchAddaNewProduct()
      const savedCategory = localStorage.getItem("category");
      if (savedCategory) {
        await store.fetchCategoryProducts(savedCategory);
      }
 
      // even though i commeneted fetchAddaNewproduct all the new product were being added to the this.products because of the above fetchCategoryProducts
    },
    showSuccessToast() {
      this.toast.success("Items Added!", {
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
        rtl: false,
      });
    },
    addToCart(productId) {
      const quantity = this.productQuantities[productId] || 1;
      const store = useStore();
      store.fetchCart();

      store.addToCart(productId, quantity);
      console.log("qunatity", this.productQuantities);

      this.productQuantities[productId] = 1;
      this.showSuccessToast();
    },

    increaseQuantity(Id) {
      if (!this.productQuantities[Id]) {
        this.productQuantities[Id] = 1; // using [] sets a new key if the key doesnot exist yet and add the value of 1
      } else {
        this.productQuantities[Id]++;
      }
      console.log("btn is clickin", Id);
    },

    decreaseQuantity(Id) {
      if (this.productQuantities[Id] && this.productQuantities[Id] > 0) {
        this.productQuantities[Id]--;
      }
      console.log("btn is clickin", Id);
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
