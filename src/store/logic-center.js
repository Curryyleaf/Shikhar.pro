import { defineStore } from "pinia";
import axios from "axios";

export const logicStore = defineStore("logics", {
  state: () => ({
    DisplayData: [],
    rowHeight: 40,
    scrollTop: 0,
    visibleCount: 0,
    scrollDebounced: null,
    searchedquery: "",
    print: false,
    loadingMessage: "",
  }),
  actions: {
    search() {
      const query = this.searchedquery.toLowerCase();
      this.DisplayData = this.store.allData.filter((item) => {
        return Object.values(item).some(
          (value) =>
            // this Object above  is an global object
            // this line takes the value of the object makes its array
            // some looks for match if at one element matches in the array
            value.toString().toLowerCase().includes(query)
          // vlaue represents the item being iterated over , it could be id , url , name
        );
      });
    },
  },
  getters: {},
});
