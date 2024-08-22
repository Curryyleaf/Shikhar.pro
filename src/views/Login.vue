<template>
  <div
    class="flex justify-center items-center h-screen bg-slate-600"
    role="main"
  >
    <form
      @submit.prevent="login"
      class="bg-white p-8 rounded-lg shadow-lg"
      aria-labelledby="login-form"
    >
      <h1 id="login-form" class="text-2xl font-bold mb-4">Login</h1>
      <InputField
        v-model="username"
        type="text"
        placeholder="Username"
        class="mb-4"
        aria-label="Username"
        data-input="userCredential"
      ></InputField>
      <InputField
        v-model="password"
        type="password"
        labels="password"
        placeholder="Password"
        class="mb-4"
        aria-label="Password"
      ></InputField>
      <button
        type="submit"
        class="w-full bg-cyan-500 text-white py-2 rounded-md"
        aria-label="Submit"
      >
        Login
      </button>
      <p
        v-if="error"
        class="text-red-600 text-2xl"
        aria-live="assertive"
        aria-label="Error message"
      >
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import InputField from "../components/InputField.vue";

export default {
  components: {
    InputField,
  },
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      console.log(import.meta.env.VITE_API_BASE_URL);
      if(this.username=="" ||this.password=="" ){
         this.error='Username or Password is empty'
      }
      if (this.error) {
        return;
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
          {
            username: this.username,
            password: this.password,
          }
        );
        const { token } = response.data;
        console.log("userLogged in ", response);
        localStorage.setItem("token", token);
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error("Login failed:", error);
        this.username=''
        this.password=''
        if (error.response && error.response.data) {
          this.error =
            error.response.data.message||"username or password is incorrect";
        } else {
          this.error = "Network Error , Please try again ";
        }
      }
    },
  },
};
</script>

<style>
/* Your styles here */
</style>
