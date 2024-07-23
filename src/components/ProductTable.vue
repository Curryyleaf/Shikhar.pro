<template>
  <div class="w-full">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-base text-gray-700 rounded-lg pb-4 bg-gray-50 uppercase font-thin">
        <tr class="mb-4">

          <th v-if="config.showAllSelectBox" class="pl-2 w-4">
            <div class="flex items-center justify-center">
              <input type="checkbox"
                     :checked="isAllSelected"
                     @change="toggleAllSelect"
                     class="w-4 h-4">
              <p class="ml-1 flex justify-center items-center p-0 m-0">All</p>
            </div>
          </th>

<!-- product  -->
          <th v-if="config.showTitle" class="px-6">
            <div class="relative">
              <div @click="toggleDropDown('title')" class="flex justify-center relative cursor-pointer items-center">
                <span class="inline-flex">Product</span>
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </div>

              <div v-if="dropDown.title" @mouseleave="closeDropdown('title')" class="absolute flex flex-col right-0 left-40 w-24 top-6 font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
                <button @click="sorting('title')" class="py-2 hover:bg-gray-100">Ascending</button>
                <button @click="sorting('title')" class="py-2 hover:bg-gray-100">Descending</button>
              </div>
            </div>
          </th>
          <!-- Category -->
          <th v-if="config.showCategory" class="px-6">
            <div class="relative flex justify-center flex-col">
              <div @click="toggleDropDown('category')" class="flex relative cursor-pointer items-center">
                <span>Category</span>
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </div>

              <div v-if="dropDown.category" @mouseleave="toggleDropDown('category')" class="absolute flex-col top-6 w-24 right-0 left-0 flex items-center justify-center font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
                <button @click="sorting('category')" class="py-2 px-2 w-full hover:bg-gray-100">Ascending</button>
                <button @click="sorting('category')" class="py-2 px-2 w-full hover:bg-gray-100">Descending</button>
              </div>
            </div>
          </th>

          <!-- Price -->
          <th v-if="config.showPrice" class="px-6">
            <div @click="toggleDropDown('price')" class="flex h-full w-full justify-center items-center relative">
              <span class="cursor-pointer">Price</span>
              <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
              <div v-if="dropDown.price" @mouseleave="toggleDropDown('price')" class="absolute flex-col top-6 font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
                <div v-for="(bracket, index) in PriceBracket" :key="index" @click="groupProductsByPriceBracket(bracket)" class="hover:bg-gray-100 py-2 w-24 px-3">
                  <button>{{ bracket }}</button>
                </div>
              </div>
            </div>
          </th>

          <!-- id -->
          <th v-if="config.showId" class="px-6">
            <div class="relative">
              <div @click="toggleDropDown('id')" class="flex justify-center relative cursor-pointer items-center">
                <span class="inline-flex">ID</span>
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </div>

              <div v-if="dropDown.id" @mouseleave="closeDropdown('id')" class="absolute flex-col top-6 font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
                <button @click="sorting('id')" class="py-2 px-3 hover:bg-gray-100 w-full">Ascending</button>
                <button @click="sorting('id')" class="py-2 px-3 hover:bg-gray-100 w-full">Descending</button>
              </div>
            </div>
          </th>
          <!-- deletconfig.e action -->
          <th v-if="config.showDeleteBtn" class="px-6">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id" @click.stop="selectItem(product.id)" class="bg-white hover:bg-gray-50 max-h-16 min-h-12 mb-4 flex-wrap">

          <td v-if="config.showAllSelectBox" class="p-2 w-4 m-0">
            <div class="flex items-center m-0 w-4">
              <input :id="product.id" type="checkbox" v-model="product.checked" class="w-4 h-4 text-blue-600 bg-gray-50 focus:ring-blue-500">
              <label class="sr-only">checkbox</label>
            </div>
          </td>
<!-- product title -->
          <td v-if="config.showTitle" class="px-6 whitespace-nowrap tracking-wide font-medium flex text-wrap">
            <span v-html="product.title" class="flex-grow"></span>
          </td>
<!-- product -->
          <td v-if="config.showCategory" class="px-6 whitespace-nowrap py-2">{{ product.category }}</td>
          <td v-if="config.showPrice" class="px-6 whitespace-nowrap py-2">{{ product.price }}</td>
          <td v-if="config.showId" class="px-6 whitespace-nowrap py-2"> {{ product.id }} </td>
          <!-- delete -->
          <td v-if="config.showDeleteBtn" class="px-6 whitespace-nowrap py-2">
            <button @click="deleteProduct(product.id)" href="#" class="font-medium text-blue-600 hover:underline">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
   config:{
  type:Object,
  default:{}
   } ,
    products: {
      type: Array,
      required: true
    },
    filteredProducts: {
      type: Array,
      required: true
    },
    isAllSelected: {
      type: Boolean,
    },
    toggleAllSelect: {
      type: Function,
      required: true
    },
    selectItem: {
      type: Function,
      required: true
    },

    sorting: {
      type: Function,
      required: true
    },
    deleteProduct: {
      type: Function,
      required: true
    },
    toggleDropDown: {
      type: Function,
      required: true
    },
    groupProductsByPriceBracket: {
      type: Function,
      required: true
    },
    PriceBracket: {
      type: Array,

    },
    dropDown: {
      type: Object,

    }
  },
//   methods: {
//     toggleDropdown(field) {
//       this.dropDown[field] = !this.dropDown[field];
//     },
//     closeDropdown(field) {
//       this.dropDown[field] = false;
//     },
//     closeSortDropdown() {
//       this.sort = false;
//     },
//   },
};
</script>


<style >

</style>
