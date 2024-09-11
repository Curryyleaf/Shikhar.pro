<template>
  <ModularTable 
  :table-config="tableConfig"
  > </ModularTable>
</template>
<script>
import ModularTable from "./ModularTable.vue";
import axios from "axios";
import debounce from "lodash/debounce";
export default {
  components: {
    ModularTable,
  },
  data() {
    return {
      DisplayData: [],
      scrollDebounced: null,
      allData: [],
      error: "",
      isLoading: false,
      tableConfig: [
       {
        theme:'' ,
       config:[
                {
          component: "icon",
          tableHead: "Testhead1",
          props: { iconClass: "", class: "" },
        },
        {
          component: "rating",
          tableHead: "Testhead2",
          props: { totalStars: 4, class: "" },
        },
        {
          component: "icon",
          tableHead: "Testhead3",
          props: { iconClass: "", class: "" },
        },
        {
          component: "rating",
          tableHead: "Testhead4",
          props: { totalStars: 4, class: "" },
        },
        {
          component: "icon",
          tableHead: "Testhead5",
          props: { iconClass: "", class: "" },
        },
       ]
       } ,
       
       
      ],
    };
  },
  computed: {},
  methods: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json"
        );
        this.allData = response.data.map((item) => ({
          Login: item.actor.login,
          Avatar: item.actor.avatar_url,
          Id: item.actor.id,
          Link: item.actor.url,
          Created: item.created_at,
          Repo: item.repo.name,
        }));
        this.DisplayData = this.allData;
      } catch (error) {
        this.error = "Failed to fetch data";
        console.error("Failed to fetch data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>
