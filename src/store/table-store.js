import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    DisplayData: [],
    rowHeight: 40,
    scrollTop: 0 ,
    visibleCount: 0,
    searchedquery: "",
    allData: [],
    isLoading: false,
    error: null,
    printInfo:'', 
    printData: false,
    printPerPage:false ,
    print: false,
    loadingMessage: "",
  }),
  getters: {
        visibleData() {
    
console.log('visibleData');

      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      const endIndex = Math.min(startIndex + this.visibleCount || 10);
      console.log("visiblecount", this.visibleCount);

      console.log("startIndex", startIndex);
      console.log("lastIndex", endIndex);
      console.log(
        "DisplayData",
       this.DisplayData
      );

      return this.DisplayData.slice(startIndex , startIndex + 50)
    },
  },
  actions: {

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
    search() {
      const query = this.searchedquery.toLowerCase();
      this.DisplayData = this.allData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      );
    },
    // searching(query) {
    //   this.searchedquery = query;
    //   this.search();
    // },
  },
});
