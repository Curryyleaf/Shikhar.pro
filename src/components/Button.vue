<template>
  <div class="relative">
    <button :type="buttonType" lass="bg-cyan-500 text-white rounded-md px-2 py-1">
      {{ buttonText }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    buttonType: String,
    buttonText: String,
  },
};
</script>
