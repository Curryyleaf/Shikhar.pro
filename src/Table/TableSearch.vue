<template >
  <aside class="max-w-full box-border">
    <div class="flex box-border mt-2 mb-2">
      <input
        type="text"
        :placeholder="placeHolder"
        class="w-full box-border md:w-2/5 border-2  border-gray-300  focus:border-teal-500 rounded-lg p-2  bg-white shadow-md transition-all duration-300"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
      />
      <button v-if="buttonVisible"
        @click="btnFunction"
        class="h-10 ml-auto  p-2 bg-teal-500 text-white rounded-lg shadow-md"
      >
        {{ buttonMsg }}
      </button>
      
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

export default {
  data() {
    return {
      searchedquery: "",
      loadingMessage: "",
    };
  },
  methods: {
  },
  // computed: {
  //   totalRows(){
  //   const store = useDataStore();
  //   return store.DisplayData.length
  //   } , 
  //   print() {
  //     const store = useDataStore();
  //     return store.print;
  //   },
  // },
  props: {
    modelValue:{
     type:String ,
     default:''
    } ,
    buttonMsg: {
      type: String,
      default: " Print ",
    },
    placeHolder: {
      type: String,
      default: "Search",
    },
    btnFunction: {
      type: Function,
    },
    buttonVisible:{
        type:Boolean ,
        default:false
    } ,

  },
};
</script>