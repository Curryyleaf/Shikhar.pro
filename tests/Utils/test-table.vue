<template>
  <section class="h-auto w-screen box-border m-0 p-0 overflow-x-hidden">
    <!-- Fixed table header -->
    <div class="relative h-full">
      <!-- Fixed header -->
      <table class="min-w-full divide-y divide-gray-200 table-fixed">
      <div class="sticky top-0 z-10 bg-jade text-white">
          <thead>
            <tr>
              <th class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Login</th>
              <th class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Avatar</th>
              <th class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Link Address</th>
              <th class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Created</th>
              <th class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Repository</th>
            </tr>
          </thead>
      
      </div>
     
        <tbody class="bg-white divide-y divide-gray-200">

      
      <div class="overflow-y-auto m-0m p-0 "> 
        <DynamicScroller
          :items="itemsToDisplay"
          :min-item-size="itemHeight"
          class="w-full"
        >
          <template #default="{ item, index, active }">
                <tr class="hover:bg-gray-100  hover:text-jade w-full" >
                  <td class="px-12 py-2 whitespace-nowrap">{{ item.actor.login }}</td>
                  <td class="px-12 py-2whitespace-nowrap">
                    <img v-lazy="item.actor.avatar_url" alt="Item Image" class="w-5 h-5 object-cover" />
                  </td>
                  <td class="px-12 py-2 whitespace-nowrap">{{ item.actor.id }}</td>
                  <td class="px-12 py-2 whitespace-nowrap">{{ item.actor.url }}</td>
                  <td class="px-12 py-2 whitespace-nowrap">{{ item.created_at }}</td>
                  <td class="px-12 py-2 whitespace-nowrap">{{ item.repo.name }}</td>
                </tr>
              </template>
            </DynamicScroller>
          </div>
        </tbody>
  </table>
    </div>

    <div v-if="isLoading" class="text-center p-4">Loading...</div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { useDataStore } from '@/store/tableStore';
import { DynamicScroller } from 'vue-virtual-scroller';

export default defineComponent({
  components: {
    DynamicScroller,
  },
  data() {
    return {
      store: useDataStore(),
      itemHeight: 50, // Set this to the height of your rows
    };
  },
  computed: {
    itemsToDisplay() {
      console.log(this.store.currentChunk);
      
      return this.store.currentChunk;

    },
    isLoading() {
      return this.store.isLoading;
    },
  },
  methods: {
    handleScroll(event) {
      const container = event.target;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10
      ) {
        if (this.store.hasMoreData && !this.store.isLoading) {
          this.store.loadNextChunk();
        }
      }
    },
  },
  async created() {
    await this.store.fetchData();
  },
});
</script>

<style scoped>
/* Scoped styles are omitted since Tailwind CSS is being used */
</style>

<template class="h-screen w-screen">
  <section class="scroll-container" @scroll="handleScroll">
    <table class="divide-y divide-gray-200 table-fixed">
      <thead class="bg-jade text-white">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">Login</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">Avatar</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">Link Address</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">Created</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">Repository</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <RecycleScroller
          :items="itemsToDisplay"
          :item-size="50"
          :key-field="id"
          v-slot="{item}"
          class="scroller"
        >
          
            <tr class="hover:text-jade">
              <td class="px-6 py-4 whitespace-nowrap">{{ item.actor.login }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img v-lazy="item.actor.avatar_url" alt="Item Image" class="lazy-image" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ item.actor.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.actor.url }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.created_at }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.repo.name }}</td>
            </tr>
        
        </RecycleScroller>
      </tbody>
    </table>
    <div v-if="isLoading" class="text-center p-4">Loading...</div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { useDataStore } from "@/store/table-store";
import { RecycleScroller } from "vue-virtual-scroller";

export default defineComponent({
  components: {
    RecycleScroller,
  },
  data() {
    return {
      store: useDataStore(),
    };
  },
  computed: {
    itemsToDisplay() {
      return this.store.currentChunk;
    },
    isLoading() {
      return this.store.isLoading;
    },
  },
  methods: {
    handleScroll(event) {
      const container = event.target;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10
      ) {
        if (this.store.hasMoreData && !this.store.isLoading) {
          this.store.loadNextChunk();
        }
      }
    },
  },
  async created() {
    await this.store.fetchData();
  },
});
</script>

<style>
.scroll-container {
  height: 600px;
  overflow: auto;
}

.scroller {
  display: table;
}

.lazy-image {
  width: 34px;
  height: 34px;
}
</style>



