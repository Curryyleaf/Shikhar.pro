import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    DisplayData: [],
    searchedquery: "",
    allData: [],
    isLoading: false,
    error: null,
    PrintData: false,
    print: false,
    loadingMessage: "",
  }),
  actions: {
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
        console.log("this.allllllldata", this.allData);
        console.log("this.allllllldata2", this.DisplayData);
        this.isLoading = false;
      } catch (error) {
        this.error = "Failed to fetch data";
      } finally {
        this.isLoading = false;
      }
    },
    search() {
      const query = this.searchedquery.toLowerCase();
      this.DisplayData = this.allData.filter((item) => {
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
    loadNextChunk() {
      if (this.isLoading || this.currentIndex >= this.allData.length) return;

      const start = this.currentIndex;
      const end = start + this.chunkSize;
      this.currentIndex = end;

      return this.allData.slice(start, end);
    },
  },
});

// iven our since we will be using , memeoization , pinia getters probabaly , lazy loading and infinite scroolling with idea that load what is only in the viewport , and lodash .
