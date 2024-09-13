<template>
  <div class=" w-32 relative">
    <button
      @click.stop="toggleDropdown"
      :class="['px-2 py-2', { 'text-sm text-black': isOpen }]"
    >
      {{ buttonText }}
    </button>


    <div
      v-if="isOpen"
      class="absolute text-gray-600 bg-white shadow-xl top-8 right-0 mt-2 rounded-md z-[999] w-full "
      @click.stop
    >
      <ul>
        <li
          v-for="(option, index) in options"
          :key="index"
          class="px-4 py-2 hover:text-black hover:bg-blue-100 cursor-pointer"
          @click="selectOption(option , $event)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits:['optionSelected'] ,
  props: {
    buttonText: {
      type: String,
      default: "Select an option",
    },
    options: {
      type: Array,
      default:[]
    },
    isScrolling:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option , event) {
      this.selectedOption = option;
      this.isOpen = false; 
      this.$emit('optionSelected', this.selectedOption , event);
    

    },

     
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    handleScroll() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  },
  computed:{
    scrollCheck(){
      return this.isScrolling
    } ,
    
  } ,
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('scroll', this.handleScroll);
  } ,
    watch: {
    isScrolling(newValue) {
      console.log('value changed ?' , this.isScrolling);
      
      if (newValue) {
        this.isOpen = false;
      }
    },
  }
};
</script>

<style scoped>

</style>
