<template>
  <section class="grid grid-cols-2 h-screen  max-w-7xl  mx-auto gap-4 p-4">
    <!-- Product Image Section -->
    <div class="col-span-1 border border-gray-300 bg-white shadow-lg  p-4 h-full">
      <h3 class="text-lg font-semibold mb-4">Product Image</h3>
      <div class="flex flex-col items-center">
        <img src="" alt="" class="w-full h-64 object-cover mb-4" />
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Another Image
        </button>
      </div>
    </div>

    <!-- Product Information Section -->
    <div class="col-span-1 border border-gray-300 bg-white shadow-lg h-full p-4">
      <h3 class="text-lg font-semibold mb-4">Product Information</h3>
      <!-- Product Name -->
      <div class="w-full mb-4">
        <label for="productName" class="block text-sm font-medium text-gray-700"
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
        <label for="productType" class="block text-sm font-medium text-gray-700"
          >Product Type</label
        >
        <input
          id="productType"
          v-model="category"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          
        </input>
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
        <label for="description" class="block text-sm font-medium text-gray-700"
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
    <button @click="addNewProduct">Add a New Product</button>
  </section>
</template>
<script>
import { useStore } from '@/store/pinia';
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
  methods:{
async addNewProduct() {
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
    fetchData(){

    }
  } ,
  created(){
    this.fetchData()
  }
};
</script>
