<template>
  <section
    ref="containerHolder"
    v-if="!print"
    class="relative right-0 left-0 top-0 no-scrollbar overflow-x-clip box-border h-screen w-screen mx-auto overflow-y-auto border border-solid border-gray-200 bg-gray-50 p-4 pt-0"
   
  >

<div class="flex flex-col h-full">
        <TableSearch 
      buttonMsg="Print Data"
      :buttonVisible="!print"
      v-model="searchedquery"
      @buttonFunction="handlePrint"
    ></TableSearch>

<div
 class="overflow-y-auto box-border h-auto relative"
  @scroll="handleScroll"
 >
      <table
      class="divide-y w-full table-auto divide-gray-200 bg-white rounded-lg shadow-md"
    >
      <thead class="bg-teal-500 text-white sticky top-0  left-0 right-0">
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
        :style="{ transform: `translateY(${scrollTop}px)`, maxWidth: '100%' }"
        class="bg-white box-border max-w-full scroll-smooth overflow-y-auto h-auto table-auto"
      >
        <tr
          v-for="(item, index) in visibleData"
          :key="index"
          class="border-b whitespace-normal max-w-full h-10 box-border border-gray-200 hover:bg-gray-100"
        >
          <template v-for="list in tableConfig" :key="list.tableHeader">
            <td class="px-6 box-border h-10 py-2 text-left text-sm">
              <img
                v-if="list.img"
                v-lazy="item[list.tableHeader]"
                alt="Item Image"
                class="w-8 h-8 rounded-full object-cover"
              />
              <p v-if="!list.img && !list.edit">
                {{ item[list.tableHeader] }}
              </p>
              <button
                v-if="list.btn"
                @click="onEditClick(item.id)"
                class="bg-teal-500 rounded-lg px-3 py-1 text-white"
              >
                {{ list.btnText }}
              </button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
</div>
</div>
    <div v-if="isLoading" class="text-center text-teal-500 font-semibold mt-4">
      Loading...
    </div>
    <div v-if="print">
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
    </div>
        <TableEdit
      v-if="isEditing"
      :tableDataNames="tableDataNames"
      :formData="formData"
      @editSave="handleEditSave"
      @close="closeEditBox"
    />
  </section>
</template>

<script>
import TableEdit from "./TableEdit.vue";
import debounce from "lodash/debounce";
import TableSearch from "./TableSearch.vue";
import TablePrintComponenet from "./TablePrintComponenet.vue";
import TablePrintNum from "./TablePrintNum.vue";


export default {
  emits: ['editValues'],
  components: {
    TableEdit,
    TableSearch ,
    TablePrintNum ,
    TablePrintComponenet
  },
  props: {
    fullData: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Array,
      required: true,
      default: () => []
    },
    Loading: {
      type: Boolean,
      default: false
    },
    DisplayData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableDataNames: [],
      allData: this.fullData,
      Data:[],
      formData: {},
      newValue: {},
      searchedquery:'' ,
      scrollTop: 0,
      scrollDebounced: null,
      rowHeight: 40,
      visibleCount: null,
      isEditing: false,
      editID: "",
      print: false
    };
  },
  computed: {
  //    filteredData() {
  //   const query = this.searchedquery.toLowerCase();
  //   return this.DisplayData.filter((item) =>
  //     Object.values(item).some((value) =>
  //       value.toString().toLowerCase().includes(query)
  //     )
  //   );
  // } ,
    isLoading() {
      return this.Loading;
    },
    visibleData() {
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(
        startIndex + (this.visibleCount || 10),
        this.Data.length
      );
      return this.Data.slice(startIndex, endIndex);
    },
    // data() {
    //   return this.DisplayData;
    // }
  },
  methods: {
     handlePrint(){
      this.print=true
     this.$emit('Print' , )
     } ,
 Assign(){
   this.Data=this.DisplayData
    } ,
        search() {
      const query = this.searchedquery.toLowerCase();
      this.Data = this.DisplayData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      );
      console.log(this.data);
      
    },
    intitalEditFormValue() {
      const item = this.DisplayData.find(
        (element) => element.id === this.editID
      );
      this.formData = { ...item };
    },
    closeEditBox() {
      this.isEditing = false;
      this.editID = "";
      this.formData = {};
    },
    handleEditSave(payload) {
      this.newValue = payload;
      this.isEditing = false;
      this.$emit('editValues', { value: this.newValue, id: this.editID });
      this.editID = '';
    },
    onEditClick(id) {
      this.editID = id;
      this.isEditing = true;
      this.intitalEditFormValue();
    },
    AssigntableConfig() {
      const names = this.tableConfig
        .filter((item) => item.tableHeader !== "edit")
        .map((item) => item.tableHeader);
      this.tableDataNames = names;
    },
    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
      this.updateVisibleCount();
    },
    updateVisibleCount() {
      const containerHeight = this.$refs.containerHolder.clientHeight;
      this.visibleCount = Math.ceil(containerHeight / this.rowHeight) + 2;
    }
  },
 async  created(){
 await this.DisplayData
 await    this.Assign()
    console.log('data' , this.Data);
    console.log('data2' , this.DisplayData);
  } ,
  async mounted() {
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
  watch: {
  DisplayData(newVal) {
    this.Assign(); 
    console.log('DisplayData updated:', newVal);
    console.log('Data after update:', this.Data);
  } ,
    searchedquery(newQuery) {
    this.search();  
  }
  }
};
</script>