<template>
  <a
    v-if="isExternalLink"
    :href="to"
    :class="[
      classes,
      disabled ? 'cursor-not-allowed opacity-50' : '',
      !loading ? '' : 'opacity-50',
      colorClasses,
      sizeClasses,
      roundedClasses,
    ]"
    target="_blank"
    v-bind="$attrs"
  >
    <app-icon v-if="iconLeft" :name="iconLeft" />
    <template v-else>
      <slot />
    </template>
    <app-icon v-if="iconRight" :name="iconRight" />
  </a>
  <component
    :is="linkType"
    v-else
    :to="to"
    v-bind="$attrs"
    :type="linkType === 'button' ? type : undefined"
    :disabled="!loading ? disabled : ''"
    :class="[
      classes,
      disabled ? 'cursor-not-allowed opacity-50' : '',
      !loading ? '' : 'opacity-50',
      colorClasses,
      sizeClasses,
      roundedClasses,
    ]"
  >
    <app-icon v-if="loading" class="animate-spin" name="spinner" />
    <app-icon v-else-if="iconLeft" :name="iconLeft" />
    <span v-if="loading" class="opacity-70">{{ loadingText }}</span>
    <template v-else>
      <slot />
    </template>
    <app-icon v-if="iconRight" :name="iconRight" />
  </component>
