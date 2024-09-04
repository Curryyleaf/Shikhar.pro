<template>
  <div class=" box-border overflow-hidden w-screen h-screen mt-14">
    <SearchInput
      :buttonFunction="prepareForPrint"
      buttonMsg="Print all data"
      placeHolder="Search"
    >
    </SearchInput>

    <PrintComponenet 
    tableConfig="tableConfig"></PrintComponenet>

    <ScrollComponenet    tableConfig="tableConfig"></ScrollComponenet>
    <!-- Print Button -->
  </div>
</template>
<script>
import { useDataStore } from "@/store/table-store";
import SearchInput from "./SearchInput.vue";
import PrintComponenet from "./PrintComponenet.vue";
import ScrollComponenet from "./ScrollComponenet.vue";

export default {
  name: "TableComponenet ",
  components: {
    SearchInput,
    PrintComponenet,
    ScrollComponenet,
  },
  data() {
    const store = useDataStore()
    return {
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
        { img:false ,  tableHeader:'Id'},
        { img:false ,  tableHeader:'link'},
        { img:false ,  tableHeader:'created'},
        { img:false ,  tableHeader:'repo'},
       ]
    };
  },
  computed: {
    store(){
        return useDataStore()
    }
  },
  methods: {
    async prepareForPrint() {
     this.store.print=true
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
