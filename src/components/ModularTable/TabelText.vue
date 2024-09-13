<template>
  <p :class="class">{{ tabelText }}</p>
</template>
<script>

export default {
  props: {
  tabelText: {
    type:String ,
    default:'' ,
  },
        class: {
          type:String ,
          default:''
        },
    theme:{
      type:String ,
      default:''
    }
  },
  computed: {
    computedClass() {
      let baseClasses = "";
      switch (this.props.theme) {
        case "dark":
          baseClasses += " bg-gray-800 text-white";
          break;
        case "light":
          baseClasses += "   bg-white text-black";
          break;
        case "primary":
          baseClasses += " bg-blue-500 text-white";
          break;
        default:
          baseClasses += "   bg-gray-200 text-black";
          break;
      }
      return `${baseClasses} ${this.props.class}`;
    },
  },
  created(){
    
  }
};
</script>
