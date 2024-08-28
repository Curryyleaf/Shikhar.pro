<template class="w-screen mt-24">
  <section
    class="scroll-container h-screen max-w-full mx-auto absolute border border-solid box-border m-0 p-0"
    @scroll="handleScroll"
  >
    <input
      type="text"
      placeholder="Search "
      class="w-2/5 border-2 border-solid focus:border-jade mr-auto fixed"
      @input="search"
      v-model="searchedquery"
    />
    <table class="divide-y max-w-full divide-gray-200 mt-7">
      <thead
        class="text-white rounded-t-lg z-30 fixed text-lg flex justify-center items-center text-center"
      >
        <tr class="h-12 py-10 bg-jade rounded-t-lg">
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Login
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Avatar
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Link Address
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Created
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Repository
          </th>
        </tr>
      </thead>
      <tbody
        :style="{
          height: totalHeight + 'px',
          transform: `translateY(${scrollTop}px)`,
          maxWidth: '100%',
        }"
      >
        <tr
          v-for="(item, index) in visibleData"
          :key="index"
          class="max-w-full box-border text-xs text-wrap"
        >
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
  </section>
</template>

<script>
import { useDataStore } from "@/store/table-store";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      DisplayData:[] , 
      // this cant be null at the beginning 
      rowHeight: 40,
      scrollTop: 0,
      visibleCount: 0,
      scrollDebounced: null,
      searchedquery:''
    };
  },
  computed: {
    store() {
      return useDataStore();
    },
   
    totalHeight() {
      const numberOfRows = this.store.allData.length;
      const height =
        numberOfRows > 0 ? numberOfRows * this.rowHeight : this.rowHeight;
      console.log("Total Height:", height);
      return height;
    },
    visibleData() {
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(
        startIndex + this.visibleCount,
        this.store.allData.length
      );
      console.log("Start Index:", startIndex, "End Index:", endIndex);
      return this.DisplayData.slice(startIndex, endIndex);
    },
    isLoading() {
      return this.store.isLoading;
    },
  },
  methods: {
     AllDataAssigning(){
       this.DisplayData=this.store.allData
    } ,
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
      console.log("Visible Count:", this.visibleCount); //
    },
  },
  async created() {
    await this.store.fetchData();
    this.AllDataAssigning()
    this.scrollDebounced = debounce(this.handleScroll, 200);
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
.scroll-container {
  overflow: auto;
  position: relative;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: default;
}

thead {
  display: table-header-group;
}

tbody {
  display: block;
  width: 100%;
  margin-top: 35px;
}

tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

td {
  display: table-cell;
  height: 40px;
}

.lazy-image {
  width: 34px;
  height: 34px;
}
</style>
