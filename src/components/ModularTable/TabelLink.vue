<template class="" >
  <a :href="linkAddress" :class="computedClass">{{ linkAddress }}</a>
</template>

<script>
export default {
  props: {
    linkAddress: {
      type: String,
      default: "",
    },
    class: {
      type: String,
      default: "p-2",
    },
    theme: {
      type: String,
      default: "light",
    },
  },
  computed: {
    computedClass() {
         let baseClasses = "";
      switch (this.theme) {
        case "dark":
          baseClasses += "  p2  text-left text-sm break-all max-w-[150px] overflow-hidden text-white";
          break;
        case "light":
          baseClasses += "  p2 hover:underline  text-blue-950 text-left text-sm break-all w-10 !important overflow-hidden text-black";
          break;

//   return this.theme === 'light' ? 'max-w-[150px] !important text-black' : 'other-classes';
// }

        case "primary":
          baseClasses += "  p2  text-left text-sm break-all max-w-[150px] overflow-hidden text-white";
          break;
        default:
          baseClasses += "  p2  text-left text-sm break-all max-w-[150px] overflow-hidden text-white";
          break;
      }
      return baseClasses 
    },
  },
  created(){
    
  }
};
</script>
