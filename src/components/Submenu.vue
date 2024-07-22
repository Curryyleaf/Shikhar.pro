<template>
    <aside >
  <div class="relative">
             <div @click="toggleDropDown"  class="flex justify-center  relative cursor-pointer items-center">
              <span class="inline-flex" >Category</span>
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
              
             <div  v-if="dropDown" @mouseleave="closeDropdown"  class="absolute flex-col top-6 font-sans text-sm font-normal bg-white border-b-2 shadow-lg border-gray-100">
              <button @click="sorting('category')">Ascending</button>
               <button  @click="sorting('category')" >Descending</button>
             </div>

            </div>
    </aside>

</template>
<script>
export default{
    methods:{
    display(){
        const rec = this.$ref.container;
        cons
    }
    } ,
    props:{
        
    }
}
</script>