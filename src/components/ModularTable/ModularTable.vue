<template>
  <section
    ref="containerHolder"
    class="relative inset-0 no-scrollbar overflow-x-hidden overflow-y-auto box-border h-screen w-screen mx-auto border border-gray-300 bg-gray-100 p-4"
  >
    <div class="flex flex-col h-full">
      <div
        class="relative h-auto overflow-y-auto box-border"
        :style="{ height: totalHeight + 'px' }"
        @scroll="handleScroll"
         ref="scrollContainer"
      >
        <table
                    :style="{
              transform: `translateY(${scrollTop}px)`,
              maxWidth: '100%',
            }"
          class="w-full table-auto divide-y  divide-gray-300 bg-white rounded-lg shadow-md"
        >
          <thead class=" z-50 bg-gray-800 text-white">
            <tr class="h-12">
              <th
                v-for="(column, index) in tableConfig[0].config"
                :key="index"
                class="py-2 px-2 text-left text-xs font-medium uppercase tracking-wider"
              >
                {{ column.tableHead }}
              </th>
            </tr>
          </thead>
          <tbody
           

            class="bg-gray-100 overflow-y-auto"
          >
          <!-- the tablehead not sticking could be caused  ny this translate -->
            <tr
              v-for="(item, index) in visibleData"
              :key="index"
              class="border-b max-h-10 border-gray-300 hover:bg-gray-100"
            >
              <td
                v-for="(column, colIndex) in tableConfig[0].config"
                :key="colIndex"
                class="box-border overflow-x-visible text-left text-sm break-all max-h-10 max-w-[150px]"
              >
                <component
                  v-for="component in column.component"
                  :is="resolveComponent(component)"
                  v-bind="computedProps(item, column.props, component)"
                  @buttonClick="handleButtonClick"
                  :id="item.Id"
                  :eventName="column.props.eventName"
                  @inputChange="handleInputChange"
                  :isScrolling="isScrolling"
                  @optionSelected="handleOptionsSelection"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import TableText from "./TabelText.vue";
import TableButton from "./TabelButton.vue";
import TableInput from "./TabelInput.vue";
import TableAudio from "./TableAudio.vue";
import TableDropDown from "./TableDropDown.vue";
import TableIcon from "./TableIcon.vue";
import TableProgressBar from "./TableProgressBar.vue";
import TableLink from "./TabelLink.vue";
import TableImage from "./TabelImage.vue";
import Tablechart from "./Tablechart.vue";
import TableRating from "./TableRating.vue";
export default {
  emits: ["editValues", "dynamicClickHandler", "dynamicInputHandler" , "dynamicSelectionHandler"],
  components: {
    TableInput,
    TableAudio,
    TableDropDown,
    TableIcon,
    TableProgressBar,
    TableLink,
    TableImage,
    TableText,
    TableButton,
    Tablechart,
    TableRating,
  },
  props: {
    fullData: {
      type: Array,
      default: [],
    },
    tableConfig: {
      type: Array,
      required: true,
      default: [],
    },
    Loading: {
      type: Boolean,
      default: false,
    },
    DisplayData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tableDataNames: [],
      allData: this.fullData,
      Data: [],
      isScrolling: false,
      searchedquery: "",
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
    totalHeight(){
       return this.DisplayData.length * this.rowHeight
    } , 
    totalRows() {
      return this.DisplayData.length;
    },
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
    resolveComponent(componentName) {
      const components = {
        TableInput,
        TableAudio,
        TableDropDown,
        TableIcon,
        TableProgressBar,
        TableLink,
        TableImage,
        TableText,
        TableButton,
        Tablechart,
        TableRating,
      };
      return components[componentName];
    },

    computedProps(item, props, component) {
      const mappedProps = { ...props };
      switch (component) {
        case "TableImage":
          mappedProps.src = item[props.src] || column.props.src;
          break;
        case "TableText":
          mappedProps.tabelText = props.tabelText;
          break;
        case "TableLink":
          mappedProps.linkAddress =
            item[props.linkAddress] || props.linkAddress;
          break;
        case "TableImage":
          mappedProps.src = item[props.src] || props.src;
          break;
      }
      return mappedProps;
    },
    handleButtonClick(buttonEvent, eventName, id) {
      this.$emit("dynamicClickHandler", { buttonEvent, eventName, id });
    },
    handleInputChange(inputEvent, inputValue) {
      console.log("input called in the parent ", inputValue);

      this.$emit("dynamicInputHandler", { inputEvent, inputValue });
    },
    Assign() {
      this.Data = this.DisplayData;
    },
    handleScroll(event) {
      console.log("hanscroll call");

      this.scrollTop = event.target.scrollTop;
      this.isScrolling = true;
      this.updateVisibleCount();
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
    },
    handleOptionsSelection(option , event) {
      console.log('select value check in parent ' , option);
      
      this.$emit("dynamicSelectionHandler" , {option , event});
    },
    updateVisibleCount() {
      const containerHeight = this.$refs.containerHolder.clientHeight;
      this.visibleCount = Math.ceil(containerHeight / this.rowHeight) + 2;
    },
  },
  async created() {
    await this.DisplayData;
    await this.Assign();
  },
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
      console.log("DisplayData updated:", newVal);
      console.log("Data after update:", this.Data);
    },
    searchedquery(newQuery) {
      this.search();
    },
  },
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
