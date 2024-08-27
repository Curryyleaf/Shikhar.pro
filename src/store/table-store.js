import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    allData: [], // Entire dataset
    chunkSize: 50, // Number of items per chunk
    currentIndex: 0,
    currentchunk:[],// Index to keep track of the last loaded chunk
    isLoading: false, // Loading state
    error: null, // Error state
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json"
        );
        this.allData = response.data;
        // Initialize with the first chunk
        
      } catch (error) {
        this.error = "Failed to fetch data";
      } finally {
        this.isLoading = false;
      }
    },
    loadNextChunk() {
      if (this.isLoading || this.currentIndex >= this.allData.length) return;
   
    
      const start = this.currentIndex;
      const end = start + this.chunkSize;
      this.currentIndex = end; 
    
      
     return this.allData.slice(start, end);
    },
  },
  getters: {
    currentChunk() {
      console.log('loading current chunk ');
      
      return this.loadNextChunk() || [];
    },
    hasMoreData() {
      return this.currentIndex < this.allData.length;
    },
  },
});


// iven our since we will be using , memeoization , pinia getters probabaly , lazy loading and infinite scroolling with idea that load what is only in the viewport , and lodash . 