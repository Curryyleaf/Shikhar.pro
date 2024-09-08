<template>
  <div class="w-screen box-border m-0 p-0">
    <TableScroll
      v-if="!printPerPage"
      :tableConfig="tableConfig"
      :DisplayData="DisplayData"
      :Loading="isLoading"
      :fullData="allData"
      @editValues="handleEditValuesUpdate"
    />
  </div>
</template>

<script>
import axios from 'axios';
import TableScroll from "./TableScroll.vue";

export default {
  name: "TableComponent",
  components: {
    TableScroll,
  },
  data() {
    return {
      DisplayData: [],
      allData: [],
      error: '',
      isLoading: false,
      tableConfig: [
        { tableHeader: 'login' },
        { img: true, tableHeader: 'avatar' },
        { tableHeader: 'id' },
        { tableHeader: 'link' },
        { tableHeader: 'created' },
        { tableHeader: 'repo' },
        { btn: true, tableHeader: 'edit', btnText: 'edit' }
      ],
      printPerPage: false
    };
  },
  methods: {
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
          repo: item.repo.name
        }));
        this.DisplayData = this.allData;
      } catch (error) {
        this.error = "Failed to fetch data";
        console.error("Failed to fetch data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    prepareForPrint() {
      this.printPerPage = true;
    },
    handleEditValuesUpdate(payload) {
      console.log('nowowowowowow' , payload);
      
      const { value, id } = payload;
      const item = this.DisplayData.find(element => element.id === id);
      if (item) {
        Object.assign(item, value);
      }
    }
  },
  async created() {
    await this.fetchData();
  }
};
</script>
