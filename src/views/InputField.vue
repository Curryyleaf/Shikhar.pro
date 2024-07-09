<template>
  <div>
    <label :for="inputfor" class="sr-only">{{ inputfor }}</label>
    <input
      class="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
      :type="type"
      :placeholder="inputfor"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="inputfor"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    modelValue: String,
    type: {
      type: String,
      default: "text",
    },
    inputfor: String,
  },
};
</script>

<style>

</style>
