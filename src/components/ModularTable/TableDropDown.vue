<template>
  <div :class="computedClass">
    <select @change="handleChange">
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({
        options: [],
        selected: '',
        theme: '',
        class: '',
        returnFunction: () => {},
      }),
    },
  },
  computed: {
    computedClass() {
      return this.themeClass + ' ' + this.props.class;
    },
    themeClass() {
      switch (this.props.theme) {
        case 'dark': return 'dropdown-dark';
        case 'light': return 'dropdown-light';
        default: return 'dropdown-default';
      }
    },
  },
  methods: {
    handleChange(event) {
      this.props.returnFunction(event.target.value);
      this.$emit('change', event.target.value);
    },
  },
};
</script>

<style scoped>
.dropdown-dark { background-color: #333; color: white; }
.dropdown-light { background-color: white; color: black; }
.dropdown-default { background-color: gray; color: white; }
</style>
