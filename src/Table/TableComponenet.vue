<template>
  <div class="w-screen box-border m-0 p-0 ">
    <SearchInput 
    v-if="!printPerPage "
      :buttonFunction="prepareForPrint"
      buttonMsg="Print data"
      placeHolder="Search"
      :buttonVisible="!print"
      :rows="print"
    >
    </SearchInput>
    <PrintComponenet v-if="print"
    :tableConfig="tableConfig"></PrintComponenet>

    <TableScroll v-if="!printPerPage" 
      :tableConfig="tableConfig"
      :btn-function="editTableRow"
      ></TableScroll>
    <PrintPerPage v-if="printPerPage"></PrintPerPage>
</div>
</template>
<script>
import { useDataStore } from "@/store/table-store";
import SearchInput from "./SearchInput.vue";
import PrintComponenet from "./PrintComponenet.vue";
import TableScroll from "./TableScroll.vue";
import PrintPerPage from './PrintPerPage.vue'

export default {
  name: "TableComponenet ",
  components: {
    SearchInput,
    PrintComponenet,
    TableScroll,
    PrintPerPage
  },
  data() {
    const store = useDataStore()
    return {
      DisplayData: [],
      rowHeight: 40,
      scrollTop: 0,
      visibleCount: 0,
      scrollDebounced: null,
      searchedquery: "",
      print: null,

      isLoading: null,
       tableConfig:[
        {  tableHeader:'login'},
        { img:true ,  tableHeader:'avatar'},
        {  tableHeader:'id'},
        {  tableHeader:'link'},
        {  tableHeader:'created'},
        {  tableHeader:'repo'},
        { btn:true ,  tableHeader:'edit' , btnText:'edit'},
       ]
    };
  },
  computed: {
    store(){
        return useDataStore()
    } ,
    printPerPage(){
      return this.store.printPerPage
    } ,
    print(){
      return this.store.print
    } ,
    printData(){
      return this.store.printData
    }
  },
  methods: {
    editTableRow(id){
     const store= useDataStore()
     store.isEditing=true;
     store.editID=id
     console.log('id' , store.editID);
     
    } ,
    async prepareForPrint() {
      this.store.printPerPage = true;
      this.store.loadingMessage = "Please wait, preparing data for printing...";
    console.log('buton clicked' ,this.store.printPerPage  );
      // setTimeout(() => {}, 10000);

      // this.store.DisplayData = this.store.allData;
      // await this.$nextTick();
      // await this.waitForRender();
      // this.triggerPrintDialog();
    },

    // waitForRender() {
    //   return new Promise((resolve) => {
    //     requestAnimationFrame(() => {
    //       requestAnimationFrame(() => {
    //         resolve();
    //       });
    //     });
    //   });
    // },

    // triggerPrintDialog() {
    //   window.print();
    //   window.onafterprint = () => {
    //     this.print = false;
    //     this.store.loadingMessage = "";
    //   };
    // },
  },
  async created() {
    await this.store.fetchData();
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

