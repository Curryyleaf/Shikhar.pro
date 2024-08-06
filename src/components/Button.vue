<template >
  <div class="relative flex h-screen w-full justify-center items-center text-black text-6xl">
    <button :type="buttonType" @click="buttonFunction" class="text-black rounded-md px-2 py-1">
      {{ buttonText }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    buttonType: {
      default:'button' ,
      type:String
    },
    buttonText: {
      default:'Click',
      type:String
    },
    buttonFunction:{
      type:Function ,
      default:()=>{

      }
    },
  },
};
</script>
