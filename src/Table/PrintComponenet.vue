<template >
  <section
    class="relative box-border  w-screen h-screen top-0 right-0 left-0 p-5 pt-0  bg-white border border-s-gray-100  mt-0"
  >

    <table
      class="divide-y  box-border table auto max-w-full  divide-gray-200 bg-white rounded-lg shadow-md"
    >
      <thead class="bg-teal-500 sticky top-0 text-white">
        <tr class="h-12">
          <th
            v-for="(item, index) in tableConfig"
            :key="index"
            class="pl-6 py-2 px-6 text-left text-xs font-medium uppercase tracking-wider"
          >
            {{ item.tableHeader }}
          </th>
        </tr>
      </thead>
      <tbody ref="printTableBody" class="max-w-full">
        <tr
          v-for="(item, index) in paginatedData"
          :key="index"
          class="border-b h-10 box-border max-w-full border-gray-200 hover:bg-gray-100"
        >
          <template v-for="list in tableConfig">
            <td
              class="px-6  box-border h-10 py-2 text-left text-sm"
            >
              <img
                v-if="list.img"
                v-lazy="item[list.tableHeader]"
                alt="Item Image"
                class="w-8 h-8 rounded-full object-cover"
              />
              <p v-if="!list.img">{{ item[list.tableHeader] }}</p>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
        <aside class="flex " v-if="printData">
      <div class="flex justify-center p-2 w-1/2 ml-auto text-2xl items-center">
        <button class="text-jade mr-3" @click="prevChunk"><</button>
        <span
          class="w-6 h-6 flex justify-center items-center text-base p-2 text-center bg-gray-100 font-thin"
          >1</span
        >
        <button class="text-jade ml-3" @click="nextChunk">></button>

        <button
         @click="startPrinting" class="h-10 ml-auto mr-12 justify-center flex items-center text-lg p-2 bg-rose-300 text-white rounded-lg shadow-md"
        >
          Print Now
        </button>
      </div>
    </aside>
  </section>
</template>
<script>
import { useDataStore } from "@/store/table-store";
export default {
  data() {
    return {
      data: [],
      startIndex: 0,
      chunkSize: null,
      // paginatedData: [],
      // currentChunkIndex: 0,
      printMode: false,
    };
  },
  computed: {
    store() {
      return useDataStore();
    },

    printData() {
      return this.store.printData;
    },
    // currentChunk() {
    //   return this.paginatedData[this.currentChunkIndex] || [];
    // },
paginatedData() {
    const endIndex = Math.min(this.startIndex + this.chunkSize, this.store.DisplayData.length);
    return this.store.DisplayData.slice(this.startIndex, endIndex);
}

  },
  methods: {
    // printInfoAssignment() {
    //   this.chunkSize = this.store.printInfo || 50
    // },
    async fetch() {
      this.data = this.store.allData;
      console.log("dataaaaaaaaaaa", this.data);
    },
    async startPrinting() {
      
      const store =useDataStore()
      this.currentChunkIndex = 0;
      store.printData = false;

      // Delay print dialog to ensure all content is rendered
      await this.$nextTick();
      await this.waitForRender();
      window.print();
      store.printData=true
      console.log(this.printData);
      
    },
    waitForRender() {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });
    },
    prevChunk() {
      console.log("hi prev here ");

      if (this.startIndex > 0) {
        this.startIndex = Math.max(this.startIndex - this.chunkSize, 0);
      }
    },
    nextChunk() {
      console.log('next');
      
      const endIndex = this.startIndex + this.chunkSize;
      if (endIndex < this.store.allData.length) {
        this.startIndex += this.chunkSize;
      }
    },
  },
  //   function paginateData(data, rowsPerPage) {
  //   const pages = [];
  //   for (let i = 0; i < data.length; i += rowsPerPage) {
  //     pages.push(data.slice(i, i + rowsPerPage));
  //   }
  //   return pages;
  // }

  // const paginatedData = paginateData(largeDataArray, 100);

  async created() {
    const store = useDataStore();

    await store.fetchData();
    await this.fetch();
    store.printData=true
 this.chunkSize = this.store.printInfo || 50

    // this.paginatedData()
    console.log(this.chunkSize);
  },
  props: {
    tableConfig: {
      type: Array,
      default: [],
    },
  },
};
</script>

<!-- 
To print a very large table in Vue 3 without relying on server-side rendering, virtualization, or pagination, and to avoid crashes, delays, or lag, consider these strategies:

1. **Optimize Data Representation**: Use efficient data structures and avoid excessive computation within the Vue component that renders the table. Pre-process data if possible to minimize on-the-fly calculations.

2. **Leverage Browser Capabilities**: Use the browser's built-in printing functionality effectively. You might prepare the table in a printable format, like an HTML table with CSS styles specifically for printing, to ensure it's rendered efficiently.

3. **Use Web Workers**: If the table generation involves complex computations, use Web Workers to offload processing from the main thread, ensuring the UI remains responsive.

4. **Simplify Table Styles**: Minimize complex styles and avoid heavy CSS effects that can slow down rendering. Keep the table’s CSS simple and optimized for performance.

5. **Break into Smaller Chunks**: If possible, break the table into smaller chunks that can be rendered separately. Although this doesn't involve pagination or virtualization, it helps manage rendering load.

6. **Ensure Efficient Rendering**: Make sure your Vue components are optimized for performance. Avoid unnecessary re-renders and use Vue's lifecycle hooks wisely to manage rendering efficiently.

7. **Test on Different Devices**: Test the table rendering on various devices and browsers to ensure it performs well across different environments.

By focusing on these areas, you can improve the performance and responsiveness of rendering and printing large tables in Vue 3. -->
