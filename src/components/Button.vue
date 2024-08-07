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
        round: "",
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



<template>
  <button
    :class="buttonClasses"
    :style="buttonStyles"
    :type="buttonType"
    @click="buttonFunction"
  >
    <span :class="textClasses">{{ buttonText }}</span>
  </button>
</template>

<script>
export default {
  props: {
    buttonSize: {
      type: String,
      default: 'md'
    },
    buttonColor: {
      type: String,
      default: 'blue'
    },
    buttonBorderSize: {
      type: String,
      default: '1px'
    },
    buttonBorderColor: {
      type: String,
      default: 'black'
    },
    buttonShape: {
      type: String,
      default: 'round'
    },
    buttonText: {
      type: String,
      default: 'Click'
    },
    textColor: {
      type: String,
      default: 'white'
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
      default: 'normal'
    },
    buttonType: {
      type: String,
      default: 'button'
    },
    buttonFunction: {
      type: Function,
      default: () => {}
    },
  },
  computed: {
    buttonClasses() {

      return [
        `btn-${this.buttonSize}`,
        `btn-${this.buttonColor}`,
        `btn-${this.buttonShape}`
      ];
    },
    buttonStyles() {
      return {
        border: `${this.buttonBorderSize} solid ${this.buttonBorderColor}`,
        backgroundColor: this.buttonColor,
        borderRadius: this.buttonShape === 'round' ? '50%' : '4px'
      };
    },
    textClasses() {
      return [
        `text-${this.textColor}`,
        `text-${this.textSize}`,
        `text-${this.textBoldness}`,
        `font-${this.textFont}`
      ];
    }
  }
};
</script>

<style scoped>
/* Define your classes here. This is just an example. */

.btn-tiny { font-size: 0.8em; }
.btn-small { font-size: 1em; }
.btn-medium { font-size: 1.2em; }
.btn-big { font-size: 1.5em; }
/* Add other button size classes */

.btn-blue { background-color: blue; }
/* Add other button color classes */

.btn-round { border-radius: 50%; }
.btn-extra-round { border-radius: 25px; }
/* Add other button shape classes */

.text-white { color: white; }
.text-black { color: black; }
/* Add other text color classes */

.text-tiny { font-size: 0.8em; }
.text-small { font-size: 1em; }
.text-medium { font-size: 1.2em; }
/* Add other text size classes */

.font-Arial { font-family: Arial, sans-serif; }
/* Add other text font classes */

.text-bold { font-weight: bold; }
.text-normal { font-weight: normal; }
/* Add other text boldness classes */
</style>
