<template>
  <div>
    <button
      :class="[baseVariantClasses, buttonClasses ,'focus:outline-none active:scale-95']"
      :style="buttonStyles"
      :type="buttonType"
      @click="buttonFunction"
    >
      <span v-if="variantCheck" :class="textClasses" >{{ computedButtonText }}</span>
      <i v-if="icon" :class="iconClass"></i>
      <slot name="icon"></slot>
      <div v-if="variant==='loading'" class="animate-spin border-blue-200 border-solid border-t-transparent border-2 rounded-full w-6 h-6 relative z-50"></div>
    </button>
  </div>
</template>

<script>
export default {
  data(){
    return{
    Text:"heyy"
    }
  } ,
  props: {
    loading:{
       type:Boolean ,
       default:true
    },
    buttonBorderColor: {
      type: String,
      default: ''
    },
    buttonBorderSize: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconLibrary: {
      type: String,
      default: 'fa'
    },
    buttonSize: {
      type: String,
      default: ''
    },
    buttonColor: {
      type: String,
      default: '',
      validator: value => ['white', 'black', 'red', 'blue', 'brown', 'green', 'yellow', 'orange'].includes(value)
    },
    buttonShape: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Click'
    },
    textColor: {
      type: String,
      default: '',
      validator: value => ['white', 'black', 'red', 'blue', 'brown', 'green', 'yellow', 'orange'].includes(value)
    },
    textSize: {
      type: String,
      default: 'medium'
    },
    textBoldness: {
      type: String,
      default: 'bold'
    },
    textStyling: {
      type: String,
      default: ''
    },
    buttonType: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'loading',
      validator: value => ['light', 'dark', 'primary', 'secondary' ,'loading' ,'sucess'].includes(value)
    },
    buttonFunction: {
      type: Function,
      default: () => {
        console.log('function says hii');
        
      }
    }
  },
  methods:{
     textHandler(texty){
      

     }
  } ,
  computed: {
    variantCheck(){
   const valid=  [ 'light', 'dark', 'primary', 'secondary' , 'sucess' , 'test' ,'register' ,'submit']
         return valid.includes(this.variant)
    },
    baseVariantClasses() {
      const variants = {
        light: "bg-white text-black border border-gray-300 py-2 px-4 rounded hover:bg-gray-100",
        dark: "bg-black text-white border border-gray-700 py-2 px-4 rounded hover:bg-gray-800",
        primary: "bg-blue-500 text-white border-none py-2 px-4 rounded hover:bg-blue-700",
        secondary: "bg-gray-500 text-white border-none py-2 px-4 rounded hover:bg-gray-700" ,
        sucess:"bg-gradient-to-r from-green-500 to-green-600 text-white border-none hover:opacity-90" ,
        links:'bg-transparent text-blue-600 border-none hover:underline' ,
        loading:'bg-blue-500 text-white border-none relative flex items-center justify-center p-3'
      };
      return variants[this.variant] || '';
    },
    buttonClasses() {
      const buttonColors = {
        white: 'bg-white text-black',
        black: 'bg-black text-white',
        red: 'bg-red-500 text-white',
        blue: 'bg-blue-500 text-white',
        brown: 'bg-brown-500 text-white',
        green: 'bg-green-500 text-white',
        yellow: 'bg-yellow-500 text-black',
        orange: 'bg-orange-500 text-white'
      };
      const buttonSizes = {
        tiny: 'px-1 py-0.5',
        small: 'px-2 py-1',
        medium: 'px-3 py-1.5',
        big: 'px-4 py-2',
        bigger: 'px-5 py-2.5',
        large: 'px-6 py-3',
        larger: 'px-7 py-3.5',
        extraLarge: 'px-8 py-4',
        extraLarger: 'px-9 py-4.5'
      };
      const buttonShapes = {
        round: 'rounded-md',
        rounded: 'rounded-lg',
        extraRounded: 'rounded-full'
      };
      return [
        buttonColors[this.buttonColor],
        buttonSizes[this.buttonSize],
        buttonShapes[this.buttonShape],
        'transition ease-in-out duration-150'
      ];
    },
    buttonStyles() {
      return {
        border: `${this.buttonBorderSize} solid ${this.buttonBorderColor}`,
     
      };
    },
    textClasses() {
      const textBoldness = {
        extraThin: 'font-extralight',
        thin: 'font-thin',
        bold: 'font-bold',
        bolder: 'font-semibold',
        boldest: 'font-extrabold'
      };
      const textColor = {
        white: 'text-white',
        black: 'text-black',
        red: 'text-red-500',
        blue: 'text-blue-500',
        green: 'text-green-500',
        cream: 'text-cream-500',
        yellow: 'text-yellow-500',
        orange: 'text-orange-500'
      };
      const textSize = {
        tiny: 'text-xs',
        small: 'text-sm',
        medium: 'text-base',
        big: 'text-lg',
        bigger: 'text-xl',
        large: 'text-2xl',
        larger: 'text-3xl',
        extraLarge: 'text-4xl'
      };
      const textStyling = {
        capital: 'capitalize',
        textGap: 'tracking-wider',
        textLong: 'leading-loose'
      };
      return [
        textBoldness[this.textBoldness],
        textColor[this.textColor],
        textSize[this.textSize],
        textStyling[this.textStyling]
      ];
    },
      computedButtonText() {
      const defaultTexts = {
  
        sucess:'Sucess' ,
        submit: 'Submit',
        register: 'Register',
        test: 'Test'
      };
      return  defaultTexts[this.variant] || 'Click';
    },
    iconClass() {
      return `${this.iconLibrary} ${this.icon}`.trim();
    }
  }
};
</script>
