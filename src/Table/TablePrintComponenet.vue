<template>
  <section
    class=" bg-black sticky top-0 "
  >
    <header class="w-full h-16 flex items-center justify-between border-b border-gray-200 bg-black text-white">

      <div class="flex items-center mr-4">
        <button class=" text-teal-700  rounded-lg shadow-md" @click="prevChunk">
          <span class="text-lg"><</span>
        </button>
        <span class="mx-4  flex text-white justify-center  items-center text-base  text-center  font-thin">1</span>
        <button class=" text-teal-700    rounded-lg shadow-md" @click="nextChunk">
          <span class="text-lg">></span>
        </button>
        <button
          @click="startPrinting"
          class=" ml-4 px-4 py-2 bg-white text-black shadow-2xl  rounded-lg "
        >
          Print Now
        </button>
      </div>
    </header>

<div>
      <table
      class="divide-y box-border table-auto max-w-full divide-gray-200 bg-black rounded-lg shadow-md "
    >
      <thead class="bg-black sticky top-0 text-white">
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
      <tbody ref="printTableBody" class="max-w-full bg-gray-200 ">
        <tr
          v-for="(item, index) in paginatedData"
          :key="index"
          class="border-b-black border-2   h-10 box-border max-w-full border-gray-200 hover:bg-gray-100"
        >
          <template v-for="list in tableConfig">
            <td
              class="px-6 box-border h-10 py-2 text-left text-sm"
            >
              <img
                v-if="list.img"
                :src="item[list.tableHeader]"
                alt="Item Image"
                class="w-8 h-8 rounded-full "
              />
              <p v-if="!list.img">{{ item[list.tableHeader] }}</p>
              <button
                v-if="list.btn"
                @click="onEditClick(item.id)"
                class="bg-black rounded-lg px-3 py-1 text-white"
              >
                {{ list.btnText }}
              </button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
</div>

    <footer class="mt-4 p-4 bg-gray-100 text-center text-gray-600">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      startIndex: 0,
      // paginatedData: [],
      // currentChunkIndex: 0,
      printMode: false,
    };
  },
  computed: {
chunkSize(){
return this.printChunk
} ,
paginatedData() {
    const endIndex = Math.min(this.startIndex + this.chunkSize, this.DisplayData.length);
    return this.DisplayData.slice(this.startIndex, endIndex);
}

  },
  methods: {
    // printInfoAssignment() {
    //   this.chunkSize = this.store.printInfo || 50

    async startPrinting() {
      // Delay print dialog to ensure all content is rendered
      await this.$nextTick();
      await this.waitForRender();
      window.print();
      
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
      if (endIndex < this.DisplayData.length) {
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
await this.DisplayData
await this.tableConfig
console.log('data' , this.DisplayData);
console.log('tableconfigdata' , this.tableConfig);
console.log('paginateddata' , this.paginatedData);

  },
  props: {
    tableConfig: {
      type: Array,
      default: [],
    },
    DisplayData:{
      type:Array,
      default:[]
    } ,
    printChunk:{
      type:Number ,
      default:0
    }
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