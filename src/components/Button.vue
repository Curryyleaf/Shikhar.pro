<!-- <template>
 
    <button
      :type="buttonType"
      @click="buttonFunction"
    
    >
      {{ buttonText }}
    </button>
    <p class="font"></p>

</template>
<script>
export default {
  data() {
    return {
      myclass: {},
    };
  },
  props: {
    buttonSize: {
      default: "md",
      type: String,
      validator() {},
    },
    buttonColor: {},
    buttonBorderSize: {},
    buttonBorderColor: {},
    buttonShape: {},
    buttonText: {
      default: "Click",
      type: String,
    },
    textStyle: {},
    textColor: {},
    textFont: {},
    textSize: {},
    textBoldness: {},
    buttonType: {
      default: "button",
      type: String,
    },
    buttonFunction: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    colors() {
      return {
        white: "",
        black: "",
        red: "",
        blue: "",
        brown: "",
        green: "",
        cream: "",
        yellow: "",
        orange: "",
      };
    },
    buttonShape() {
      return {
        round: "",
        extraRound: "",
        
      };
    },

    buttonSizes() {
      return {
        tiny: "",
        small: "",
        medium: "",
        big: "",
        bigger: "",
        large: "",
        larger: "",
        extraLarge: "",
        extraLarger: "",
      };
    },
    textFont() {},
    textBoldness() {
      return {
        bold: "",
        semiBold: "",
        extraBold: "",
      };
    },
    textSizes() {
      return {
        tiny: "",
        small: "",
        medium: "",
        big: "",
        bigger: "",
        large: "",
        larger: "",
        extraLarge: "",
        extraLarger: "",
      };
    },
    textColors() {
      return {
       ' white ' , 
       ' black ' , 
       ' red ',
       ' blue ',
       ' brown ',
       ' green ',
       ' cream ',
       ' yellow' ,
       ' orange' ,
      };
    },
    <i class="bi bi-0-circle"></i>

    textStyles() {
      return {
        close: "",
        closeer: "",
        closest: "",
        wide: "",
        wider: "",
        widest: "",
      };
    },
  },
};
</script> -->

<template class="">
<div >
    <button
    :class="[ varient , buttonClasses]"
    :style="buttonStyles"
    :type="buttonType"
    @click="buttonFunction"
  >
    <span :class="textClasses">{{ buttonText }}</span>
    <i  :class="iconClass"></i>
    <slot name="icon" ></slot>
 
  </button>
</div>
</template>
<script>
export default {
  props: { 
    buttonBorderColor:{
      default:'' ,
      type:String
    } ,
    buttonBorderSize:{
      default:'' ,
      type:String
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
      default:'' ,
      validator:(value)=> [  ' white ' , 
       ' black ' , 
       ' red ',
       ' blue ',
       ' brown ',
       ' green ',
       ' yellow' ,
       ' orange' ,].includes(value)
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
      default: 'black',
      validator:(value)=> [  ' white ' , 
       ' black ' , 
       ' red ',
       ' blue ',
       ' brown ',
       ' green ',
       ' yellow' ,
       ' orange' ,].includes(value)
    },
    textFont: {
      type: String,
      default: 'Arial'
    },
    textSize: {
      type: String,
      default: 'medium'
    },
    textBoldness: {
      type: String,
      default: 'bold'
    },
        textstyling: {
      type: String,
      default: ''
    },
    buttonType: {
      type: String,
      default: ''
    },
    varient:{
    type:String ,
    default:'primary' ,
    validator:()=>{
        
    }
    } ,
    buttonFunction: {
      type: Function,
      default: () => {}
    },
  },
  computed: {
    buttonClasses() { 
      const buttonColors ={  white: 'bg-white text-black',
        black: 'bg-black text-white',
        red: 'bg-red-500 text-white',
        blue: 'bg-blue-500 text-white',
        brown: 'bg-brown-500 text-white',
        green: 'bg-green-500 text-white',
        cream: 'bg-cream-500 text-black',
        yellow: 'bg-yellow-500 text-black',
        orange: 'bg-orange-500 text-white'}
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



        const buttonShapes={
          round:'rounded-2xl' ,
          rounded:'rounded-lg' ,
          extraRounded:'rounded-full'
        }
      if(!this.varient){
  return  [
           buttonColors[this.buttonColor] ||buttonColors['black'],
           buttonSizes[this.buttonSize]||buttonSizes['medium'],
           buttonShapes[this.buttonShape] ||buttonShapes[''] ,
           
                'transition ease-in-out duration-150'
        ]
} else if (this.varient){
  return [
           buttonColors[this.buttonColor] ,
           buttonSizes[this.buttonSize],
           buttonShapes[this.buttonShape] ,
                'transition ease-in-out duration-150'
        ]
}
    },
    buttonStyles() {
      return  {
        border: `${this.buttonBorderSize} solid ${this.buttonBorderColor}` ,
        borderRadius: this.buttonShape === 'round' ? '50%' : '4px'
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
    
    const font = {
      arial: 'font-sans',  
      sans: 'font-serif'
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
      textBoldness[this.textBoldness] || textStyle['bold'],
      textColor[this.textColor] || textColor['black'],
      font[this.textFont] || font['sans'],
      textSize[this.textSize] || textSize['medium'],
      textStyling[this.textStyling] || textStyling['capital']
    ];
  },

 iconClass() {
    return `${this.iconLibrary} ${this.icon}`.trim();
  }
 ,
   varient() {
      const varients = {
        light:
          " bg-white text-black border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 box-border m-0 p-0",
        dark: "bg-black text-white border border-gray-700 py-2 px-4 rounded hover:bg-gray-800 box-border m-0 p-0",
        primary:
          "bg-blue-500 text-white border-none py-2 px-4 rounded hover:bg-blue-700 box-border m-0 p-0",
        secondary:
          "bg-gray-500 text-white border-none py-2 px-4 rounded hover:bg-gray-700 box-border m-0 p-0",
        teritary:
          "bg-transparent text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-100 box-border m-0 p-0",
        dark: "bg-red-500 text-white border-none py-2 px-4 rounded hover:bg-red-700 box-border m-0 p-0",
      };
       return[
        varients[this.varient] || ''
       ]
    },
  }
};
</script>
<style>
</style>
<!-- 
<style scoped>
/* Define your classes here. This is just an example. */

/* Scoped styles */
.btn-tiny { padding: 4px 8px; }
.btn-small { padding: 6px 12px; }
.btn-medium { padding: 8px 16px; }
.btn-large { padding: 10px 20px; }
.btn-extraLarge { padding: 12px 24px; }



      .btn-white{background-color:white}
      .btn-black{background-color: black}
      .btn-red{background-color: red}
      .btn-blue{background-color: blue}
      .btn-brown{background-color: brown}
      .btn-green{background-color: green}
      .btn-yellow{background-color: yellow}
      .btn-orange{background-color: orange}


.btn-round { border-radius: 50%; }
.btn-extra-round { border-radius: 25px; }
/* Add other button shape classes */

/* Add other text color classes */
      .text-white{color:white}
      .text-black{color: black}
      .text-red{color: red}
      .text-blue{color: blue}
      .text-brown{color: brown}
      .text-green{color: green}
      .text-yellow{color: yellow}
      .text-orange{color: orange}

.text-tiny { font-size: 0.8em; }
.text-small { font-size: 1em; }
.text-medium { font-size: 1.2em; }
/* Add other text size classes */

.font-Arial { font-family: Arial, sans-serif; }
/* Add other text font classes */

.text-bold { font-weight: bold; }
.text-normal { font-weight: normal; }
/* Add other text boldness classes */
</style> -->
