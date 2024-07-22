<template>
  <div
    class="relative w-11/12 p-3 border rounded-lg overflow-x-auto bg-white shadow-md sm:rounded-lg"
  >
    <div class="flex bg-white p-6 justify-between items-center">
      <!-- before we were using keyup.eneter or change but we instead used input for search to happen with every letter -->
      <div class="relative w-full md:w-auto">
        <input
          v-model="searchedQuery"
          @input="seacrhedItems"
           
          type="search"
          placeholder="Search"
          class="w-full md:w-64 lg:w-96 text-gray-600 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-2 px-4 pl-10 transition bg-gray-100"
        />
        {{ searchedQuery }}
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
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-funnel"
          viewBox="0 0 16 16"
        >
          <path
            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"
          />
        </svg>
        <button class="ml-2" @click="sortingAscending">{{ ascending ? 'Z to A' :'A to Z' }}</button>
        <!-- <select name="" id="" v-model="sortby"> -->
        <!-- <span class="ml-4">filter</span> -->
        <!-- <option value="price" class="hover:bg-teal-500 bg-white">
            Price
          </option>
          <option value="rating">Rating</option>
          
          <p >Ascendining</p>

          <option value="Descending">Descending</option>
          <option value="Lowest">Lowest First</option>
          <option value="Higest">Higest First</option> -->
        <!-- </select> -->
        <button @click="fetchSort"></button>
      </div>
      <button
        class="bg-blue-500 text-white py-2 px-4 rounded"
        @click="navigateToAddNewItem"
      >
        Add a new item
      </button>

      <div></div>
    </div>

    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead
        class="text-base text-gray-700 rounded-lg pb-4 bg-gray-50 uppercase font-thin"
      >
        <tr class="mb-4">
          <th class="pl-2 w-4">
            <div class="flex items-center justify-center">
              <input type="checkbox"
              :checked="isAllSelected"
              @change="toggleAllSelect"
               class="w-4 h-4"
              
              >
              <p class="ml-1 flex justify-center items-center  p-0 m-0">All</p>
            </div>
          </th>
          <th class="px-6"  >
             <div class="relative">
             <div @click="toggleDropDown('title')"  class="flex justify-center   relative cursor-pointer items-center">
              <span class="inline-flex" >Product</span>
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
             </div>
              
             <div  v-if="dropDown.title" @mouseleave="closeDropdown('title')"  class="absolute flex flex-col right-0 left-40 w-24 top-6  font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
              <button @click="sorting('title')" class="py-2  hover:bg-gray-100 "  >Ascending</button>
               <button  @click="sorting('title')" class="py-2  hover:bg-gray-100 "   >Descending</button>
             </div>

            </div>
          </th>
          <th class="px-6">
            <div class="relative flex justify-center flex-col ">
             <div @click="toggleDropDown('category')"  class=" flex relative cursor-pointer items-center">
              <span class="" >Category</span>
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
             </div>
              
             <div  v-if="dropDown.category" @mouseleave="closeDropdown('category')"  class="absolute flex-col top-6  w-24 right-0 left-0 flex items-center justify-center font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
              <button @click="sorting('category')" class="py-2 px-2 w-full hover:bg-gray-100 "  >Ascending</button>
               <button  @click="sorting('category')" class="py-2 px-2 w-full hover:bg-gray-100 "   >Descending</button>
             </div>

            </div>
          </th>
          <th class="px-6" @click="toggleSort">
            <div
              class="flex h-full w-full justify-center items-center relative"
            >
              <span class="cursor-pointer">Price</span
              >                   <svg
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
              <div
                v-if="sort"
                @mouseleave="closeSort"
                class="absolute flex-col top-6 font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100"
              >
                <div
                  v-for="(bracket, index) in PriceBracket"
                  :key="index"
                  @click="groupProductsByPriceBracket(bracket)"
                  class="hover:bg-gray-100 py-2 px-3"
                >
                  <button>{{ bracket }}</button>
                </div>
              </div>
            </div>
          </th>
          <th class="px-6" ref="targetElement" >
              <div class="relative">
             <div @click="toggleDropDown('id')"  class="flex justify-center  relative cursor-pointer items-center">
              <span class="inline-flex" >ID</span>
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
             </div>
              
             <div  v-if="dropDown.id" @mouseleave="closeDropdown('id')"  class="absolute flex-col top-6 font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
              <button @click="sorting('id')" class="py-2 px-3 hover:bg-gray-100 w-full" >Ascending</button>
               <button  @click="sorting('id')" class="py-2 px-3 hover:bg-gray-100 w-full" >Descending</button>
             </div>

            </div>
          </th>
          <th class="px-6">Action</th>
        </tr>
      </thead>


      <!-- table content area  -->
      <tbody v-for="product in filteredProducts" class="">
        <tr @click.stop="selectItem(product.id)" class="   bg-white hover:bg-gray-50 max-h-16 min-h-12 mb-4 flex-wrap">

          <td class=" p-2 w-4 m-0">
            <div   class="flex items-center m-0  w-4">
              <input
                :id="product.id"
                type="checkbox"
                v-model="product.checked"
                @change="updateSelectAll"
                class="w-4 h-4 text-blue-600 bg-gray-50 focus:ring-blue-500"
              />
              <label class="sr-only">checkbox</label>
            </div>
          </td>

          <th
            class="px-6  whitespace-nowrap tracking-wide font-medium flex text-wrap "
          >
          <span v-html="product.title" class="flex-grow"></span>
          </th>
          <td class="px-6 whitespace-nowrap py-2">
            {{ product.category }}
          </td>
          <td class="px-6 whitespace-nowrap py-2">
            {{ product.price }}
          </td>
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
import Submenu from '@/components/Submenu.vue'
export default {
  components:{
Submenu
  } ,
  data() {
    return {
      searchedQuery: "" ,
      sortby: "",
      sort: false,
      dropDown:{
        category:false,
        title:false ,
        price:false ,
        id:false ,
        
      } ,
      ascending:false ,
      products: [],
      PriceBracket: ["0-100", "100-500", "500+"],
      filteredProducts: [],
    };
  },
    computed: {
       
  },
  methods: {

    selectItem(id){
     this.products.forEach((item) =>{
      if(item.id === id){
        item.checked = !item.checked;
      }
     })
    } ,
    toggleAllSelect(event){
          const isChecked = event.target.checked;
      this.products.forEach(item => item.checked = isChecked);
    } ,
// showSubmenu(e){
//   this.dropDownn=true;
//   const submenu = this.$refs.container
//  const rect = this.$refs.targetElement.getBoundingClientRect();
//     const center = (rect.right + rect.left)/2 ;
//     const bottom = rect.bottom-3
//     submenu.style.left= `${center}px`
//     submenu.style.top= `${bottom}px`
    
   
// } ,
closeDropdown(parameter){
   this.dropDown[parameter] =! this.dropDown[parameter]
} ,
    closeSort() {
      this.sort = false;
    },
    toggleDropDown(parameter){
   this.dropDown[parameter] =! this.dropDown[parameter]
    } ,
    toggleSort() {
      this.sort = !this.sort;
    },
    async groupProductsByPriceBracket(bracket = "all") {
      if (bracket === "all") {
        await this.fetchSort();
        this.filteredProducts = this.products;
      } else {
        const filteredProducts = this.products.filter(
          (product) => product.priceBracket === bracket
        );

        filteredProducts.sort((a, b) => a.price - b.price);

        this.filteredProducts = filteredProducts;
        console.log(this.filteredProducts);
      }
    },
    sorting(parameter) {
      this.ascending=!this.ascending
      this.products.sort((a, b) => {
        const valueA = a[parameter].toUpperCase(); 
        const valueB = b[parameter].toUpperCase(); 

                if (parameter === 'id') {
          return this.ascending ? valueA - valueB : valueB - valueA;
        } else {
          return this.ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        }

        // if (this.ascending) {
        //   return valueA.localeCompare(valueB);
        // } else {
        //   return valueB.localeCompare(valueA);
        // }
        
      });
    },
    sortingAscending(){
      this.ascending = !this.ascending;
        this.products.sort((a ,b )=>{
          const valueA = a.title.toUpperCase();
          const valueB = b.title.toUpperCase();

          if(this.ascending){
            return valueA.localeCompare(valueB)
          } else {
            return valueB.localeCompare(valueA);
          }
        })
    } ,
seacrhedItems() {
  const query = this.searchedQuery.toLowerCase();
  const newItems = this.products.filter((items) => {
     return items.title.toLowerCase().includes(query); 
  
    
  });

 const highlightedTitle= newItems.map(item => {
    const index = item.title.toLowerCase().indexOf(query);
    if (index !== -1) {
      const highlightedTitle =`${item.title.substring(0, index)}<mark>${item.title.substring(index, index + query.length)}</mark>${item.title.substring(index + query.length)}`;
        return {
        ...item,
        title: highlightedTitle
      }
    } else{
      return item
    }
    // -1 here means not found after amethod in a array . so index= !==-1 means found 
  });

  this.filteredProducts = highlightedTitle;

},

    async fetchSort() {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?sort=desc"
        );
        this.products = response.data.map((product) => ({
          ...product,
          priceBracket: this.getPriceBracket(product.price),
          checked:false ,
        }));
        console.log("log", this.products);
      } catch (error) {
        console.log(error);
      }
    },
    getPriceBracket(price) {
      if (price <= 100) {
        return "0-100";
      } else if (price > 100 && price <= 500) {
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
      const NewProducts = store.products.filter((item) => item.id !== id);
      store.products = NewProducts;
      // try {
      //   const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
      //   console.log(response.data);
      // } catch (error) {
      //     console.log(error);
      // }
    },
  },
  computed: { 

    isAllSelected(){
      return this.products.every((item) => item.checked)

      // when one of the items lis manuallhy changed to false then select checkbox changes back to unselcted is becuase of this line of code.
      // cuz it is bind with the selects checkbox so they change each other .
    } ,
    list() {
const store = useStore();
 return store.selectedCategory
    },
    categorizedProducts() {},
  },
  created() {
    this.fetchSort();
    this.groupProductsByPriceBracket();
  },
};
</script>

<style scoped>
.cursor-point {
  cursor: pointer;
}
</style>
