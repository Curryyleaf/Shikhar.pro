import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../components/Register.vue";
import About from "../views/About.vue";
import Categories from "../views/Categories.vue";
import Cart from "../views/Cart.vue";
import SingleProduct from "../views/SingleProduct.vue";
import AdminDashboard from "@/views/Admin/AdminDashboard.vue";
import AddNewProduct from "@/components/AddNewProduct.vue";
import AdminPage from "@/components/AdminPage.vue";
import Inventory from "@/components/Inventory.vue";

const routes = [
  {
    path: "/product/:id",
    name: "product",
    component: SingleProduct,
  },
  {
    path: "/adminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        path: "addnewproduct",
        name: "AddNewProduct",
        component: AddNewProduct,
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
    path: "/categories",
    name: "Categories",
    component: Categories,
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
    meta: {  isAdmin: true },
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
