<template>
    

<div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
  <div class="flex w-full border  justify-between items-center">
    <h3 class="ml-28 text-4xl p-2">Products list</h3>
    <button
     class="bg-blue-500 text-white py-2 px-4 rounded"
     @click="navigateToAddNewItem"
     >Add a new item</button>
  </div>
    <table
    v-for="product in products"
     class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Product 
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>

        <tbody>
            <tr class="bg-white border-b  hover:bg-gray-50 ">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-10 overflow-hidden ">
                    {{ product.title }}
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    {{ product.category }}
                </td>
                <td class="px-6 py-4">
                    {{ product.price }}
                </td>
                <td class="px-6 py-4">
                    <button @click="deleteProduct(product.id)" href="#" class="font-medium text-blue-600  hover:underline">Delete</button>
                </td>

            </tr>
        
        </tbody>
    </table>
</div>


</template>
<script>
import axios from 'axios';
import { useStore } from '@/store/pinia';
export default{
    methods:{
        navigateToAddNewItem(){
            this.$router.push('/addnewproduct')
        } ,
      async  deleteProduct(id){
        const store=useStore();
       const NewProducts= store.products.filter(item=> item.id !== id)
       store.products=NewProducts
            // try {
            //   const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
            //   console.log(response.data);
            // } catch (error) {
            //     console.log(error);
            // }

        }

    } ,
    computed:{
        products(){
            const store = useStore()
            return store.products
        }
    }

}
</script>