<template 
>
  <section class="flex h-screen w-screen fixed z-50 bg-opacity-50 inset-0 justify-center items-center p-6 bg-gray-50">
    <aside class="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <label for="printInfo" class="flex flex-col space-y-4">
        <p class="text-lg font-semibold text-gray-800">
          Total number of rows currently: {{ totalRows }}
        </p>
        <span class="text-gray-700">Number of rows per print:</span>
        <input
          type="number"
          id="printInfo"
          @keyup.enter.stop="printSubmit"
          class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          v-model="inputnumber"
        />
      </label>
    </aside>
  </section>
</template>

 

<script>
import { useDataStore } from "@/store/tableStore";

export default {
  emits:['printCount'] ,
  data() {
    return {
      inputnumber: "",
    };
  },
  computed: {

  },
  methods: {
    printSubmit(event) {
      this.$emit('printCount' , this.inputnumber);
      this.inputnumber=''
   console.log('where',this.inputnumber);
   

      
    },
  },
  created() {},
  props:{
    totalRows:{
      type:Number ,
      default:0
    }
  }
};
</script>
