<template>
  <div>
    <form action="" @submit.prevent="signUp">
      <div>
        <ul class="font-bold">
          <li>
            <label for="email">email</label>
            <input type="email" />
          </li>
          <li>
            <label for="username">username</label>
            <input type="text" />
          </li>
          <li>
            <label for="password">password</label>
            <input type="password" />
          </li>
          <li class="flex border border-gray-400">
            <fieldset>
              <p class="flex justify-center text-center items-center font-bold">
                Name
              </p>
              <div class="">
                <label for="firstname">firstname</label>
                <input type="text" />
              </div>
              <div>
                <label for="lastname">lastname</label>
                <input type="text" />
              </div>
            </fieldset>
          </li>
          <li class="flex border border-gray-400">
            <fieldset>
              <h3
                class="flex justify-center text-center font-bold h-full items-center w-28"
              >
                Address
              </h3>
              <div class="">
                <label for="city">city</label>
                <input type="text" name="city" id="city" />
              </div>
              <div>
                <label for="street">street</label>
                <input type="text" name="street" id="street" />
              </div>
              <div>
                <label for="number">number</label>
                <input type="number" name="number" id="number" />
              </div>
              <div>
                <label for="zipcode">zipcode</label>
                <input type="number" name="zipcode" id="zipcode" />
              </div>
              <fieldset class="border border-gray-400">
                <p class="font-semibold">Geolocation</p>
                <div>
                  <label for="lat">lat</label>
                  <input type="number" />
                </div>
                <div>
                  <label for="long">long</label>
                  <input type="number" />
                </div>
              </fieldset>
            </fieldset>
          </li>

          <li>
            <label for="phone">Phone</label>
            <input type="number" />
          </li>
        </ul>
      </div>
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      name: {
        firstname: "",
        lastname: "",
      },
      address: {
        city: "",
        street: "",
        number: "",
        zipcode: "",
        geolocation: {
          lat: "",
          long: "",
        },
      },
    };
  },
  methods: {
   async signUp(){
       try {
        const response = axios.post('https://fakestoreapi.com/users' , {
          email:this.email,
          username:this.username ,
          password:this.password ,
          name:{
            firstname:this.firstname  ,
            lastname: this.lastname
          } ,
          address:{
            city:this.city,
            street:this.street ,
            number:this.number  ,
            zipcode:this.zipcode ,
            geolocation:{
              lat:this.lat ,
              long:this.long
            }
          }
        }) 
        console.log(await(response));
       } catch (error) {
        
       }
    }
  },

  
};
</script>
