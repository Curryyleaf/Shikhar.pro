<template>
<div :class="props.class">
      <i :class="iconClass"></i>
</div>
</template>

<script>
export default {
  props: {
    props: {
        type:Object ,
      default: ()=>(
        {
            iconClass:'' ,
            class:'' ,
        }
      ),
    },
    theme:{
      type:String ,
      default:''
    }
  },
  computed: {
    iconClass() {
     return `${this.props.iconClass}`.trim();
    },
  },
};
</script>
