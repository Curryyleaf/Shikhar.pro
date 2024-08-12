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
      default: '' ,
      
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
      default: 'primary',
      validator: value => [
        'light', 'dark', 'primary', 'secondary', 'success', 'links', 'loading',
        'danger', 'warning', 'info', 'neutral', 'outline', 'gradient', 'flat',
        'ghost', 'squared', 'rounded', 'link', 'block', 'iconOnly', 'toggle'
      ].includes(value)
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
    variantCheck() {
      // return [
      //   'light', 'dark', 'primary', 'secondary', 'success', 'links', 'info', 'neutral', 'outline','submit' , 'resgister' , 'test' , 'gradient', 'flat',
      //   , 'squared', 'rounded', 'link', 'block', 'iconOnly', 
      // ].includes(this.variant);
            if(this.variant==='loading'|| this.variant==='icon'){
        return false
      }else{
        return true
      }
    },
    baseVariantClasses() {
      const variants = {
        light: "bg-white text-black border border-gray-300 py-2 px-4 rounded hover:bg-gray-100",
        dark: "bg-black text-white border border-gray-700 py-2 px-4 rounded hover:bg-gray-800",
        primary: "bg-blue-500 text-white border-none py-2 px-4 rounded hover:bg-blue-700",
        secondary: "bg-gray-500 text-white border-none py-2 px-4 rounded hover:bg-gray-700",
        success: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none hover:opacity-90",
        links: "bg-transparent text-blue-600 border-none hover:underline",
        loading: "bg-blue-500 text-white border-none relative flex items-center justify-center p-3",
        danger: "bg-red-500 text-white border-none py-2 px-4 rounded hover:bg-red-700",
        warning: "bg-yellow-500 text-black border-none py-2 px-4 rounded hover:bg-yellow-700",
        info: "bg-teal-500 text-white border-none py-2 px-4 rounded hover:bg-teal-700",
        outline: "bg-transparent text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-100",
        gradient: "bg-gradient-to-r from-pink-500 to-yellow-500 text-white border-none py-2 px-4 rounded hover:opacity-90",
        flat: "bg-gray-200 text-gray-800 border-none py-2 px-4 rounded hover:bg-gray-300",
        squared: "bg-blue-500 text-white border-none py-2 px-4 rounded-none hover:bg-blue-700",
        rounded: "bg-blue-500 text-white border-none py-2 px-4 rounded-full hover:bg-blue-700",
        link: "bg-transparent text-blue-500 border-none py-1 px-0 underline hover:bg-transparent",
        block: "bg-blue-500 text-white border-none py-2 px-4 rounded w-full hover:bg-blue-700",
        iconOnly: "bg-gray-200 text-gray-800 border-none p-2 rounded hover:bg-gray-300",
      };
      return variants[this.variant] || '';
    },
    buttonClasses() {
      const buttonColors = {
        white: 'bg-white text-black hover:bg-white-400',
        black: 'bg-black text-white hover:bg-black-400',
        red: 'bg-red-500 text-white hover:bg-red-400',
        blue: 'bg-blue-500 text-white hover:bg-blue-400',
        brown: 'bg-brown-500 text-white hover:bg-brown-400',
        green: 'bg-green-500 text-white hover:bg-green-400',
        yellow: 'bg-yellow-500 text-black hover:bg-yellow-400',
        orange: 'bg-orange-500 text-white hover:bg-orange-400'
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
        red: 'text-red-500 ',
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
        links:'Links' ,
        sucess:'Sucess' ,
        submit: 'Submit',
        register: 'Register',
        test: 'Test'
      };
      return this.buttonText|| defaultTexts[this.variant] || 'Click';
    },
    iconClass() {
      return `${this.iconLibrary} ${this.icon}`.trim();
    }
  }
};
</script>
