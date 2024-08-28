import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    allData: [], 
    chunkSize: 50, 
    currentIndex: 0,
    currentchunk:[],
    isLoading: false, 
    error: null, 
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
            avatar_url: item.actor.avatar_url,
            id: item.actor.id,
            url: item.actor.url,
          
          created_at: item.created_at,
          
            name: item.repo.name,
          
        }));
        
        console.log('this.allllllldata' , this.allData);
         this.isLoading = false;
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