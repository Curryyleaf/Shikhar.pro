<template>
<aside>
        <div class="flex ">
      <input
      type="text"
      :placeholder="placeHolder"
      class="w-full md:w-2/5 border-2 border-gray-300 ml-4 focus:border-teal-500 rounded-lg p-2 mb-4 bg-white shadow-md transition-all duration-300"
      @input="search"
      v-model="searchedquery"
    />
     <button @click="buttonFunction" class=" h-10 ml-auto mr-12 p-2 bg-teal-500 text-white rounded-lg shadow-md">
     {{ buttonMsg }}
    </button>
    </div>
        <div v-if="loadingMessage" class="text-center text-teal-500 font-semibold mt-4">
      {{ loadingMessage }}
    </div>
</aside>
</template>
<script>

import { useDataStore } from '@/store/table-store';
export default{
    data(){
        return{
      searchedquery:'' ,
      loadingMessage:''
        } 
    } , 
    methods:{
       search(){
        const store=useDataStore()
       store.searchedquery=this.searchedquery
       store.search()
       } ,
       
    } ,
    computed:{
     isloading(){

     } , 
     
    },
    props:{
        buttonMsg:{
            type:String , 
            default:' Print '
        },
        placeHolder:{
            type:String,
            default:"Search"
        } ,
        buttonFunction:{
            type:Function,
            required:true
        }
    }
}
</script>