<template>
  <div>
    <label :for="labels" class="sr-only">{{ labels }}</label>
    <input
      class="inputs w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="labels"
       data-user-credential="inputField"
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
    placeholder: {
      type:String ,
      default:''
    } ,
    labels: {
      type:String ,
      default:''
    }
  },
};
</script>

<style>

</style>
