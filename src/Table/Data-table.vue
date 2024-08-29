<template>
  <div class="w-screen mt-14">
    <div class="flex ">
      <input
      type="text"
      placeholder="Search"
      class="w-full md:w-2/5 border-2 border-gray-300 ml-4 focus:border-teal-500 rounded-lg p-2 mb-4 bg-white shadow-md transition-all duration-300"
      @input="search"
      v-model="searchedquery"
    />
     <button @click="prepareForPrint" class=" h-10 ml-auto mr-12 p-2 bg-teal-500 text-white rounded-lg shadow-md">
      Print All Data
    </button>
    </div>
    <!--  position: relative;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  margin: 20px; -->
    <div v-if="loadingMessage" class="text-center text-teal-500 font-semibold mt-4">
      {{ loadingMessage }}
    </div>
    
    <!-- Print View -->
    <section v-if="print" class="relative p-5 bg-white border border-s-gray-100 m-5">
      <table class="divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        <thead class="bg-teal-500 text-white">
          <tr class="h-12">
            <th class="pl-6 py-2 text-left w-36 text-xs font-medium uppercase tracking-wider">Login</th>
            <th class="px-4 py-2 text-left w-32 text-xs font-medium uppercase tracking-wider">Avatar</th>
            <th class="px-4 py-2 text-xs text-center font-medium uppercase tracking-wider w-28">ID</th>
            <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Link Address</th>
            <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Created</th>
            <th class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Repository</th>
          </tr>
        </thead>
        <tbody ref="printTableBody">
          <tr v-for="(item, index) in DisplayData" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="pl-6 py-2 w-36 text-left text-sm">{{ item.login }}</td>
            <td class="px-2 py-2 w-32 text-center text-sm">
              <img v-lazy="item.avatar_url" alt="Item Image" class="w-10 h-10 rounded-full object-cover" />
            </td>
            <td class="px-2 py-2 text-center text-sm w-28">{{ item.id }}</td>
            <td class="pl-14 py-2 text-sm">{{ item.url }}</td>
            <td class="px-2 py-2 text-center text-sm">{{ item.created_at }}</td>
            <td class="px-2 py-2 text-left text-sm">{{ item.name }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    
    <!-- Normal View -->
    <section v-if="!print"
      class="relative  h-screen max-w-full mx-auto overflow-auto border border-solid border-gray-200 bg-gray-50 p-4"
      @scroll="handleScroll"
    >
    <!-- this h-screen is very crucial without this the rendering fails  -->
    <p class="text-xs text-teal-300 underline-offset-0">this is not print version </p>
      <table class="divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        <thead class="bg-teal-500 text-white sticky top-0 z-10">
          <tr class="h-12">
            <th class="pl-6 py-2 text-left w-36 text-xs font-medium uppercase tracking-wider">Login</th>
            <th class="px-4 py-2 text-left w-32 text-xs font-medium uppercase tracking-wider">Avatar</th>
            <th class="px-4 py-2 text-xs text-center font-medium uppercase tracking-wider w-28">ID</th>
            <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Link Address</th>
            <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Created</th>
            <th class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Repository</th>
          </tr>
        </thead>
        <tbody
         :style="{
          height: totalHeight + 'px',
          transform: `translateY(${scrollTop}px)`,
          maxWidth: '100%',
        }" class="bg-white overflow-auto">
          <tr v-for="(item, index) in visibleData" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="pl-6 py-2 w-36 text-left text-sm">{{ item.login }}</td>
            <td class="px-2 py-2 w-32 text-center text-sm">
              <img v-lazy="item.avatar_url" alt="Item Image" class="w-10 h-10 rounded-full object-cover" />
            </td>
            <td class="px-2 py-2 text-center text-sm w-28">{{ item.id }}</td>
            <td class="pl-14 py-2 text-sm">{{ item.url }}</td>
            <td class="px-2 py-2 text-center text-sm">{{ item.created_at }}</td>
            <td class="px-2 py-2 text-left text-sm">{{ item.name }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoading" class="text-center text-teal-500 font-semibold mt-4">Loading...</div>
    </section>
    
    <!-- Print Button -->
   
  </div>
</template>
<script>
import { useDataStore } from "@/store/table-store";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      DisplayData: [],
      rowHeight: 40,
      scrollTop: 0,
      visibleCount: 0,
      scrollDebounced: null,
      searchedquery: '',
      print: false,
      loadingMessage: ''
    };
  },
  computed: {
    store() {
      return useDataStore();
    },
    totalHeight() {
      const numberOfRows = this.store.allData.length;
      return numberOfRows > 0 ? numberOfRows * this.rowHeight : this.rowHeight;
    },
    visibleData() {
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(startIndex + this.visibleCount, this.store.allData.length);
      return this.DisplayData.slice(startIndex, endIndex);
    },
    isLoading() {
      return this.store.isLoading;
    },
  },
  methods: {
    async prepareForPrint() {
      this.print = true;
      this.loadingMessage = 'Please wait, preparing data for printing...';

      setTimeout(() => {
        
      }, 10000);

      this.DisplayData = this.store.allData;
      await this.$nextTick();
      await this.waitForRender();
      this.triggerPrintDialog();
    },

    waitForRender() {
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });
    },

    triggerPrintDialog() {
      window.print(); 
      window.onafterprint = () => {
        this.print = false;
        this.loadingMessage = '';

      };
    },

    search() {
      const query = this.searchedquery.toLowerCase();
      this.DisplayData = this.store.allData.filter(item => {
        return Object.values(item).some(value =>
          // this line takes the value of the object makes its array
        // some looks for match if at one element matches in the array 
          value.toString().toLowerCase().includes(query)
           // vlaue represents the item being iterated over , it could be id , url , name
        );
      });
    },

    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
      this.updateVisibleCount();
    },

    updateVisibleCount() {
      const containerHeight = this.$el.clientHeight;
      this.visibleCount = Math.ceil(containerHeight / this.rowHeight) + 2;
    },

    AllDataAssigning() {
      this.DisplayData = this.store.allData;
    },
  },
  async created() {
    await this.store.fetchData();
    this.AllDataAssigning();
    this.scrollDebounced = debounce(this.handleScroll, );
    this.$el.addEventListener("scroll", this.scrollDebounced);
    this.updateVisibleCount();
  },
  beforeDestroy() {
    if (this.scrollDebounced) {
      this.$el.removeEventListener("scroll", this.scrollDebounced);
    }
  },
};
</script>

<style scoped>


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
  table-layout: fixed;
}

td {
  height: 40px;
}

.lazy-image {
  width: 34px;
  height: 34px;
}


</style>
