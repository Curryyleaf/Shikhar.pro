<template>
  <div
    class="relative w-11/12 p-3 border rounded-lg overflow-x-auto bg-white shadow-md md:max-w-screen-xl sm:max-w-screen-sm"
  >
    <div
      class="block md:flex md:w-auto w-full bg-white p-6 justify-between items-center"
    >
      <div class="relative w-full md:w-auto">
        <input
          v-model="searchedQuery"
          @input="seacrhedItems"
          type="search"
          placeholder="Search"
          class="w-full md:w-64 lg:w-96 text-gray-600 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-2 px-4 pl-10 transition bg-gray-100"
        />
        {{ searchedQuery }}
        <div class="absolute top-2 left-3">
          <svg
            class="fill-current text-gray-600 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="flex items-center ml-4 md:ml-56">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-funnel"
          viewBox="0 0 16 16"
        >
          <path
            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"
          />
        </svg>
        <button class="ml-2 md:text-lg text-sm py-2" @click="sortingAscending">
          {{ ascending ? "A to Z" : "Z to A" }}
        </button>

        <button
          class="ml-2 md:text-lg text-sm md:ml-4"
          @click="fetchSort"
        ></button>
      </div>

      <button
        class="bg-blue-500 text-white py-2 px-4 rounded ml-3 md:text-lg text-sm md:ml-auto"
        @click="navigateToAddNewItem"
      >
        Add a new item
      </button>
    </div>
    <ProductTable
      :tableHeadConfig="tableHeadConfig"
      :products="products"
      :visibleColumns="visibleColumns"
      :closeDropdown="closeDropdown"
      :isAllSelected="isAllSelected"
      :toggleAllSelect="toggleAllSelect"
      :selectItem="selectItem"
      :sorting="sorting"
      :deleteProduct="deleteProduct"
      :toggleDropDown="toggleDropDown"
      :groupProductsByPriceBracket="groupProductsByPriceBracket"
      :PriceBracket="PriceBracket"
      :togglePrice="togglePrice"
      :closePriceToggle="closePriceToggle"
    />
  </div>
</template>

<!-- we were doing like this before  JUST IN CASE
    showPrice showId showCategory showTitle showDeleteBtn showAllSelectBox -->
<script>
import axios from "axios";
import { useStore } from "@/store/pinia";
import Submenu from "@/components/Submenu.vue";
import ProductTable from "@/components/ModularTable.vue";

export default {
  components: {
    Submenu,
    ProductTable,
  },
  data() {
    return {
      tableHeadConfig: [
        {
          title: "Product",
          sortby: "title",
          sortable: true,
          show: false,
          id: 1,
          priceGrouping: false,
        },
        {
          title: "Category",
          sortby: "category",
          sortable: true,
          show: false,
          id: 2,
          priceGrouping: false,
        },
        {
          title: "Price",
          sortby: "price",
          sortable: false,
          show: false,
          id: 3,
          priceGrouping: false,
        },
        {
          title: "ID",
          sortby: "id",
          sortable: false,
          show: false,
          id: 4,
          priceGrouping: false,
        },
      ],
      visibleColumns: [true, true, true, true, true, true],

      columns: [{}, {}, {}],
      // it was my idea that i didnot do but eeping fro refrence just ini case if i do in future
      searchedQuery: "",
      ascending: false,
      products: [],
      PriceBracket: ["0-100", "100-500", "500+"],
    };
  },
  computed: {},
  methods: {
    selectItem(id) {
      this.products.forEach((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
      });
    },
    togglePrice(id) {
      this.tableHeadConfig = this.tableHeadConfig.map((item) => {
        if (item.id === id) {
          return { ...item, priceGrouping: !item.priceGrouping };
        }
        return item;
      });
    },

    closePriceToggle() {
      this.tableHeadConfig.priceGrouping = false;
      console.log("heyu");
    },
    toggleAllSelect(event) {
      const isChecked = event.target.checked;
      this.products.forEach((item) => (item.checked = isChecked));
    },
    toggleDropDown(id) {
      this.tableHeadConfig = this.tableHeadConfig.map((item) => {
        if (item.id === id) {
          return { ...item, show: !item.show };
        }
        return item;
      });
    },
    closeDropdown(id) {
      console.log("hiii");
      this.tableHeadConfig = this.tableHeadConfig.map((item) => {
        if (item.id === id) {
          return { ...item, show: false };
        }
        return item;
      });
    },
    async groupProductsByPriceBracket(bracket = "all") {
      if (bracket === "all") {
        return;
      } else {
        const filteredProducts = this.products.filter(
          (product) => product.priceBracket === bracket
        );

        filteredProducts.sort((a, b) => a.price - b.price);

        this.products = filteredProducts;
      }
    },
    sorting(parameter) {
      this.ascending = !this.ascending;
      this.products.sort((a, b) => {
        if (parameter === "id") {
          const valueA = a[parameter];
          const valueB = b[parameter];
          return this.ascending ? valueA - valueB : valueB - valueA;
        } else {
          const valueA = a[parameter].toUpperCase();
          const valueB = b[parameter].toUpperCase();
          return this.ascending
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
      });
    },
    sortingAscending() {
      this.ascending = !this.ascending;
      this.products.sort((a, b) => {
        const valueA = a.title.toUpperCase();
        const valueB = b.title.toUpperCase();

        if (this.ascending) {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });
    },
    seacrhedItems() {
      if (this.searchedQuery === "") {
        this.fetchSort();
      }
      const query = this.searchedQuery.toLowerCase();
      const newItems = this.products.filter((items) => {
        return items.title.toLowerCase().includes(query);
      });

      const highlightedTitle = newItems.map((item) => {
        const index = item.title.toLowerCase().indexOf(query);
        if (index !== -1) {
          const highlightedTitle = `${item.title.substring(
            0,
            index
          )}<mark>${item.title.substring(
            index,
            index + query.length
          )}</mark>${item.title.substring(index + query.length)}`;
          return {
            ...item,
            title: highlightedTitle,
          };
        } else {
          return item;
        }
      });

      this.products = highlightedTitle;
    },
    async fetchSort() {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?sort=desc"
        );
        this.products = response.data.map((product) => ({
          ...product,
          priceBracket: this.getPriceBracket(product.price),
          checked: false,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    getPriceBracket(price) {
      if (price <= 100) {
        return "0-100";
      } else if (price > 100 && price <= 500) {
        return "100-500";
      } else {
        return "500+";
      }
    },
    navigateToAddNewItem() {
      this.$router.push({ name: "AddNewProduct" });
    },
    async deleteProduct(id) {
      const NewProducts = this.products.filter((item) => item.id !== id);
      this.products = NewProducts;
    },
  },
  computed: {
    isAllSelected() {
      return this.products.every((item) => item.checked);
      // every methos return true if all functionns return true and returns false if one function returns false
    },
  },
  created() {
    this.fetchSort();
    this.groupProductsByPriceBracket();
  },
};
</script>

<style scoped>
.cursor-point {
  cursor: pointer;
}
</style>