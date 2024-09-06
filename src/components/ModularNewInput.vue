<template>
  <div>
    <label :for="id" class="sr-only" :aria-label="labels">{{ labels }}</label>
    <input
      :class="[
        'inputs w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600',
        customClass,
        { 'border-red-500': hasError, 'border-gray-300': !hasError }
      ]"
      :type="type"
      :placeholder="labels"
      :value="modelValue"
      :id="id"
      :name="name"
      :maxlength="maxlength"
      :minlength="minlength"
      :aria-label="labels"
      :aria-required="required ? 'true' : 'false'"
      :aria-invalid="hasError ? 'true' : 'false'"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
    />
    <p v-if="hasError" class="text-red-500 text-sm">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    type: {
      type: String,
      default: "text",
    },
    labels: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: null,
    },
    minlength: {
      type: Number,
      default: null,
    },
    customClass: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      
    },
  },
};
</script>

<style scoped>

</style>
