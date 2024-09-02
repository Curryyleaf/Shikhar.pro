<template>
  <section
    v-if="print && PrintData"
    class="relative p-5 bg-white border border-s-gray-100 m-5"
  >
    <table class="divide-y divide-gray-200 bg-white rounded-lg shadow-md">
      <thead class="bg-teal-500 text-white">
        <tr v-for="(item, index) in TableList" :key="index" class="h-12">
          <th
            class="pl-6 py-2 text-left w-36 text-xs font-medium uppercase tracking-wider"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody ref="printTableBody">
        <tr
          v-for="(item, index) in DisplayData"
          :key="index"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <template v-for="column in TableList">
            <td class="pl-6 py-2 w-36 text-left text-sm">{{ item[column] }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import { useDataStore } from "@/store/table-store";
export default {
  data() {
    return {};
  },
  computed: {
    store() {
      return useDataStore();
    },
    printData() {
      return this.store.PrintData;
    },
    DisplayData() {
      return this.store.DisplayData;
    },
    print() {
      return this.store.print;
    },
  },
  props: {
    TableList: {
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
