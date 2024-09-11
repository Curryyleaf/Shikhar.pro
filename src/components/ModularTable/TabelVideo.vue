<template>
  <video :src="props.src" controls></video>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({ 

          src: '',

      }),
    },
  },
};
</script>
