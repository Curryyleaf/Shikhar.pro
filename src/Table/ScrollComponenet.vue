<template>
  <section
    ref="continerHolder"
    v-if="!print"
    class="relative box-border h-screen max-w-full mx-auto overflow-y-auto  border border-solid border-gray-200 bg-gray-50 p-4"
    @scroll="handleScroll"
  >
 
    <!-- this h-screen is very crucial without this the rendering fails  -->
    <p class="text-xs text-teal-300 underline-offset-0">
      this is not print version
    </p>
    <table
      class="divide-y w-full table-auto  divide-gray-200 bg-white rounded-lg shadow-md"
    >
      <thead class="bg-teal-500 text-white sticky top-0 z-10">
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
    
      <tbody
        ref="scrollContainer"
        :style="{
          // height: totalHeight + 'px',
          transform: `translateY(${scrollTop}px)`,
          maxWidth: '100%',
        }"
        class="bg-white box-border overflow-y-auto h-auto table-auto"
      >
        <tr
          v-for="(item, index) in visibleData"
          :key="index"
          class="border-b  border-gray-200 hover:bg-gray-100"
        >
          <template v-for="list in tableConfig">
            <td class="px-6 py-2  text-left text-sm">
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
// import { useStore } from "@/store/pinia";
import { useDataStore } from "@/store/table-store";
import debounce from "lodash/debounce";
export default {
  data() {
    // REMEMBER THAT THE DATA IS VSIBLE EVEN WHEN WE ARE DONG THIS.DATA BUT WHEN THE CHANGE IS HAPPENNG BUT NOT AFTER WARDS , MUST BE STHG RELATED WTH THE REACTIVITY 
    return {
     Data:[],
      visibleCount: 0,
      rowHeight: 40,
      scrollTop: 0,
      // we need to keep the scroll top here so it remains reactive 
      scrollDebounced: null,
   
    };
  },

  computed: {

     visibleData() {
      const store=useDataStore()
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(
        startIndex + this.visibleCount,
        store.allData.length
      );
    //    console.log('Start Index:', startIndex);
    // console.log('End Index:', endIndex);
    // console.log('Data:', this.Data);
      
     return this.Data.slice(startIndex, endIndex + 20);
      console.log('new 3' , this.visibleData);

    },
   async DisplayData() {
   const store = useDataStore()  
   
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
      return  numberOfRows * this.rowHeight 
    },
  },
    methods: {

    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
      // since the conatiner height is fixed why do we need to calll ths function on scroll ?
      this.updateVisibleCount();
      // While the container height is fixed, the number of visible rows can change as you scroll up or down. Updating the count ensures that the table displays the correct number of rows that fit within the visible area.
    },
    updateVisibleCount() {
      const containerHeight = this.$refs.continerHolder.clientHeight;
      // here $el means the root element
      this.visibleCount = Math.ceil(containerHeight / this.rowHeight) + 2;
    },
   async fetch(){
           const store = useDataStore()
           this.Data= await store.DisplayData
 
  // console.log('ddddddddddddddddddddddddd' , store.DisplayData);
  // console.log('nowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww' , this.data);
  
      
    }
  },
watch(){

} ,

  beforeDestroy() {
    if (this.scrollDebounced) {
      this.$refs.scrollContainer.removeEventListener(
        "scroll",
        this.scrollDebounced
      );
    }
  },
  async mounted() {
 const store = useDataStore();
  await store.fetchData();
  await this.fetch()

    this.scrollDebounced = debounce(this.handleScroll , 10000);
    // why is the debounce assigned to the data??
    this.$refs.scrollContainer.addEventListener("scroll", this.scrollDebounced);
    // for reactiiviity and making it avaialabe n other methods
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
<!-- <style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: default;
}

thead {
  display: table-header-group;
}

tbody {
  width: 100%;
  margin-top: 35px;
}

tr {
  display: table;
  width: 100%;
  table-layout: auto;
}
th{
  table-layout: auto;
}
td {
  height: 40px;
  
}

.lazy-image {
  width: 34px;
  height: 34px;
}
</style> -->
