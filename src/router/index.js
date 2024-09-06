import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../components/Register.vue";
import About from "../views/About.vue";
import Cart from "../views/Cart.vue";
import AdminDashboard from "@/views/Admin/AdminDashboard.vue";
import AdminPage from "@/views/Admin/AdminProductList.vue";
import Inventory from "@/views/Inventory.vue";
import ProductList from "../views/ProductList.vue";
import ProductListSingle from "@/views/ProductListSingle.vue";
import AdminAddNewProduct from "@/views/Admin/AdminAddNewProduct.vue";


const routes = [
  {
    path: "/singleProduct/:id",
    name: "singleProduct",
    component: ProductListSingle,
  },
  {
    path: "/adminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: false, isAdmin: true },
    children: [
      {
        path: "addnewproduct",
        name: "AddNewProduct",
        component: AdminAddNewProduct,
      },
      {
        path: "inventory",
        name: "Inventory",
        component: Inventory,
      },
      {
        path: "",
        name: "AdminPage",
        component: AdminPage,
      },
    ],
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/ProductList",
    name: "ProductList",
    component: ProductList,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isAdmin: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