</template>
<script>
import { twMerge } from "tailwind-merge";
export default {
  name: "AppButton",
  inheritAttrs: false,
  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    color: {
      type: String,
      default: "blue",
      validator: (prop) => {
        const valid = [
          "blue",
          "red",
          "gray",
          "slate",
          "green",
          "teal",
          "purple",
          "cyan",
          "pink",
          "indigo",
          "yellow",
          "light",
          "primary",
          "secondary",
          "white",
          "transparent",
        ].includes(prop.toLowerCase());
        if (!valid) {
          console.error("😳 The button prop must include valid color name.");
        }
        return valid;
      },
    },
    type: {
      type: String,
      default: "button",
      validator: (prop) => {
        const valid = ["button", "reset", "submit"].includes(
          prop.toLowerCase()
        );
        if (!valid) {
          console.error("😳 The button prop must include valid type name.");
        }
        return valid;
      },
    },
    size: {
      type: String,
      default: "md",
      validator: (prop) => {
        const valid = ["tiny", "sm", "md", "lg", "xl", "2xl", "3xl"].includes(
          prop.toLowerCase()
        );
        if (!valid) {
          console.error("😳 The button prop must include valid size name.");
        }
        return valid;
      },
    },
    rounded: {
      type: String,
      default: "md",
      validator: (prop) => {
        const valid = [
          "tiny",
          "sm",
          "md",
          "lg",
          "xl",
          "2xl",
          "3xl",
          "full",
        ].includes(prop.toLowerCase());
        if (!valid) {
          console.error("😳 The button prop must include valid rounded name.");
        }
        return valid;
      },
    },
    outline: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: "Processing",
    },
  },
  data() {
    const sizes = {
      tiny: "px-2 py-2 leading-[normal] text-sm font-medium",
      sm: "px-2 py-2  text-sm leading-tight",
      md: "px-3 py-2 leading-normal text-base",
      lg: "px-5 py-3 leading-normal text-lg",
      xl: "px-7 py-5 leading-normal text-xl",
      "2xl": "px-8 py-6 leading-normal text-2xl",
    };
    const iconSizes = {
      tiny: "h-5 w-5",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-16 w-16",
      xl: "h-20 w-20",
      "2xl": "h-24 w-24",
    };
    const roundeds = {
      tiny: "rounded-sm",
      sm: "rounded-sm",
      md: "rounded",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    };
    const colors = {
      primary:
        "bg-primary-500 border border-primary-500 hover:bg-primary-600 text-white",
      secondary:
        "bg-secondary-500 border border-secondary-500 hover:bg-secondary-600 text-white",
      blue: "bg-blue-500 border border-blue-500 hover:bg-blue-600 text-white",
      red: "bg-red-500 border border-red-500 hover:bg-red-600 text-white",
      gray: "bg-gray-500 border border-gray-500 hover:bg-gray-600 text-white",
      slate:
        "bg-slate-500 border border-slate-500 hover:bg-slate-600 text-white",
      green:
        "bg-green-500 border border-green-500 hover:bg-green-600 text-white",
      purple:
        "bg-purple-500 border border-purple-500 hover:bg-purple-600 text-white",
      teal: "bg-teal-500 border border-teal-500 hover:bg-teal-600 text-white",
      pink: "bg-pink-500 border border-pink-500 hover:bg-pink-600 text-white",
      yellow:
        "bg-yellow-500 border border-yellow-500 hover:bg-yellow-600 text-white",
      indigo:
        "bg-indigo-500 border border-indigo-500 hover:bg-indigo-600 text-white",
      cyan: "bg-cyan-500 border border-cyan-500 hover:bg-cyan-700 text-white",
      light: "bg-transparent border border-transparent",
      white: "bg-white border border-white",
    };
    const outlineColors = {
      primary:
        "border border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-white",
      secondary:
        "border border-secondary-500 hover:bg-secondary-500 text-secondary-500 hover:text-white",
      blue: "border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white",
      red: "border border-red-500 hover:bg-red-500 text-red-500 hover:text-white",
      gray: "border border-gray-500 hover:bg-gray-500 text-gray-500 hover:text-white",
      slate:
        "border border-slate-500 hover:bg-slate-500 text-slate-500 hover:text-white",
      green:
        "border border-green-500 hover:bg-green-500 text-green-500 hover:text-white",
      purple:
        "border border-purple-500 hover:bg-purple-500 text-purple-500 hover:text-white",
      teal: "border border-teal-500 hover:bg-teal-500 text-teal-500 hover:text-white",
      pink: "border border-pink-500 hover:bg-pink-500 text-pink-500 hover:text-white",
      yellow:
        "border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-white",
      indigo:
        "border border-indigo-500 hover:bg-indigo-500 text-ndigo-500 hover:text-white",
      cyan: "border border-cyan-500 hover:bg-cyan-500 text-cyan-500 hover:text-white",
      transparent: "bg-transparent border border-transparent",
      white: "bg-white border border-white",
    };
    const iconColors = {
      blue: "text-blue-500 hover:bg-blue-100",
      red: "text-red-500 hover:bg-red-100",
      gray: "text-gray-500 hover:bg-gray-100",
      slate: "text-slate-500 hover:bg-slate-100",
      green: "text-green-500 hover:bg-green-100",
      purple: "text-purple-500 hover:bg-purple-100",
      teal: "text-teal-500 hover:bg-teal-100",
      pink: "text-pink-500 hover:bg-pink-100",
      yellow: "text-yellow-500 hover:bg-yellow-100",
      indigo: "text-indigo-500 hover:bg-indigo-100",
      cyan: "text-cyan-500 hover:bg-cyan-100",
      primary: "text-primary-500 hover:bg-primary-100",
      white: "text-white hover:bg-primary-100/10",
    };
    return {
      sizes,
      iconSizes,
      roundeds,
      colors,
      outlineColors,
      iconColors,
      tag: "router-link",
    };
  },
  computed: {
    isExternalLink() {
      return typeof this.to === "string" && this.to.startsWith("https");
    },
    colorClasses() {
      return !this.text
        ? this.icon
          ? `${this.iconSizes[this.size]} items-center justify-center ${
              this.iconColors[this.color]
            }`
          : this.outline
          ? this.outlineColors[this.color]
          : this.colors[this.color]
        : "hover:bg-blue-50";
    },
    sizeClasses() {
      return !this.text ? this.sizes[this.size] : "p-2";
    },
    roundedClasses() {
        
      return this.icon ? "rounded-full" : this.roundeds[this.rounded];
    },
    linkType() {
      return this.to ? this.tag : "button";
    },
    classes() {
      return twMerge(
        `transition-all inline-flex justify-center whitespace-pre items-center gap-x-2 no-underline ${this.colorClasses}`,
        this.$attrs.class
      );
    },
  },
};
</script>
