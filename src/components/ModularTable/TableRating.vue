<template>
  <div :class="computedClass">
    <span v-for="star in totalStars" :key="star" @click="rate(star)" class="text-black"> ★ </span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0,
    },

    totalStars: {
      type: Number,
      default: 3,
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
      return this.class;
    },
  },
  methods: {
    rate(star) {
      this.returnFunction(star);
      this.$emit("rate", star);
    },
  },
};
</script>
