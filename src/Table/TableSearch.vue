<template >
  <aside class="max-w-full  bg-black box-border">
    <div class="flex box-border pt-4 bg-black pb-4">
      <input
        type="text"
        :placeholder="placeHolder"
        class="w-full box-border md:w-1/3 bg-black-400  focus:border-teal-500 rounded-lg p-2   shadow-md transition-all duration-300"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
      />
      <button v-if="buttonVisible"
        @click="btnFunction"
        class="h-10 ml-auto mr-4 p-2 bg-black-400 text-gray-300 rounded-lg shadow-md"
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