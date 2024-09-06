import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    DisplayData: [],
    rowHeight: 40,
    scrollTop: 0,
    visibleCount: 0,
    searchedquery: "",
    allData: [],
    isLoading: false,
    error: null,
    printInfo: "",
    printData: false,
    printPerPage: false,
    print: false,
    loadingMessage: "",
    editValues: [],
    editID: "",
    isEditing: false,
  }),
  getters: {

  },
  actions: {

    setEditValues(values) {
      this.editValues = values;
    },
    totalHeight() {
      return this.allData.length * this.rowHeight;
    },
    // async handleScroll(scrollTop) {
    //   this.scrollTop = scrollTop;

    // },
    // updateVisibleCount(count) {
    //   console.log('count' , count);

    //   this.visibleCount = count;
    // },


    // searching(query) {
    //   this.searchedquery = query;
    //   this.search();
    // },
  },
});
