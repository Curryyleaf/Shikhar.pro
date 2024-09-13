<template>
  <chart-component :data="props.data" :type="props.type"></chart-component>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({
        data: [],
        type: 'bar', 
        class: '',
      }),
    },
        theme:{
      type:String ,
      default:''
    }
  },
  computed: {
    computedClass() {
      return this.props.class;
    },
  },
};
</script>
