<template>
  <section class="h-screen w-screen grid grid-rows-[auto_1fr]">
    <header
      class="w-full fixed top-0 left-0 right-0 border-b shadow-md border-gray-200 z-50 bg-white"
    >
      <!-- Nav content -->
      <nav aria-label="menu nav" class="h-auto p-4 mx-auto bg-white w-full">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-gray-800">
            <a href="#" aria-label="Home" class="text-2xl font-bold"
              ><i class="em em-grinning"></i> Admin</a
            >
            <div class="relative w-full md:w-auto">
              <input
                aria-label="search"
                type="search"
                id="search"
                placeholder="Search"
                class="w-full md:w-64 lg:w-96 text-gray-600 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-2 px-4 pl-10 transition bg-gray-100"
              />
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
          </div>
          <ul class="flex items-center space-x-6 text-gray-800">
            <li>
              <a
                class="py-2 px-4 hover:bg-gray-100 rounded-full transition"
                href="#"
                >User</a
              >
            </li>
            <li>
              <a
                class="py-2 px-4 hover:bg-gray-100 rounded-full transition"
                href="#"
                >Notifications</a
              >
            </li>
            <li class="relative">
              <button
                @click="toggleDropdown"
                class="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 rounded-full transition"
              >
                <i class="em em-robot_face"></i>
                <select>
                  more
                </select>
                <svg
                  class="h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main class="grid grid-cols-5 gap-2 w-full h-full overflow-hidden">
      <nav
        class="col-span-1 pt-11 flex border-gray-200 max-h-min  max-w-sm overflow-y-auto"
      >
        <!-- Sidebar content -->
        <div
          class="w-full divide-y divide-gray-300 pt-10 flex flex-col justify-center max-h-96 mb-4 items-center flex-wrap"
        >
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="flex flex-col justify-center px-2 mx-2"
          >
            <a
              :class="{
                'bg-transparent divide-x-2 border-transparent capitalize mt-4 flex-wrap border-b-gray-100 text-2xl tracking-widest  my-2 transition duration-300 ease-in-out shadow-custom  cursor-pointer  py-1 px-12 leading-tight text-center text-teal-500 ':
                  selectedItem === item,
                'bg-transparent border-transparent capitalize text-2xl tracking-widest  my-2 transition duration-300 ease-in-out  cursor-pointer py-1  mt-4 flex-wrap px-12   hover:text-teal-500 leading-tight text-center text-black': true,
              }"
              @click="selectItem(item)"
            >
              {{ item }}
            </a>
          </div>
        </div>
      </nav>
      <div class="col-span-4  shadow-xl bg-gray-100 border rounded-lg h-full overflow-y-auto pt-20">
        <!-- Main content -->
        <!-- <AdminPage></AdminPage> -->
        <router-view class="max-w-5xl  mx-auto"></router-view>
      </div>
    </main>
  </section>
</template>

<script>
import AdminPage from "@/components/AdminPage.vue";

export default {
  name: "AdminDashboard",
  components: {
    AdminPage,
  },
  data() {
    return {
      menuItems: ["Product", "Inventory", "User", "Reports", "Analytics"],
      selectedItem: null,
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style>
/* Add custom styles here */
</style>
