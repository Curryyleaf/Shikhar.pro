<template >
  <aside>
    <div class="flex box-border mt-2 mb-2">
      <input
        type="text"
        :placeholder="placeHolder"
        class="w-full box-border md:w-2/5 border-2 ml-4 border-gray-300  focus:border-teal-500 rounded-lg p-2  bg-white shadow-md transition-all duration-300"
        @input="search"
        v-model="searchedquery"
      />
      <button v-if="buttonVisible"
        @click="buttonFunction"
        class="h-10 ml-auto mr-12 p-2 bg-teal-500 text-white rounded-lg shadow-md"
      >
        {{ buttonMsg }}
      </button>
      <p v-if="rows" class="h-10 ml-auto mr-12 p-2 bg-teal-500 text-white rounded-lg shadow-md">Total no of Rows :<span class="text-black">{{ totalRows }}</span></p>
    </div>
   

    <div
      v-if="loadingMessage"
      class="text-center text-teal-500 font-semibold mt-4"
    >
      {{ loadingMessage }}
    </div>
  </aside>
</template>
<script>
import { useDataStore } from "@/store/table-store";
export default {
  data() {
    return {
      searchedquery: "",
      loadingMessage: "",
    };
  },
  methods: {
    search() {
      const store = useDataStore();
      store.searchedquery = this.searchedquery;
      store.search();
    },
  },
  computed: {
    totalRows(){
    const store = useDataStore();
    return store.DisplayData.length
    } , 
    print() {
      const store = useDataStore();
      return store.print;
    },
  },
  props: {
    buttonMsg: {
      type: String,
      default: " Print ",
    },
    placeHolder: {
      type: String,
      default: "Search",
    },
    buttonFunction: {
      type: Function,
      required: true,
    },
    buttonVisible:{
        type:Boolean ,
        default:false
    } ,
    rows:{
        type:Boolean ,
        default:false
    }
  },
};
</script>
