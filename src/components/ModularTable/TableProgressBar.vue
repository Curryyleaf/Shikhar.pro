<template>
  <div :class="computedClass">
    <div :style="{ width: `${props.value}%` }"></div>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({
        value: 0,
        theme: '',
        class: '',
      }),
    },
  },
  computed: {
    computedClass() {
      return this.themeClass + ' ' + this.props.class;
    },
    themeClass() {
      switch (this.props.theme) {
        case 'dark': return 'progress-dark';
        case 'light': return 'progress-light';
        default: return 'progress-default';
      }
    },
  },
};
</script>

<style scoped>
.progress-dark div { background-color: #333; }
.progress-light div { background-color: #ccc; }
.progress-default div { background-color: #aaa; }
</style>
