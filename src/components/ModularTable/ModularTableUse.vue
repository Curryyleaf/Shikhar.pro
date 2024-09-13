<template>
  <ModularTable 
  :table-config="tableConfig"
  :-display-data="DisplayData"
 @dynamic-click-handler="handleAllClick"
 @dynamic-input-handler="handleAllInput"
 @dynamicSelectionHandler="handleAllSelection"
 :printConfig="printConfig"

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
      printConfig: [
        { tableHeader: 'Login' },
        { img: true, tableHeader: 'Avatar' },
        { tableHeader: 'Id' },
        { tableHeader: 'Link' },
        { tableHeader: 'Created' },
        { tableHeader: 'Repo' },
        { btn: true, tableHeader: 'edit', btnText: 'edit' }
      ], 
      tableConfig: [
        {
          theme: "",
          config: [

            {
              component: ["TableImage"],
              tableHead: "Avatar",
              props: {src:"Avatar" , class: "rounded-lg " , alt:'althello'},
            },

            {
              component: ["TableText"],
              tableHead: "Text",
              props: {tabelText:"Link" , class: " " },
            },
            {
              component: ["TableLink"],
              tableHead: "Link",
              props: {linkAddress:"Repo" , class: "p-1 " },
            },
            {
              component: ["TableInput" , ],
              tableHead: "Input",
              props: {inputType:"text" ,placeholder:'test palceholder' ,  class: "p-1 " },
            },
            {
              component: ["TableButton"],
              tableHead: "Button",
              props: {btnType:"button" ,btnText:'test Btn' ,  class: "p-1 " , eventName:'SubmitButton' ,},  
            },
            {
              component: ["TableDropDown"],
              tableHead: "DropDown",
              props: {options:['option1' ,'option2' ,' option 3' , ' option 4 '] ,selcted:'option1' , theme:'light' ,  class: "p-1 " },
            },
            {
              component: ["TableRating"],
              tableHead: "Rating",
              props: {totalStars: 4 ,  },
            },
            {
              component: ["TableLink"],
              tableHead: "Link",
              props: {linkAddress:"Link"  ,  },
            },
            {
              component:[ "TableProgressBar"],
              tableHead: "Progress",
              props: {value: 50 , theme:'dark'  },
            },
            {
              component: ["TableProgressBar" , 'TableIcon' , 'TableText'],
              tableHead: "multiple",
              props: {value: 50 ,tabelText:"testtext12" ,theme:'dark' ,btnType:"submit" ,btnText:'testButton ' ,  eventName:'Multibutton' },
            },

 
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    handleAllClick(payload){
   console.log('button click checking' , payload);
   
    } ,
    handleAllInput(payload){
console.log('input value checking' , payload);

    } ,
    handleAllSelection(payload){
console.log('select value checking' , payload);

    } ,
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
