<template>
  <section
    ref="containerHolder"
    class="relative right-0 left-0 top-0 no-scrollbar overflow-x-clip box-border h-screen w-screen mx-auto overflow-y-auto border border-solid border-gray-200 bg-gray-50 p-4 pt-0"
   
  >

<div class="flex flex-col h-full ">
        <TableSearch 
      buttonMsg="Print Data"
      :buttonVisible="!canPrint"
      v-model="searchedquery"
      :btnFunction="handlePrint"
    ></TableSearch>

<div
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
            {{ item.tableHead }}
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
          <template v-for="(column , colIndex) in tableConfig" :key="list.tableHeader">
            <td class="px-6 box-border h-10 py-2 text-left text-sm">
                     <component :is="resolveComponent(column.component)" v-bind="items" :props="column.props"  />
          <!-- here all the  properties of the cell.props object are passed as props to the componenet  being  redndered -->
           <!-- the value of those keys now become props value -->
          <template>
          
              <slot :name="`dynamicSlot-${rowIndex}-${colIndex}`" v-bind="slotProps" >
               
                {{ slotProps.default }}
              </slot>
       
          </template>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
</div>
</div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce';
import TabelText from './TabelText.vue';
import TabelButton from './TabelButton.vue';
import TabelInput from './TabelInput.vue';
import TableAudio from './TableAudio.vue';
import TableDropDown from './TableDropDown.vue';
import TableIcon from './TableIcon.vue';
import TableProgressBar from './TableProgressBar.vue';
import TabelLink from './TabelLink.vue';
import TabelImage from './TabelImage.vue';
import Tablechart from './Tablechart.vue';
import TableRating from './TableRating.vue';
export default {
  emits: ['editValues'],
  components: {
    TabelInput ,
    TableAudio,
    TableDropDown,
    TableIcon,
    TableProgressBar ,
    TabelLink ,
    TabelImage ,
    TabelText ,
    TabelButton ,
    Tablechart ,
    TableRating

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
      searchedquery:'' ,
      scrollTop: 0,
      scrollDebounced: null,
      rowHeight: 40,
      visibleCount: null,
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
    Assign(){
        this.data=this.DisplayData
    } ,
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





<!-- SOMETHING WITH THE RENDER FUNCTION TO LOOK AT  -->
<!-- <template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(cell, colIndex) in row" :key="colIndex">
          <render-cell :type="cell.type" :props="cell.props" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent, h } from 'vue';
import TextCell from './TextCell.vue';
import ButtonCell from './ButtonCell.vue';
import CheckboxCell from './CheckboxCell.vue';
import GraphCell from './GraphCell.vue';

export default defineComponent({
  components: {
    TextCell,
    ButtonCell,
    CheckboxCell,
    GraphCell
  },
  props: {
    headers: Array,
    rows: Array
  },
  methods: {
    renderCell(type, props) {
      const componentsMap = {
        text: TextCell,
        button: ButtonCell,
        checkbox: CheckboxCell,
        graph: GraphCell
      };
      const Component = componentsMap[type] || 'div';
      return h(Component, props);
    }
  },
  render() {
    return h('table', [
      h('thead', [h('tr', this.headers.map(header => h('th', header)))]),
      h('tbody', this.rows.map((row, rowIndex) =>
        h('tr', row.map((cell, colIndex) =>
          h('td', [this.renderCell(cell.type, cell.props)])
        ))
      ))
    ]);
  }
});
</script> -->
<!-- <template>
  <td class="px-6 box-border h-10 py-2 text-left text-sm" v-html="renderCellContent(item, list)"></td>
</template>

<script>
import h from vue
export default {
  props: {
    item: Object,
    list: Object // Configuration object
  },
  methods: {
    renderCellContent(item, list) {
      if (list.img) {
        return `<img src="${item[list.tableHeader]}" alt="Item Image" class="w-8 h-8 rounded-full object-cover" />`;
      }

      if (list.btn) {
        return `<button onclick="handleClick('${item.id}')" class="bg-teal-500 rounded-lg px-3 py-1 text-white">${list.btnText}</button>`;
      }

      return `<p>${item[list.tableHeader]}</p>`;
    }
  },
  methods: {
    handleClick(id) {
      this.$emit('edit-click', id);
    }
  }
};
</script> -->
