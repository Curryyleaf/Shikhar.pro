<template>
  <div
    class="fixed inset-0 bg-gray-200 bg-opacity-80 flex items-center justify-center z-50"
  >
    <div
      class="bg-white border-2 border-gray-300 rounded-lg shadow-lg w-full max-w-xl"
    >
      <div
        class="flex justify-between bg-teal-500 items-center border-b border-teal-300 p-4"
      >
        <h4 class="text-white text-lg font-semibold">Table Edit Box</h4>
        <button class="text-teal-600 hover:text-teal-800" @click="closeEditBox">
          &times;
        </button>
      </div>
      <div @submit.prevent="saveChanges" class="p-6">
        <div
          class="grid text-black grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4"
        >
          <div
            v-for="item in tableDataNames"
            :key="item.id"
            class="flex flex-col"
          >
            <label :for="item" class="block mb-2">
              <p class="font-medium pl-2">{{ item }}</p>
              <input
                ref="InputField"
                @focus="$event.target.select()"
                :type="item"
                id="name"
                v-model="formValues[item]"
                :placeholder="item"
                required
                class="w-full p-2 box-border gap-y-6 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>
        <div class="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            @click="SaveData"
            class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Save
          </button>
          <button
            type="button"
            class="bg-gray-200 text-teal-600 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            @click="closeEditBox"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
      emits: ['editSave', 'close'],
  data() {
    return {
      isModalVisible: false,
      data: [],
      formValues: [],
    };
  },
  props: {
    tableDataNames: {
      type: Array,
      default: [],
    },
    formData: {
      type: Object,
      default: {},
    },
  },
  computed: {
    formArray() {
      return this.formData;
    },
  },
  methods: {
    SaveData() {
      this.$emit("editSave", this.formValues);
      console.log('dsvsvavava' , this.formValues);
      
    },

    inputObj() {
      this.formValues = { ...this.formArray };
      // this.tableDataNames.forEach((item) => (this.formValues[item] = ""));TRY THIS AS WELL
      //
      console.log("names", this.formData);
    },
    closeEditBox() {
      this.$emit("close");
    },
  },
  async created() {
    await this.tableDataNames;
    //  WE HAVE TO AWAIT FOR PROPS BEING PASSED BEFORE IT IS MUTATED
    this.inputObj();
  },
};
</script>
<style scoped>
::selection {
  background-color: rgb(31 41 55);
  color: #ffffff;
}

::-webkit-selection {
  background-color: #3399ff;
  color: #ffffff;
}
</style>
