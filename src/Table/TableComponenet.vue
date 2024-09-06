<template>
  <div class="w-screen box-border m-0 p-0">
    <SearchInput
      v-if="!printPerPage"
      :buttonFunction="prepareForPrint"
      buttonMsg="Print data"
      placeHolder="Search"
      :buttonVisible="!print"
      :rows="print"
      v-model="searchedquery"
    >
    </SearchInput>

    <PrintComponenet v-if="print" :tableConfig="tableConfig"></PrintComponenet>

    <TableScroll
      v-if="!printPerPage"
      :tableConfig="tableConfig"
      :table-datas="DisplayData"
      :isEditing="isEditing"
      :can-print="true"
      :is-print-page="true"
      v-model="editValue"
      :is-loading="false"
      :formData="formData"
      :onEditSubmit="replaceEditValues"
      :cancel-btn="onEditCancel"
      :onEditClick="editHandler"
    ></TableScroll>

    <PrintPerPage v-if="printPerPage"></PrintPerPage>
  </div>
</template>
<script>
import axios from "axios";

import { useDataStore } from "@/store/tableStore";
import SearchInput from "./TableSearch.vue";
import PrintComponenet from "./TablePrintComponenet.vue";
import TableScroll from "./TableScroll.vue";
import PrintPerPage from "./TablePrintNum.vue";

export default {
  name: "TableComponenet ",
  components: {
    SearchInput,
    PrintComponenet,
    TableScroll,
    PrintPerPage,
  },
  data() {
    const store = useDataStore();
    return {
      DisplayData: [],
      allData: [],
      editValue:{},
      formData: {},
      rowHeight: 40,
      scrollTop: 0,
      visibleCount: 0,
      scrollDebounced: null,
      searchedquery: "",
      print: null,
      searchedquery: "",
      isLoading: false,
      isEditing:false,
      tableConfig: [
        { tableHeader: "login" },
        { img: true, tableHeader: "avatar" },
        { tableHeader: "id" },
        { tableHeader: "link" },
        { tableHeader: "created" },
        { tableHeader: "repo" },
        { btn: true, tableHeader: "edit", btnText: "edit" },
      ],
    };
  },
  computed: {
    store() {
      return useDataStore();
    },
    printPerPage() {
      return this.store.printPerPage;
    },
    print() {
      return this.store.print;
    },
    printData() {
      return this.store.printData;
    },
  },
  methods: {

    search() {
      const query = this.searchedquery.toLowerCase();
      this.DisplayData = this.allData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      );
    },
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json"
        );
        this.allData = response.data.map((item) => ({
          login: item.actor.login,
          avatar: item.actor.avatar_url,
          id: item.actor.id,
          link: item.actor.url,
          created: item.created_at,
          repo: item.repo.name,
        }));
        this.DisplayData = this.allData;
      } catch (error) {
        this.error = "Failed to fetch data";
        console.error("Failed to fetch data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    onEditCancel(){
     this.isEditing=false
     this.editID=''
    },
    editHandler(id) {
      this.isEditing = true;
      this.editID = id;
      this.intitalEditFormValue()
 
    },
        replaceEditValues() {
      const item = this.allData.find((element) => (element.id === this.editID));
      console.log(item );
      
      if (item) {
        Object.assign(item, this.formData);
      }
    this.isEditing=false;
    },
        intitalEditFormValue(){
   const item = this.DisplayData.find((element) => element.id=== this.editID )
   this.formData ={...item}
   console.log('fromdata' , this.formData);
   
  
   
   
   
    } ,
    async prepareForPrint() {
      this.store.printPerPage = true;
      this.store.loadingMessage = "Please wait, preparing data for printing...";
      console.log("buton clicked", this.store.printPerPage);
      // setTimeout(() => {}, 10000);

      // this.store.DisplayData = this.store.allData;
      // await this.$nextTick();
      // await this.waitForRender();
      // this.triggerPrintDialog();
    },

  },
  async created() {
    await this.fetchData();
    this.intitalEditFormValue()
    
    // if (this.PrintData) {
    //   this.store.PrintData = true;
    // }
  },

  props: {
    Data: {
      type: Array,
      default: [],
    },
    Loading: {
      type: Boolean,
    },
    PrintData: {
      type: Boolean,
      default: false,
    },
    TableHeadData: {
      type: Array,
    },
  },
};
</script>
