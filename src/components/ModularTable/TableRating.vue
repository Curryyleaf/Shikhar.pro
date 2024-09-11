<template>
  <div :class="computedClass">
    <span v-for="star in totalStars" :key="star" @click="rate(star)">
      ★
    </span>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({
        rating: 0,
        totalStars: 5,
        theme: '',
        class: '',
        returnFunction: () => {},
      }),
    },
  },
  computed: {
    computedClass() {
      return this.props.class;
    },
  },
  methods: {
    rate(star) {
      this.props.returnFunction(star);
      this.$emit('rate', star);
    },
  },
};
</script>
