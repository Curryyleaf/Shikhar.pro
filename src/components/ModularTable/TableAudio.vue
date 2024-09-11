<template>
  <audio :src="src" controls></audio>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
  },
};
</script>
