<template>
  <section
    ref="continerHolder"
    v-if="!print"
    class="relative box-border h-screen max-w-full  overflow-y-auto border border-solid border-gray-200 bg-gray-50 p-4"
    @scroll="handleScroll"
  >
    <p class="text-xs text-teal-300 underline-offset-0">
      This is not print version
    </p>
    <table class="divide-y w-full table-auto divide-gray-200 bg-white rounded-lg shadow-md">
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
        :style="{ transform: `translateY(${scrollTop}px)` }"
        class="bg-white box-border overflow-y-auto h-auto table-auto"
      >
        <tr
          v-for="(item, index) in visibleData"
          :key="index"
          class="border-b h-auto border-gray-200 hover:bg-gray-100"
        >
          <template v-for="list in tableConfig">
            <td class="px-6 py-2 text-left text-sm">
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
import { useDataStore } from '@/store/table-store';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      scrollTop:0 ,
      scrollDebounced: null,
    };
  },
  computed: {
    store(){
return useDataStore()
    } ,
    visibleData() {
      return this.store.visibleData;
    },
    DisplayData() {
      return this.store.DisplayData;
    },
    print() {
      return this.store.print;
    },
    isLoading() {
      return this.store.isLoading;
    },
    totalHeight() {
      return this.store.totalHeight;
    },
  },
  methods: {
    handleScroll(event) {
      const store=useDataStore()
      const scrollTop = event.target.scrollTop;
    store.scrollTop=scrollTop
      this.updateVisibleCount()
    },
    updateVisibleCount() {
    
      
      const containerHeight = this.$refs.continerHolder.clientHeight;
      const visibleCount = Math.ceil(containerHeight / this.store.rowHeight) + 2;
      this.store.visibleCount=visibleCount
        console.log('hiiii' , this.store.visibleCount);
   
    },
    async fetch() {
      await this.store.handleScroll(this.scrollTop)
    },
  },
  async mounted() {

    await this.fetch();
    this.scrollDebounced = debounce(this.handleScroll, 100);
    this.$refs.scrollContainer.addEventListener('scroll', this.scrollDebounced);
    this.updateVisibleCount();

    
  },
  beforeDestroy() {
    if (this.scrollDebounced) {
      this.$refs.scrollContainer.removeEventListener('scroll', this.scrollDebounced);
    }
  },
  props: {
    tableConfig: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

