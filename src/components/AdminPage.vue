<template>
  <div class="relative w-11/12 p-3 border rounded-lg overflow-x-auto bg-white shadow-md sm:rounded-lg">
    <div class="flex bg-white p-6 justify-between items-center">
      <div class="relative w-full md:w-auto">
        <input
          aria-label="search"
          type="search"
          placeholder="Search"
          class="w-full md:w-64 lg:w-96 text-gray-600 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-2 px-4 pl-10 transition bg-gray-100"
        />
        <div class="absolute top-2 left-3">
          <svg
            class="fill-current text-gray-600 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="flex items-center ml-56">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-funnel"
          viewBox="0 0 16 16"
        >
          <path
            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"
          />
        </svg>
        <button @click="sortingByTitle">Sort by Alphabet</button>
        <button @click="sortByPriceBracket0to100">0-100</button>
        <button @click="sortByPriceBracket100to500">100-500</button>
        <button @click="sortByPriceBracket500plus">500+</button>
      </div>

      <button
        class="bg-blue-500 text-white py-2 px-4 rounded"
        @click="navigateToAddNewItem"
      >
        Add a new item
      </button>
    </div>

    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-base text-gray-700 rounded-lg pb-4 bg-gray-50 uppercase font-thin">
        <tr class="mb-4">
          <th class="p-2">
            <div class="flex items-center">
              <p>Select</p>
            </div>
          </th>
          <th class="px-6">Product</th>
          <th class="px-6">Category</th>
          <th class="px-6">Price</th>
          <th class="px-6">ID</th>
          <th class="px-6">Action</th>
        </tr>
      </thead>

      <tbody v-for="product in products" :key="product.id" class="flex-col">
        <tr class="bg-white hover:bg-gray-50 max-h-16 min-h-12 mb-4 flex-wrap">
          <td class="w-4 p-2">
            <div class="flex items-center">
              <input
                :id="product.id"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-50 focus:ring-blue-500"
              />
              <label class="sr-only">checkbox</label>
            </div>
          </td>
          <th class="px-6 w-1/3 whitespace-nowrap tracking-wide font-medium max-w-10 text-wrap">
            {{ product.title }}
          </th>
          <td class="px-6 whitespace-nowrap py-2">{{ product.category }}</td>
          <td class="px-6 whitespace-nowrap py-2">{{ product.price }}</td>
          <td class="px-6 whitespace-nowrap py-2">
            <button
              @click="deleteProduct(product.id)"
              href="#"
              class="font-medium hover:underline"
            >
              {{ product.id }}
            </button>
          </td>
          <td class="px-6 whitespace-nowrap py-2">
            <button
              @click="deleteProduct(product.id)"
              href="#"
              class="font-medium text-blue-600 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "@/store/pinia";

export default {
  data() {
    return {
      products: [],
      ascending: true,
    };
  },
  methods: {
    sortingByTitle() {
      this.products.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return this.ascending
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    },
    sortByPriceBracket0to100() {
      this.sortByPriceBracket("0-100");
    },
    sortByPriceBracket100to500() {
      this.sortByPriceBracket("100-500");
    },
    sortByPriceBracket500plus() {
      this.sortByPriceBracket("500+");
    },
    sortByPriceBracket(bracket) {
      this.products.sort((a, b) => {
        const priceA = a.priceBracket === bracket ? 0 : a.priceBracket === "0-100" ? 1 : a.priceBracket === "100-500" ? 2 : 3;
        const priceB = b.priceBracket === bracket ? 0 : b.priceBracket === "0-100" ? 1 : b.priceBracket === "100-500" ? 2 : 3;

        return this.ascending ? priceA - priceB : priceB - priceA;
      });
    },
    async fetchSort() {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?sort=desc"
        );
        this.products = response.data.map(product => ({
          ...product,
          priceBracket: this.getPriceBracket(product.price)
        }));
      } catch (error) {
        console.log(error);
      }
    },
    getPriceBracket(price) {
      if (price <= 100) {
        return "0-100";
      } else if (price <= 500) {
        return "100-500";
      } else {
        return "500+";
      }
    },
    navigateToAddNewItem() {
      this.$router.push({ name: "AddNewProduct" });
    },
    async deleteProduct(id) {
      const store = useStore();
      const newProducts = store.products.filter((item) => item.id !== id);
      store.products = newProducts;
      // try {
      //   const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
      //   console.log(response.data);
      // } catch (error) {
      //     console.log(error);
      // }
    },
  },
  created() {
    this.fetchSort();
  },
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
