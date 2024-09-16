<template>
  <button :type="btnType"  @click="handleClick" class=" p-2 text-xs bg-black text-gray-300 rounded-lg ">
    {{ btnText }}
  </button>
</template>
<script>


export default {
  props: {
    btnText: {
      type: String,
      default: "",
    },
    eventName:{
      type:String,
      default:''
    } ,
    btnType: {
      type: String,
      default: "",
    },
    id:{
     type:Number
    } ,
    class: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "",
    },
  },
  computed: {
    iD(){
      return this.id
    },
    returnEventName(){
    return this.eventName
    } ,
    computedClass() {
      let baseClasses = "";
      switch (this.props.theme) {
        case "dark":
          baseClasses += "  p2 bg-gray-800 text-white";
          break;
        case "light":
          baseClasses += " p2  bg-white text-black";
          break;
        case "primary":
          baseClasses += " p2  bg-blue-500 text-white";
          break;
        default:
          baseClasses += " p2  bg-gray-200 text-black";
          break;
      }
      return `${baseClasses} ${this.props.class}`;
    },
  },
  methods:{
    handleClick(event){
    this.$emit('buttonClick' ,event , this.returnEventName  , this.iD)
    console.log('eventNme' , this.returnEventName);
    console.log('eventName' , this.eventName);
    
    } ,
async    mounted(){
  await  this.id
  await this.eventName
  console.log('id3' , this.id);
  
    }
  }
};
</script>
