<template>
  <div class="w-screen ">
    <SearchInput 
    v-if="!printPerPage && printData"
      :buttonFunction="prepareForPrint"
      buttonMsg="Print data"
      placeHolder="Search"
      :buttonVisible="!print"
      :rows="print"
    >
    </SearchInput>

    <PrintComponenet v-if="print"
    :tableConfig="tableConfig"></PrintComponenet>

    <ScrollComponenet v-if="!printPerPage"   :tableConfig="tableConfig"></ScrollComponenet>
    <PrintPerPage v-if="printPerPage"></PrintPerPage>
</div>
</template>
<script>
import { useDataStore } from "@/store/table-store";
import SearchInput from "./SearchInput.vue";
import PrintComponenet from "./PrintComponenet.vue";
import ScrollComponenet from "./ScrollComponenet.vue";
import PrintPerPage from './PrintPerPage.vue'

export default {
  name: "TableComponenet ",
  components: {
    SearchInput,
    PrintComponenet,
    ScrollComponenet,
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
        { img:false ,  tableHeader:'login'},
        { img:true ,  tableHeader:'avatar'},
        { img:false ,  tableHeader:'id'},
        { img:false ,  tableHeader:'link'},
        { img:false ,  tableHeader:'created'},
        { img:false ,  tableHeader:'repo'},
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
