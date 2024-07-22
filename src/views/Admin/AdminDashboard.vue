<template>
  <section class="h-screen w-screen grid grid-rows-[auto_1fr]">
    <header
      class="w-full fixed top-0 left-0 right-0 border-b shadow-sm border-gray-200 z-30 bg-white"
    >
      <!-- Nav content -->
      <nav aria-label="menu nav" class="h-auto p-4 mx-auto bg-white w-full">
        <div class="flex items-center justify-between ml-2">
          <div class="flex items-center space-x-4 text-gray-800">
            <a href="#" aria-label="Home" class="text-2xl font-bold"
              ><i class="em em-grinning"></i> Admin</a
            >

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

    <main class="grid grid-cols-6 gap-2 w-full mt-2 h-full overflow-hidden">
<nav class="col-span-1 h-full flex flex-col mt-24 bg-white">
    <!-- Sidebar content -->
    <div class="flex  flex-col justify-center ml-3">
        <router-link  :to="{name:'AdminPage'}" class="sidebar-link text-center  flex items-center space-x-2 p-3 rounded-lg hover:bg-green-100 focus:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
            <span>Product</span>
        </router-link>

        <router-link :to="{name:'Inventory'}" href="#" class="sidebar-link  text-center flex items-center space-x-2 p-3 rounded-lg hover:bg-green-100 focus:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
            </svg>
            <span>Inventory</span>
        </router-link>
        <a href="#" class="sidebar-link flex items-center space-x-2 p-3 rounded-lg hover:bg-green-100 focus:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
            <span>User</span>
        </a>
        <a href="#" class="sidebar-link  text-center flex  items-center space-x-2 p-3 rounded-lg hover:bg-green-100 focus:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
            <span>Orders</span>
        </a>
        <a href="#" class="sidebar-link text-center  flex items-center space-x-2 p-3 rounded-lg hover:bg-green-100 focus:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-display" viewBox="0 0 16 16">
                <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145"/>
            </svg>
            <span>Devices</span>
        </a>
    </div>
</nav>


      <div
        class="col-span-5 shadow-xl bg-gray-100 border rounded-lg h-full overflow-y-auto pt-20"
      >
        <!-- Main content -->
        <!-- <AdminPage></AdminPage> -->
        <router-view class="max-w-5xl mx-auto"></router-view>
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
