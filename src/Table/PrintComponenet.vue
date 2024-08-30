<template>
        <section v-if="print && PrintData" class="relative p-5 bg-white border border-s-gray-100 m-5">
      <table class="divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        <thead class="bg-teal-500 text-white">
          <tr v-for="(item , index) in TableList" :key="index" class="h-12">
            <th class="pl-6 py-2 text-left w-36 text-xs font-medium uppercase tracking-wider">{{ item }}</th>
          </tr>
        </thead>
        <tbody ref="printTableBody">
          <tr v-for="(item, index) in DisplayData" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
           <template v-for="column in TableList">
             <td class="pl-6 py-2 w-36 text-left text-sm">{{item[column]}}</td>
           </template>
            
          </tr>
        </tbody>
      </table>
    </section>
</template>
<script>
import { useDataStore } from '@/store/table-store';
export default {
    data(){
      return{
        
      }
    } ,
    computed:{
        store(){
            return useDataStore()
        },
  printData(){
    return this.store.PrintData
  },
  DisplayData(){
    return this.store.DisplayData
  },
  print(){
    return this.store.print
  },

    } , 
    props:{

        TableList:{
            type:Array , 
            default:[]
        }
    }
}
</script>