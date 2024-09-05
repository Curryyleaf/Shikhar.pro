<template>
  <div class="fixed inset-0 bg-gray-200  bg-opacity-80  flex items-center justify-center z-50">
    <div class="bg-white border-2 border-gray-300  rounded-lg shadow-lg w-full max-w-xl">
      <div class="flex justify-between bg-teal-500  items-center border-b border-teal-300 p-4">
        <h4 class="text-white text-lg font-semibold">Table Edit Box</h4>
        <button class="text-teal-600 hover:text-teal-800" @click="closeModal">&times;</button>
      </div>
      <form @submit.prevent="saveChanges" class="p-6 ">
        <div class="grid  text-black grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          <div v-for="item in tableDataNames" :key="item.id" class="flex flex-col">
            <label :for="item" class="block  mb-2">
              <p class="font-medium pl-2">{{ item }}</p>
              <input
              ref="InputField"
              @focus="$event.target.select()"
                :type="item"
                id="name"
                v-model="formData[item]"
                :placeholder="item"
                required
                class="w-full p-2  box-border gap-y-6 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import { useDataStore } from '@/store/table-store';

export default {
  data() {
    return {
      isModalVisible: false,
      formData: {} ,
      data:[]
    };
  },
  props:{
    tableDataNames:{
        type:Array , 
        default:[] , 
    }
  } ,
  methods: {
    selectInput(event){
    event.target.select()
    } ,
    SaveData(){
        const store=useDataStore()
    store.setEditValues(this.formData)
    store.replaceEditValues()
     console.log('formdata' , this.formData);
     store.isEditing=false
     
    } ,
    intitalformValue(){
        const store = useDataStore()
   const item = store.DisplayData.find((element) => element.id=store.editID)
   this.formData ={...this.formData,...item}
    } ,
    inputObj(){
    this.tableDataNames.forEach((item)=> this.formData[item]='')
    console.log('names' , this.formData);
    
    //   this.tableDataNames.forEach((item)=> {
    //     if(item !== 'edit'){
    //          this.formData[item]=''
    //     }
    // })
    } ,
    openModal(data) {
      this.formData = { ...data }; // Pre-fill the form with existing data if needed
      this.isModalVisible = true;
    },
    closeModal() {
        const store=useDataStore()
      store.isEditing=false
    },
    saveChanges() {
      // Handle the save logic, e.g., update data and close modal
      this.$emit('save', this.formData);
      this.closeModal();
    }
  } ,
 async created(){
 await this.tableDataNames
//  WE HAVE TO AWAIT FOR PROPS BEING PASSED BEFORE IT IS MUTATED
    this.inputObj()
    this.intitalformValue()
   
  } ,
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
<!-- 
<script>
export default {
  data() {
    return {
      isModalVisible: false,
      formData: {
        name: '',
        url: '',
        repo: '',
        avatar: ''
      }
    };
  },
  methods: {
    openModal(data) {
      this.formData = { ...data }; // Pre-fill the form with existing data if needed
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    saveChanges() {
      // Handle the save logic, e.g., update data and close modal
      this.$emit('save', this.formData);
      this.closeModal();
    }
  }
};
</script> -->






// <!-- When using a pop-up or modal dialog for in-place editing in a table, the general approach involves the following steps:

// ### **1. Triggering the Modal**

// - **Click Event**: Implement an event (such as a click or double-click) on a table cell that opens the modal. This event should be linked to the specific cell that the user wants to edit.

// ### **2. Displaying the Modal**

// - **Modal Component**: Create a modal component or use a library that provides modal functionality. The modal should overlay the table and be designed to handle editing tasks.
// - **Show/Hide Logic**: Control the visibility of the modal using a boolean flag or state variable. When a cell is clicked, set this flag to true to display the modal.

// ### **3. Populating the Modal**

// - **Pre-Filled Data**: Populate the modal with the current data from the clicked cell. This involves passing the cell’s content (e.g., text, URL, or other data) to the modal.
// - **Editable Interface**: Provide form elements or editable fields within the modal, such as input fields, text areas, or other relevant controls, to allow users to modify the content.

// ### **4. Handling User Input**

// - **Form Controls**: Include controls like save and cancel buttons within the modal. The save button should commit changes to the underlying data model, while the cancel button should discard changes and close the modal.
// - **Data Binding**: Bind the form elements in the modal to a data property that holds the temporary or edited value.

// ### **5. Updating the Data**

// - **Save Changes**: On saving, update the data model or state with the new values from the modal. Ensure that the changes are reflected in the table.
// - **Close Modal**: Close the modal after saving or canceling the edits. This can be managed by updating the visibility flag or state variable.

// ### **6. Error Handling and Validation**

// - **Validation**: Include validation logic to check if the user input is correct before allowing the save operation.
// - **Feedback**: Provide feedback to the user if there are validation errors or if the save operation fails.

// ### **7. Accessibility and Usability**

// - **Keyboard Navigation**: Ensure that the modal can be navigated using keyboard shortcuts and that it is accessible to screen readers.
// - **Responsive Design**: Make sure the modal is responsive and works well on different screen sizes and devices.

// ### **8. Closing the Modal**

// - **Click Outside**: Optionally, allow users to close the modal by clicking outside of it or pressing the `Esc` key.
// - **Close Button**: Include a clear close button in the modal’s UI to allow users to exit without making changes.

// ### **9. Integration with Table**

// - **Dynamic Content**: Ensure that the table updates dynamically to reflect the changes made in the modal.
// - **State Management**: Manage the state of the table and modal effectively to handle multiple simultaneous edits if necessary.

// By using this approach, you provide a user-friendly way to edit table content in a separate interface, keeping the table clean and manageable while offering a robust editing experience. -->