<template>
  <section
    ref="continerHolder"
    v-if="!print"
    class="relative h-screen max-w-full mx-auto overflow-auto border border-solid border-gray-200 bg-gray-50 p-4"
    @scroll="handleScroll"
  >
 
    <!-- this h-screen is very crucial without this the rendering fails  -->
    <p class="text-xs text-teal-300 underline-offset-0">
      this is not print version
    </p>
    <table
      class="divide-y w-full divide-gray-200 bg-white rounded-lg shadow-md"
    >
      <thead class="bg-teal-500 text-white sticky top-0 z-10">
        <tr class="h-12">
          <th
            v-for="(item, index) in tableConfig"
            :key="index"
            class="pl-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
          >
            {{ item.tableHeader }}
          </th>
         
        </tr>
      </thead>
       <th v-for="list in DisplayData">
            <p>{{ list.repo }}</p>
          </th>
      <tbody
        ref="scrollContainer"
        :style="{
          height: totalHeight + 'px',
          transform: `translateY(${scrollTop}px)`,
          maxWidth: '100%',
        }"
        class="bg-white overflow-auto"
      >
        <tr
          v-for="(item, index) in visibleData"
          :key="index"
          class="border-b overflow-auto border-gray-200 hover:bg-gray-100"
        >
          <template v-for="list in tableConfig">
            <td class="px-2 py-2 w-32 text-center text-sm">
              <img
                v-if="list.img"
                v-lazy="item[list.tableHeader]"
                alt="Item Image"
                class="w-10 h-10 rounded-full object-cover"
              />
              <p v-if="!list.img">{{ item[list.tableHeader] }}</p>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <div v-if="isLoading" class="text-center text-teal-500 font-semibold mt-4">
      Loading...
    </div>
  </section>
</template>
<script>
import { useStore } from "@/store/pinia";
import { useDataStore } from "@/store/table-store";
import debounce from "lodash/debounce";
export default {
  data() {
    
    return {
      
      visibleCount: 0,
      rowHeight: 40,
      scrollTop: 0,
      scrollDebounced: null,
   
    };
  },
  methods: {
 async   visibleData() {
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(
        startIndex + this.visibleCount,
        this.store.allData.length
      );
      
     return this.DisplayData.slice(startIndex, endIndex);
      console.log('new 3' , this.visibleData);

    },
    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
      this.updateVisibleCount();
    },
    updateVisibleCount() {
      const containerHeight = this.$refs.continerHolder.clientHeight;
      // here $el means the root element
      this.visibleCount = Math.ceil(containerHeight / this.rowHeight) + 2;
    },
    fetch(){
           const store = useDataStore()
  console.log('now' , this.DisplayData);
  console.log('now2' , this.visibleData);
  
      
    }
  },
  computed: {

   async DisplayData() {
   const store = useDataStore()
  console.log('now' , store.DisplayData);
  console.log('now2' , this.DisplayData);
  
      return store.DisplayData;
    },
   
    print() {
        const store =useDataStore()
      return store.print;
    },
    isLoading() {
        const store=useDataStore()
      return store.isLoading
    },

    totalHeight() {
        const store=useDataStore()
      const numberOfRows = store.allData.length;
      return numberOfRows > 0 ? numberOfRows * this.rowHeight : this.rowHeight;
    },
  },
  beforeDestroy() {
    if (this.scrollDebounced) {
      this.$refs.scrollContainer.removeEventListener(
        "scroll",
        this.scrollDebounced
      );
    }
  },
  async created() {
  this.fetch()
  },
  async mounted() {
    
    this.scrollDebounced = debounce(this.handleScroll);
    this.$refs.scrollContainer.addEventListener("scroll", this.scrollDebounced);
    this.updateVisibleCount();
  },
  props: {
    tableConfig: {
      type: Array,
      required: true,
      default: [],
    },
  },
};
</script>
