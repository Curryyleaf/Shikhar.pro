<template>
  <section
    ref="containerHolder"
    class="relative right-0 left-0 top-0 no-scrollbar overflow-x-clip box-border h-screen w-screen mx-auto overflow-y-auto border border-solid border-gray-200 bg-gray-50 p-4 pt-0"
   
  >

<div v-if="!isPrinting" class="flex flex-col h-full ">
        <TableSearch 
      buttonMsg="Print Data"
      :buttonVisible="!canPrint"
      v-model="searchedquery"
      :btnFunction="handlePrint"
    ></TableSearch>

<div
v-if="!isPrinting"
 class="overflow-y-auto box-border h-auto relative"
 :style="{height:'50000px'}"
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
                :href="item[list.tableHeader]"
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
        <TableEdit
      v-if="isEditing"
      :tableDataNames="tableDataNames"
      :formData="formData"
      @editSave="handleEditSave"
      @close="closeEditBox"
    
    />

    <!-- print -->
<TablePrintNum
  @printCount="handlePrintCount"
  :totalRows="totalRows"
v-if="canPrint">
</TablePrintNum>

<TablePrintComponenet
v-if="isPrinting"
:DisplayData="DisplayData"
:tableConfig="tableConfig"
:printChunk="this.printNum"
>

</TablePrintComponenet>
  </section>
</template>

<script>
import TableEdit from "./TableEdit.vue";
import debounce from "lodash/debounce";
import TablePrintNum from "./TablePrintNum.vue";
import TableSearch from "./TableSearch.vue";
import TablePrintComponenet from "./TablePrintComponenet.vue";



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
      printNum:'' ,
      isPrinting:false,
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
      canPrint: false
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
  totalRows(){
 return this.DisplayData.length
  } ,
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
        printSubmit(event) {
      event.preventDefault();
this.canPrint=false
      this.inputnumber = "";
      console.log('checking ' ,store.print);
      
    },
     handlePrint(){
      console.log('hiii print here ');
      this.canPrint=true

     } ,
     handlePrintCount(payload){
      this.printNum=payload
      this.canPrint=false
      this.isPrinting=true
    console.log('here',this.isPrinting);
    
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