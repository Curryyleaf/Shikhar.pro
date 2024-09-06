<template>
  <section class="flex justify-center items-center p-6 bg-gray-50">
    <aside class="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <label for="printInfo" class="flex flex-col space-y-4">
        <p class="text-lg font-semibold text-gray-800">
          Total number of rows currently: {{ totalRows }}
        </p>
        <span class="text-gray-700">Number of rows per print:</span>
        <input
          type="number"
          id="printInfo"
          @keyup.enter="printSubmit"
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
  name: "numberofpage",
  data() {
    return {
      inputnumber: "",
    };
  },
  computed: {
    totalRows(){
        const store = useDataStore();
        return store.DisplayData.length
    }
  },
  methods: {
    printSubmit(event) {
      const store = useDataStore();
      event.preventDefault();

      store.printInfo = this.inputnumber;
      this.inputnumber = "";
      store.printPerPage = false;
      store.print = true;
      console.log('checking ' ,store.print);
      
    },
  },
  created() {},
};
</script>
