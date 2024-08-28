<template>
  <div class="relative h-[400px] overflow-y-auto" @scroll="onscroll">
    <table class="min-w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 sticky top-0">
          <th class="px-4 py-2 border">Login</th>
          <th class="px-4 py-2 border">Avatar</th>
          <th class="px-4 py-2 border">Id</th>
          <th class="px-4 py-2 border">Link</th>
          <th class="px-4 py-2 border">Created</th>
          <th class="px-4 py-2 border">Repository</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in visibleData" :key="index" class="odd:bg-gray-50">
          <td class="px-2 py-2">{{ item.login }}</td>
          <td class="px-2 py-2">
            <img v-lazy="item.avatar_url" alt="Item Image" class="lazy-image" />
          </td>
          <td class="px-2 py-2">{{ item.id }}</td>
          <td class="px-2 py-2">{{ item.url }}</td>
          <td class="px-2 py-2">{{ item.created_at }}</td>
          <td class="px-2 py-2">{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import { useDataStore } from '@/store/table-store';

export default {
  data() {
    return {
      DisplayData: [],
      visibleData: [],
      buffer: 20,
      itemHeight: 30,
      viewportHeight: 0,
      startIndex: 0,
      debouncedOnScroll: null,
      isLoading: false,
    };
  },
  computed: {
    store() {
      return useDataStore();
    },
    totalHeight() {
      return this.store.allData.length * this.itemHeight;
    },
  },
  methods: {
   async fetchData() {
    await  this.store.fetchData();
    await   this.AllDataAssigning()
    },
    AllDataAssigning() {
      this.isLoading = this.store.isLoading;
      this.DisplayData= this.store.allData;
      console.log('display data' ,this.DisplayData);
      
      
    },
    onScroll() {
      if (this.isLoading) return;

      const scrollTop = this.$el.scrollTop;
      const startIndex = Math.max(
        0,
        Math.floor(scrollTop / this.itemHeight) - this.buffer
      );
      const endIndex = Math.min(
        this.DisplayData.length - 1,
        Math.ceil((scrollTop + this.viewportHeight) / this.itemHeight) + this.buffer
      );

        this.visibleData = this.DisplayData.slice(startIndex, endIndex + 1);
        this.startIndex = startIndex;
      
      console.log('visible' , this.visibleData);
      
    },
    setupDebouncedOnScroll() {
      this.onScroll()
      this.debouncedOnScroll = debounce(this.onScroll, 100);
    },
    handleResize() {
      this.viewportHeight = this.$el.clientHeight;
      this.debouncedOnScroll();
    },
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.viewportHeight = this.$el.clientHeight;
    this.setupDebouncedOnScroll();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style>
/* No additional styles needed; Tailwind handles the styling */
</style>
