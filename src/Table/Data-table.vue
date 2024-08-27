<template>
  <section class="scroll-container" @scroll="handleScroll">
    <table class="divide-y divide-gray-200 table-fixed">
      <thead class="bg-jade text-white">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Login</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Avatar</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Link Address</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Repository</th>
        </tr>
      </thead>
      <tbody :style="{ height: totalHeight + 'px', transform: `translateY(${scrollTop}px)` }">
        <tr v-for="item in visibleData" :key="item.actor.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ item.actor.login }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <img v-lazy="item.actor.avatar_url" alt="Item Image" class="lazy-image" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.actor.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.actor.url }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.created_at }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.repo.name }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="isLoading">Loading...</div>
  </section>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useDataStore } from '@/store/table-store';

export default defineComponent({
  data() {
    return {
      rowHeight: 40, // Fixed row height
      containerHeight: 600, // Height of the container
      scrollTop: 0,
    };
  },
  computed: {
    store() {
      return useDataStore();
    },
    totalHeight() {
      return this.store.allData.length * this.rowHeight;
    },
    visibleCount() {
      return Math.ceil(this.containerHeight / this.rowHeight);
    },
    visibleData() {
      const startIndex = Math.floor(this.scrollTop / this.rowHeight);
      return this.store.allData.slice(startIndex, startIndex + this.visibleCount);
    },
    isLoading() {
      return this.store.isLoading;
    },
  },
  methods: {
    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
    },
  },
  async created() {
    await this.store.fetchData();
  },
});
</script>

<style scoped>
.scroll-container {
  height: 600px; 
  overflow: auto;
  position: relative;
}

table {
  width: 100%; 
  border-collapse: collapse; 
}

thead {
  display: table-header-group; 
}

tbody {
  display: block; 
  width: 100%;
}

tr {
  display: table; 
  width: 100%;
  table-layout: fixed; 
}

td {
  display: table-cell; 
  height: 40px; 
}

.lazy-image {
  width: 34px;
  height: 34px;
}
</style>
