<template>
  <div class="w-full box-border bg-gray-100">
    <div class="border-b pt-6 border-gray-200">
      <route
        to="/adminpage"
        class="max-w-full box-border ml-28 pt-10 font-bold text-3xl mx-auto"
        >Add Product</route
      >
      <p class="py-3 text-gray-400 ml-28">Add your new products here</p>
    </div>
    <form
      class="grid grid-cols-2 h-screen max-w-screen-lg mt-8 mx-auto gap-4 p-4"
    >
      <!-- Product Image Section -->
      <div
        class="col-span-1 border border-gray-300 bg-white shadow-lg rounded-lg p-4 h-full"
      >
        <h3 class="text-lg font-semibold mb-4">Product Image</h3>
        <div class="flex flex-col items-center">
          <label
            for="fileInput"
            class="relative flex flex-col items-center justify-center bg-gray-200 border-2 border-gray-300 border-solid rounded-lg w-72 h-64 hover:border-gray-400"
          >
            <span class="text-gray-600">Click here to add an image</span>
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>

          <button
            class="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600"
          >
            Add Another Image
          </button>
        </div>
      </div>

      <!-- Product Information Section -->
      <div
        class="col-span-1 border border-gray-300 rounded-lg bg-white shadow-lg h-full p-4"
      >
        <h3 class="text-lg font-semibold mb-4">Product Information</h3>
        <!-- Product Name -->
        <div class="w-full mb-4">
          <label
            for="productName"
            class="block text-sm font-medium text-gray-700"
            >Product Name</label
          >
          <input
            type="text"
            id="productName"
            v-model="title"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <!-- Product Type -->
        <div class="w-full mb-4">
          <label
            for="productType"
            class="block text-sm font-medium text-gray-700"
            >Product Type</label
          >
          <input
            id="productType"
            v-model="category"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <!-- Price and Title -->
        <div class="w-full mb-4">
          <div class="flex justify-between">
            <label for="price" class="block text-sm font-medium text-gray-700"
              >Price</label
            >
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Title</label
            >
          </div>
          <div class="flex space-x-4">
            <input
              type="number"
              id="price"
              v-model="price"
              class="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="text"
              id="title"
              v-model="title"
              class="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- Description -->
        <div class="w-full mb-4">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            id="description"
            v-model="description"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="4"
          ></textarea>
        </div>
      </div>
      <div class="flex m-2 justify-end">
        <button
          type="submit"
          @click="addNewProduct"
          class="bg-green-600 hover:bg-green-500 font-serif text-base px-10 py-0 h-10 shadow-lg  text-center border-0 rounded-lg"
        >
          Add
        </button>
      </div>
    </form>
            <router-link
          to="/adminDashboard/"
          class="flex font-semibold text-indigo-600 text-sm m-10"
        >
          <svg
            class="fill-current mr-2 text-indigo-600 w-4"
            viewBox="0 0 448 512"
          >
            <path
              d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
            />
          </svg>
          back
        </router-link>
  </div>
</template>
<script>
import { useStore } from "@/store/pinia";
export default {
  data() {
    return {
      title: "",
      price: null,
      description: "",
      image: "",
      category: "",
    };
  },
  methods: {
    async addNewProduct() {
      if (!this.formComplete) {
        alert("please fill all the blanks");
        return;
      }
      const store = useStore();
      const newProduct = {
        title: this.title,
        price: this.price,
        description: this.description,
        image: this.image,
        category: this.category,
      };
      store.setNewProduct(newProduct);
      console.log(store.newProduct);
    },
    fetchData() {
      const store = useStore();
      store.AddaNewProduct();
    },
  },
  computed: {
    formComplete() {
      return (
        this.title &&
        this.price &&
        this.description &&
        this.image &&
        this.category
      );
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
