<template>
  <div :class="computedClass">
    <component :is="inputTag" 
               :type="props.inputType" 
               :value="props.value" 
               :placeholder="props.placeholder"
               :class="inputClass"
               @input="handleInput" 
               @change="handleChange" />
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({
        inputType: 'text', 
        value: '',
        placeholder: '',
        class: '',
        theme: '',
        returnFunction: () => {},
      }),
    },
  },
  computed: {
    computedClass() {
      return `${this.themeClass} ${this.props.class}`;
    },
    themeClass() {
      switch (this.props.theme) {
        case 'dark': return 'bg-gray-800 text-white';
        case 'light': return 'bg-white text-black';
        case 'primary': return 'bg-blue-500 text-white';
        default: return 'bg-gray-200 text-black';
      }
    },
    inputTag() {
      switch (this.props.inputType) {
        case 'textarea': return 'textarea';
        case 'select': return 'select';
        case 'file': return 'input';
        case 'checkbox': return 'input';
        case 'radio': return 'input';
        default: return 'input';
      }
    },
    inputClass() {

      return '';
    }
  },
  methods: {
    handleInput(event) {
      this.props.returnFunction(event.target.value);
      this.$emit('input', event.target.value);
    },
    handleChange(event) {
      this.props.returnFunction(event.target.value);
      this.$emit('change', event.target.value);
    },
  },
};
</script>

<style scoped>
</style>



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
