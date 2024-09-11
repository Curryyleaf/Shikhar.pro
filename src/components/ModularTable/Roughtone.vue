
<!-- HIHIIHIHIHIHIHIHIHIHIHIHIH -->
<template>
  <table>
    <thead>
      <tr>
        <th v-for="items in tableConfig" :key="header">{{ items.tableHead }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(items, rowIndex) in DisplayData" :key="rowIndex">
        <td v-for="(column, colIndex) in tableConfig" :key="colIndex">
          <component :is="resolveComponent(column.component)" v-bind="items" :props="column.props"  />
          <!-- here all the  properties of the cell.props object are passed as props to the componenet  being  redndered -->
           <!-- the value of those keys now become props value -->
          <template>
          
              <slot :name="`dynamicSlot-${rowIndex}-${colIndex}`" v-bind="slotProps" >
               
                {{ slotProps.default }}
              </slot>
       
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TabelText from './TabelText.vue';
import TabelButton from './TabelButton.vue';
import TabelInput from './TabelInput.vue';
import Tabellink from './TabelLink.vue';

const componentsMap = {
  TabelText,
  ButtonCell,
  CheckboxCell,
  GraphCell
};

export default {
  components: {
    TextCell,
    ButtonCell,
    CheckboxCell,
    GraphCell
  },
  props: {
    headers: Array,
    rows: Array,
  },
  methods: {
    resolveComponent(componentName) {
   
      return componentsMap[componentName] || null; 
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
