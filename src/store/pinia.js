import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useStore = defineStore("main", {
  state: () => ({
    products: [],
    categories: [],
    selectedCategory: "All",
    // cart: JSON.parse(localStorage.getItem("cart")) || [],
    cart:[]
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
    async fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
        this.categories = [
          ...new Set(response.data.map((item) => item.category)),
        ];
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
          `https://fakestoreapi.com/carts/user/${decodedToken.sub}`
        );
        const cartItems = response.data[0].products.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
        this.cart = [...this.cart.flat() , ...cartItems]
        localStorage.setItem("cart", JSON.stringify(this.cart));
        console.log("Cart fetched successfully:", this.cart);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    },
    addToCart(productId , quantity) {
      console.log("addToCart being used");
      const cartItem = this.cart.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.quantity+= quantity;
      } else {
        this.cart = [...this.cart, {  productId, quantity }];
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
    setCategory(category) {
      this.selectedCategory = category;
    },
  },
});
