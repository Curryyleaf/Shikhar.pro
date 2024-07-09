<template>
  
  <div class="container mx-auto mt-10">
    <div class="sm:flex shadow-md my-10">
      <div class="w-full sm:w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">Items</h2>
        </div>

        <div
          v-for="item in filteredCartItems"
          :key="item.id"
          class="md:flex items-strech py-6 md:py-4 lg:pt-1 border-t border-gray-300"
        >
          <div class="md:w-1/4 2xl:w-1/4 flex justify-center items-center overflow-hidden w-full">
            <img
              :src="item.image"
              alt="Black Leather Purse"
              class="object-center object-contain max-h-24 md:block hidden"
            />
          </div>
          <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
            <p class="text-xs leading-3 text-gray-800 md:pt-0 ">Product id: {{ item.id }}</p>
            <div class="flex items-center justify-between pb-2 w-full">
              <p class="text-base font-black leading-none text-gray-800">
               {{ item.title }}
              </p>
              <aside
                aria-label="Select quantity"
                class="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
              >
            {{ itemQunatitiy(item.id) }}
              </aside>
            </div>
            <p class="text-xs leading-3 text-gray-600 pb-1">Category: {{ item.category }}</p>
            <p class="w-96 text-xs leading-3 text-gray-600">
              Composition: {{ item.title }}
            </p>
            <div class="flex items-center justify-between pt-4">
              <div class="flex itemms-center">
                <p
                  class="text-xs leading-3 underline text-gray-800 cursor-pointer"
                >
                Rating: {{ item.rating.rate }}
                </p>
                <button @click.prevent="removeFromCart(item.id)"
                  class="text-xs leading-3 underline text-red-500 pl-20 cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <p class="text-base font-black leading-none text-gray-800">
                {{ item.price }}
              </p>
            </div>
          </div>
        </div>
        <!-- herererererer -->

        <router-link to="/categories" class="flex font-semibold text-indigo-600 text-sm mt-10">
          <svg
            class="fill-current mr-2 text-indigo-600 w-4"
            viewBox="0 0 448 512"
          >
            <path
              d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
            />
          </svg>
          Continue Shopping
        </router-link>
      </div>
      <div id="summary" class="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">Items 3</span>
          <span class="font-semibold text-sm">590$</span>
        </div>
        <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase">
            Shipping
          </label>
          <select class="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div class="py-10">
          <label
            for="promo"
            class="font-semibold inline-block mb-3 text-sm uppercase"
          >
            Promo Code
          </label>
          <input
            type="text"
            id="promo"
            placeholder="Enter your code"
            class="p-2 text-sm w-full"
          />
        </div>
        <button
          class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
        >
          Apply
        </button>
        <div class="border-t mt-8">
          <div
            class="flex font-semibold justify-between py-6 text-sm uppercase"
          >
            <span>Total cost</span>
            <span>{{ totalCost }}</span>
          </div>
          <button
            class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
          >
            Checkout
          </button>
        </div>
      </div>
     
    </div>
  </div>
</template>
<script>
import { useStore } from "@/store/pinia";

export default {

  computed: {

    filteredCartItems() {
      const store = useStore();
      const ids = store.cart.map((items) => items.productId);
      console.log('STORE',store.cart);
      const newArray = store.products.filter((item) => ids.includes(item.id));
      console.log("array in cart after filter", newArray);
      return newArray;
    },

    totalCost() {
      const store = useStore();
      return store.cart.reduce(
        (total, item) =>
          total + item.quantity * store.getProductPriceById(item.productId),
        0
      );
    },

  },
  methods: {
        itemQunatitiy(id) {
const store = useStore();
    const cartItem = store.cart.find(item => item.productId === id);
    return cartItem.quantity 
      
    },
       async  fetchdata() {
      const store = useStore();
    await  store.fetchProducts();
     await store.fetchCart();
     store.addToCart()
     
    },
    removeFromCart(productId) {
      const store = useStore();
      store.removeFromCart(productId);
    },
    // incrementQuantity(productId) {
    //   const store = useStore();
    //   store.incrementQuantity(productId);
    // },
    // decrementQuantity(productId) {
    //   const store = useStore();
    //   store.decrementQuantity(productId);
    // },
  },
async created() {
    const store = useStore();
    await this.fetchdata();

    // this.filteredCartItems();
    console.log("hihih", store.cart);
  },
};
</script>

<style scoped>

</style>
