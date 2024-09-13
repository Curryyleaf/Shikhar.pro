<template>
  <img :src="src" :alt="alt" :class="computedClass" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    class: {
      type: String,
      default: "light",
    },
    theme: {
      type: String,
      default: "",
    },
  },
  computed: {
    computedClass() {
      let baseClasses = "";
      switch (this.theme) {
        case "dark":
          baseClasses +=
            " object-cover border rounded-full bg-gray-800  h-8 w-10 text-white";
          break;
        case "light":
          baseClasses +=
            " object-cover border rounded-full bg-white  h-8 w-10  text-black";
          break;
        case "primary":
          baseClasses +=
            " object-cover border rounded-full bg-blue-500  h-8 w-10  text-white";
          break;
        default:
          baseClasses +=
            " object-cover border rounded-full bg-gray-200  h-8 w-10  text-black";
          break;
      }
      return `${baseClasses} ${this.class}`;
    },
  },
  created() {
  },
};
</script>
