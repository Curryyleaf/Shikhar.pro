<template>
  <div class="w-full">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead
        class="text-base text-gray-700 rounded-lg pb-4 bg-gray-50 uppercase font-thin"
      >
        <tr class="mb-4">
          <!-- why is this in upper -->
          <th class="pl-3 w-4">
            <div class="flex items-center justify-center">
              <input
               id="select-all-checkbox"
               type="checkbox"
                :checked="isAllSelected"
                @change="toggleAllSelect"
                class="toggleAllSelect w-4 h-4"
              />
              <!-- HERERERERERERER -->
              <p class=" ml-1 flex justify-center items-center p-0 m-0"></p>
            </div>
          </th>

          <!-- product  -->
          <th
            v-for="(items, index) in tableHeadConfig"
            :key="index"
            class=" togglePrice px-6"
            @click.prevent.stop="togglePrice(items.id)"
          >
            <div v-if="visibleColumns[index]" class="relative">
              <div 
                class="flex justify-center  relative cursor-pointer items-center"
              >
                <span @click="toggleDropDown(items.id) " class="toggleDropDown pr-4 inline-flex tracking-wider">{{
                  items.title
                }}</span>
                <svg

                  v-if="items.sortable"
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

              <div
                v-if="items.show && items.sortable"
                @mouseleave="closeDropdown(items.id)"
                class="closeDropDown absolute flex flex-col top-6 right-0 left-8 font-sans text-sm font-normal bg-white border-b-2 w-24 shadow-lg border-gray-100"
              >
                <button
                  @click="sorting(`${items.sortby}`)"
                  class="sorting py-2 hover:bg-gray-100"
                >
                  Ascending
                </button>
                <button
                  @click="sorting(`${items.sortby}`)"
                  class="sorting py-2 hover:bg-gray-100"
                >
                  Descending
                </button>
              </div>

              <div  class="flex h-full w-full justify-center items-center relative">
             
              <div v-if="items.priceGrouping && items.id===3" @mouseleave="togglePrice(items.id) " class="togglePrice absolute flex-col top-0 font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
                <div v-for="(bracket, index) in PriceBracket" :key="index" @click="groupProductsByPriceBracket(bracket)" class=" groupProductsByPriceBracket hover:bg-gray-100 py-2 w-24 px-3">
                  <button>{{ bracket }}</button>
                </div>
              </div>
            </div>
            </div>
          </th>
          <th><span>Action</span></th>
          <!-- Category -->
        </tr>
      </thead>

      <tbody class="mt-4">
        <tr
          v-for="(product, index) in products"
          :key="product.id"
          @click.stop="selectItem(product.id)"
          class="selectItem  bg-white hover:bg-gray-50 max-h-16 min-h-12"
        >
          <td class="  py-1 flex  pl-4 pr-[0.6rem] text-center  items-center ">
            <input
              :id="product.id"
              type="checkbox"
              v-model="product.checked"
              class=" secondInput w-3 h-4 text-blue-600 bg-gray-50 focus:ring-blue-500"
            />
            <!-- AND HERERER -->
            <span class=""></span>
          </td>
         <template v-for="column in tableHeadConfig" :key="column.id" class="flex justify-center items-center">
           <td class=" tracking-wide font-medium pl-9  max-w-72 ">
      
             <span v-html="product[column.sortby]"  class=" table-rows w-full"></span>

          </td>
      
         </template>
             <td>
            <button @click="deleteProduct(product.id)" class="hover:text-blue-500 text-blue-400 font-medium tracking-wide" >Delete</button>
          </td>
          <!-- even if you add flex to td it wil have same problem even if you wrap td with another dic or templated -->

          <!-- product title -->

          <!-- product -->
          <!-- when we were using the index from loop  it was causing to show only 5 table data for each columns  why ?
           ini every loop they would have been given same index 11111 , 22222 , 33333 , 44444 , 55555 mkaing only upto index 5 visible . -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return{
     error:''
    }
  } ,
  props: {

    tableHeadConfig: {
      type: Array,
      default:[
         { title: " ", sortby: " ", sortable: true, show: false, id: 1, priceGrouping: false },
      { title: " ", sortby: " ", sortable: true, show: false, id: 2, priceGrouping: false },
      { title: " ", sortby: " ", sortable: false, show: false, id: 3, priceGrouping: false },
      { title: " ", sortby: " ", sortable: false, show: false, id: 4, priceGrouping: false },
      { title: " ", sortby: " ", sortable: false, show: false, id: 5, priceGrouping: false },
      ]
    },
  togglePrice: {
    type: Function,
    default:()=> Void
    
  },
  closePriceToggle: {
    type: Function,
    default:()=>{
      // logic
    }
  },
    products: {
      type: Array,
      default:[]
    },

    visibleColumns: {
      type:Array ,
      default:[]

    },

    toggleDropDown: {
      type: Function,
      default:()=>{
        // logic
      }
    },
    isAllSelected: {
      type: Boolean,
      default:false
    },
    toggleAllSelect: {
      type: Function,
      default:()=>{

      } ,
    },
    selectItem: {
      type: Function,
      default:()=>{
        // logic
      }
    },

    sorting: {
      type: Function , 
      default:()=>{
        // logic
      },
    
    },
    deleteProduct: {
      type: Function,
      default:()=>{
        // logic
      }
    },

    groupProductsByPriceBracket: {
      type: Function,
      default:()=>{
        // logic
      }
    },
    PriceBracket: {
      type: Array,
    },
    closeDropdown: {
      type: Function,
      default:()=>{
        // logic
      }
    },
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
  created() {},
};
</script>

<style></style>
