<template>
  <img :src="props.src" :alt="props.alt" :class="props.class" />
</template>
<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({
        theme: "",
        src: "",
        alt: "",
        class: "",
      }),
    },
  },
  computed: {
    computedClass() {
      let baseClasses = "";
      switch (this.props.theme) {
        case "dark":
          baseClasses += "  p2 bg-gray-800 text-white";
          break;
        case "light":
          baseClasses += " p2  bg-white text-black";
          break;
        case "primary":
          baseClasses += " p2  bg-blue-500 text-white";
          break;
        default:
          baseClasses += " p2  bg-gray-200 text-black";
          break;
      }
      return `${baseClasses} ${this.props.class}`;
    },
  },
};
</script>
