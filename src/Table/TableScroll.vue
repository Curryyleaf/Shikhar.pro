<template>
  <section

    ref="continerHolder"
    v-if="!print"
    class="relative right-0 left-0 top-0 box-border h-screen w-screen mx-auto overflow-y-auto border border-solid border-gray-200 bg-gray-50 p-4 pt-0"
    @scroll="handleScroll"
  >
    <!-- this h-screen is very crucial without this the rendering fails  -->
<TableEdit v-if="isEditing"
:tableDataNames="tableDataNames" >

</TableEdit>
    <table
      class="divide-y w-full table-auto divide-gray-200 bg-white rounded-lg shadow-md"
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
          transform: `translateY(${scrollTop}px)`,
          maxWidth: '100%',
        }"
        class="bg-white box-border max-w-full scroll-smooth overflow-y-auto h-auto table-auto"
      >
        <tr
          v-for="(item, index) in visibleData"
          :key="index"
          class="border-b whitespace-normal max-w-full h-10 box-border border-gray-200 hover:bg-gray-100"
        >
          <template v-for="list in tableConfig">
            <td class="px-6  box-border h-10 py-2 text-left text-sm">
              <img
                contenteditable="true"
                v-if="list.img"
                v-lazy="item[list.tableHeader]"
                alt="Item Image"
                class="w-8 h-8 rounded-full object-cover"
              />
              <!-- <a v-if="list.link" > </a> -->
              <p v-if="!list.img && !list.edit">
                {{ item[list.tableHeader] }}
              </p>
              <button
                v-if="list.btn"
                @click="btnFunction(item.id)"
                class="bg-teal-500 rounded-lg px-3 py-1 text-white "
              >
                {{ list.btnText }}
              </button>
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
import { useDataStore } from "@/store/table-store";
import debounce from "lodash/debounce";
import TableEdit from "./TableEdit.vue";

export default {
  components: {
    TableEdit,
  },
  data() {
    return {
      tableDataNames: [],
      scrollTop: 0,
      scrollDebounced: null,
      rowHeight: 40,
      printData: "",
      visibleCount: null,
    };
  },
  computed: {
    printinfoAssign() {
      this.store.printInfo = this.printData;
    },
    isEditing(){
     return this.store.isEditing
    } ,
    store() {
      return useDataStore();
    },
    visibleData() {
      const store = useDataStore();
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(startIndex + this.visibleCount || 10);
      console.log("visiblecount", this.visibleCount);

      console.log("startIndex", startIndex);
      console.log("lastIndex", endIndex);

      return store.DisplayData.slice(startIndex, endIndex + 10);
    },
    printPerPage() {
      return this.store.printPerPage;
    },
    print() {
      return this.store.print;
    },
    isLoading() {
      return this.store.isLoading;
    },
  },
  methods: {
    AssigntableConfig() {
     const names = this.tableConfig
  .filter(item => item.tableHeader !== 'edit') 
  .map(item => item.tableHeader);
      console.log("names", names);
      this.tableDataNames = names;
    },

    handleScroll(event) {
      const store = useDataStore();
      const scrollTop = event.target.scrollTop;
      this.scrollTop = scrollTop;
      this.updateVisibleCount();
      //   const containerHeight = this.$refs.continerHolder.clientHeight;
      //   const visibleCount = Math.ceil(containerHeight / this.store.rowHeight) + 2;
      // store.scrollTop=scrollTop
      //  store.visibleCount=visibleCount
    },
    updateVisibleCount() {
      const containerHeight = this.$refs.continerHolder.clientHeight;
      const visibleCount =
        Math.ceil(containerHeight / this.store.rowHeight) + 2;

      this.visibleCount = visibleCount;
    },
    // async fetch() {
    //   await this.store.handleScroll(this.scrollTop);
    // },
  },
  async mounted() {
    // await this.fetch();
    this.AssigntableConfig();
    this.scrollDebounced = debounce(this.handleScroll, 1000);
    this.$refs.scrollContainer.addEventListener("scroll", this.scrollDebounced);
    this.updateVisibleCount();
  },
  beforeDestroy() {
    if (this.scrollDebounced) {
      this.$refs.scrollContainer.removeEventListener(
        "scroll",
        this.scrollDebounced
      );
    }
  },
  props: {
    tableConfig: {
      type: Array,
      required: true,
      default: () => [],
    },
    btnFunction: {
      type: Function,
      default: () => {},
    },
  },
};
</script>