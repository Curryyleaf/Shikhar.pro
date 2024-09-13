<template >
<div class="p-2 ">
    <div class="border-2  border-black  bg-gray-300" >
    <div :class="computedClass" :style="{ width: `${value}%` }"></div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
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
  computed: {
    computedClass() {
      return this.themeClass + " " + this.class;
    },
    themeClass() {
      switch (this.theme) {
        case "dark":
          return "bg-black h-3";
        case "light":
          return "progress-light";
        default:
          return "progress-default";
      }
    },
  },
};
</script>

<style scoped>
.progress-dark div {
  background-color: #333;
}
.progress-light div {
  background-color: #ccc;
}
.progress-default div {
  background-color: #aaa;
}
</style>
