<template>
  <div >
    {{ inputValue }}
    <input
    class="rounded-lg bg-white border border-gray-400 shadow-md"
      :type="inputType"
      v-model="inputValue"
      :placeholder="placeholder"
      :class="class"
      @input="handleChange"
    /> 
    <!-- you can also do :value="value" , to set the initial value -->
  </div>
</template>

<script>
export default {
  emits:["inputChange"] ,
  props: {
    inputType: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    class: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "",
    },
  },
  data(){
    return{
     inputValue:''
    }
  },
  computed: {
    computedClass() {
      return `${this.themeClass} ${this.class}`;
    },
    themeClass() {
      switch (this.theme) {
        case "dark":
          return "bg-gray-800 text-white ";
        case "light":
          return "bg-white text-black";
        case "primary":
          return "bg-blue-500 text-white";
        default:
          return "bg-gray-200 text-black";
      }
    },
    inputTag() {
      switch (this.inputType) {
        case "textarea":
          return "textarea";
        case "select":
          return "select";
        case "file":
          return "input";
        case "checkbox":
          return "input";
        case "radio":
          return "input";
        default:
          return "input";
      }
    },
    inputClass() {
      return "";
    },
  },
  methods: {
    handleChange(event) {
      console.log('inputchange called' , this.inputValue);
      
      this.$emit("inputChange", event , this.inputValue );
    },
    // handleChange(event) {
    //   this.$emit("change", event.target.value);
    // },
  },
};
</script>

<style scoped></style>

<!-- USAGE -->

<!-- Text Input -->
<!-- <MultiTypeInput :props="{ inputType: 'text', value: 'Hello', placeholder: 'Enter text', theme: 'dark' }" /> -->

<!-- Textarea -->
<!-- <MultiTypeInput :props="{ inputType: 'textarea', value: 'Text area content', placeholder: 'Enter details', theme: 'light' }" /> -->

<!-- Select -->
<!-- <MultiTypeInput :props="{ inputType: 'select', value: 'Option1', placeholder: '', theme: 'primary', options: [{ text: 'Option 1', value: 'Option1' }, { text: 'Option 2', value: 'Option2' }] }" /> -->

<!-- File Upload -->
<!-- <MultiTypeInput :props="{ inputType: 'file', theme: 'light' }" /> -->

<!-- Checkbox -->
<!-- <MultiTypeInput :props="{ inputType: 'checkbox', value: true, theme: 'dark' }" /> -->

<!-- Radio -->
<!-- <MultiTypeInput :props="{ inputType: 'radio', value: 'Option1', theme: 'primary' }" /> -->
