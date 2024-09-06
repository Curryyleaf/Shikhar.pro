<template>
  <section

    ref="continerHolder"
    v-if="!print"
    class="relative right-0 left-0 top-0 no-scrollbar  overflow-x-clip  box-border h-screen w-screen mx-auto overflow-y-auto border border-solid border-gray-200 bg-gray-50 p-4 pt-0"
    @scroll="handleScroll"
  >

  <!-- Edit from here  -->
  <div v-if="isEditing">
      <div class="fixed inset-0 bg-gray-200  bg-opacity-80  flex items-center justify-center z-50">
    <div class="bg-white border-2 border-gray-300  rounded-lg shadow-lg w-full max-w-xl">
      <div class="flex justify-between bg-teal-500  items-center border-b border-teal-300 p-4">
        <h4 class="text-white text-lg font-semibold">Table Edit Box</h4>
        <button class="text-teal-600 hover:text-teal-800" @click="closeModal">&times;</button>
      </div>
      <form @submit.prevent="saveChanges" class="p-6 ">
        <div class="grid  text-black grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          <div v-for="item in tableEditNames" :key="item.id" class="flex flex-col">
            <label :for="item" class="block  mb-2">
              <p class="font-medium pl-2">{{ item }}</p>
              <input
              ref="InputField"
              @focus="$event.target.select()"
                :type="item"
                id="name"
                v-model="formData[item]"
                :placeholder="item"
                required
                class="w-full p-2  box-border gap-y-6 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>
        <div class="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            @click="onEditSubmit"
            class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Save
          </button>
          <button
            type="button"
            class="bg-gray-200 text-teal-600 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            @click="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
    <!-- this h-screen is very crucial without this the rendering fails  -->

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
import { useDataStore } from "@/store/tableStore";
import debounce from "lodash/debounce";


export default {

  data() {
    return {
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

    store() {
      return useDataStore();
    },
    visibleData() {
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(startIndex + this.visibleCount || 10);
      console.log("visiblecount", this.visibleCount);

      console.log("startIndex", startIndex);
      console.log("lastIndex", endIndex);

      return this.tableDatas.slice(startIndex, endIndex + 10);
    },
    printPerPage() {
      return this.store.printPerPage;
    },
    closeEditBox() {
      this.isEditing = false;
      this.editID = "";
      this.formData = {};
    },
    isLoading() {
      return this.store.isLoading;
    },
    tableEditNames() {
return this.tableConfig.filter(item => item.tableHeader !== 'edit').map(item => item.tableHeader);

    },
  },
  methods: {

    handleScroll(event) {
      const scrollTop = event.target.scrollTop;
      this.scrollTop = scrollTop;
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
    // await this.fetch();
    await this.formData

  
  
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
    modelValue:{
      type:Object,
      default:{}
    },
    tableConfig: {
      type: Array,
      required: true,
      default: () => [],
    },
    onEditClick: {
      type: Function,
      default: () => {},
    },
    cancelBtn: {
      type: Function,
      default: () => {},
    },
    onEditSubmit: {
      type: Function,
      default: () => {},
    },
    tableDatas:{
      type:Array ,
      default:[]
    } ,
    isLoading:{
      type:Boolean ,
      default:false
    } ,
    isEditing:{
      type:Boolean ,
      default:false ,
      required:true
    } ,
    canPrint:{
      type:Boolean ,
      default:false ,
      required:true
    } ,
    isPrintPage:{
      type:Boolean ,
       default:false   
       } ,
    
     formData:{
      type:Object ,
      default:{}
     }  

       
  },

};
</script>