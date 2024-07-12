import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getConfigValue } from "@/components/config";

export const useStore = defineStore("main", {
  state: () => ({
    products: [],
    categories: [],
    temporaryCategories: [],
    selectedCategory: [],
    // temporaryCategoryHolder:"All" ,
    // cart: JSON.parse(localStorage.getItem("cart")) || [],
    cart: [],
  }),
  getters: {
    // Example of a getter if needed
    // filteredProducts(state) {
    //   if (!state.selectedCategory || state.selectedCategory === "All") {
    //     return state.products;
    //   }
    //   return state.products.filter(
    //     (product) => product.category === state.selectedCategory
    //   );
    // },
  },
  actions: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          `${getConfigValue("myUrl")}/products/categories`
        );
        this.selectedCategory = response.data;
        console.log("catgeoriess now ", response);
      } catch (error) {}
    },

    async fetchProducts() {
      try {
        const response = await axios.get(`${getConfigValue('myUrl')}/products`);

        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchCart() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // Handle scenario where token is not available

        const decodedToken = jwtDecode(token);
        const response = await axios.get(
          `${getConfigValue("myUrl")}/carts/user/${decodedToken.sub}`
        );
        const cartItems = response.data[0].products.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
        this.cart = [...this.cart.flat(), ...cartItems];
        localStorage.setItem("cart", JSON.stringify(this.cart));
        console.log("Cart fetched successfully:", this.cart);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    },
    async fetchCategoryProducts(category = 'All') {
      // const savedCategory = localStorage.getItem('category')

      if (category === "All" ) {
        await this.fetchProducts();
        this.categories = this.products;
        console.log("all" , this.categories);
      } else {
        this.loading = true;
        try {
          const response = await axios.get(
            `${getConfigValue("myUrl")}/products/category/${category}`
          );
          this.temporaryCategories = response.data;

          this.categories = response.data;
          this.temporaryCategories = [];
          console.log("productsfromcategiryinPinia", response);
        } catch (error) {
          console.log("error from now", error);
        }
      }
    }
,
    addToCart(productId, quantity) {
      console.log("addToCart being used");
      const cartItem = this.cart.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        this.cart = [...this.cart, { productId, quantity }];
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      console.log("Items in cart after adding:", this.cart);
    },

    removeFromCart(productId) {
      const index = this.cart.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        console.log("Item removed from cart:", productId);
      }
    },
    incrementQuantity(productId) {
      const cartItem = this.cart.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.quantity++;
        console.log("Quantity incremented for item:", productId);
      }
    },
    decrementQuantity(productId) {
      const cartItem = this.cart.find((item) => item.productId === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        console.log("Quantity decremented for item:", productId);
      }
    },
    getProductById(productId) {
      return this.products.find((product) => product.id === productId);
    },
    getProductPriceById(productId) {
      const product = this.products.find((product) => product.id === productId);
      return product ? product.price : 0;
    },
    // setCategory(category) {
    //  this.selectedCategory = category;
    // },
  },
});
