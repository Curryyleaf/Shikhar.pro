<template>
  <div>
    <!-- Print Button -->
    <button @click="startPrinting">Print Data</button>

    <!-- Print View -->
    <section v-if="printMode" class="print-section">
      <table class="print-table">
        <thead>
          <tr v-for="(header, index) in headers" :key="index">
            <th>{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in currentChunk" :key="index">
            <td v-for="(column, colIndex) in headers" :key="colIndex">{{ row[column] }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination Controls -->
      <div v-if="paginatedData.length > 1">
        <button @click="prevChunk" :disabled="currentChunkIndex === 0">Previous</button>
        <button @click="nextChunk" :disabled="currentChunkIndex >= paginatedData.length - 1">Next</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      largeDataArray: [], // Your large dataset
    
      chunkSize: 100,
      paginatedData: [],
      currentChunkIndex: 0,
      printMode: false
    };
  },
  computed: {
    currentChunk() {
      return this.paginatedData[this.currentChunkIndex] || [];
    }
  },
  methods: {
    paginateData(data, rowsPerPage) {
      const pages = [];
      for (let i = 0; i < data.length; i += rowsPerPage) {
        pages.push(data.slice(i, i + rowsPerPage));
      }
      return pages;
    },
    
   async startPrinting() {
      this.paginatedData = this.paginateData(this.largeDataArray, this.chunkSize);
      this.currentChunkIndex = 0;
      this.printMode = true;

      // Delay print dialog to ensure all content is rendered
     await  this.$nextTick();
     await this.waitForRender();
         window.print()

    },
        waitForRender() {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });
    },
    prevChunk() {
      if (this.currentChunkIndex > 0) {
        this.currentChunkIndex--;
      }
    },
    nextChunk() {
      if (this.currentChunkIndex < this.paginatedData.length - 1) {
        this.currentChunkIndex++;
      }
    }
  }
};
</script>

<style scoped>
/* Add your print styles here */
.print-section {
  /* Example print styles */
}
.print-table {
  width: 100%;
  border-collapse: collapse;
}
.print-table th, .print-table td {
  border: 1px solid black;
  padding: 8px;
}
</style>
