import { computed } from "vue";
import { useDataStore } from "@/store/tableStore";

export function useData() {
  const store = useDataStore();
  return {
    printData: computed(() => store.PrintData),
    displayData: computed(() => store.DisplayData),
    isPrint: computed(() => store.print),
  };
}

//   computed: {
    // printData() {
    //   return this.store.PrintData;
    // },
    // displayData() {
    //   return this.store.DisplayData;
    // },
    // print() {
    //   return this.store.print;
    // }