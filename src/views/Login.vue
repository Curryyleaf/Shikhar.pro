<template>
  <div class="flex justify-center items-center h-screen bg-slate-600">
    <form @submit.prevent="login" class="bg-white p-8 rounded-lg shadow-lg">
      <InputField
        v-model="username"
        type="text"
        label="Username"
        class="mb-4"
      ></InputField>
      <InputField
        v-model="password"
        type="password"
        label="Password"
        class="mb-4"

      ></InputField>
      <button type="submit" class="w-full bg-cyan-500 text-white py-2 rounded-md">
        Login
      </button>
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
    };
  },
  methods: {
    async login() {
      console.log(import.meta.env.VITE_API_BASE_URL);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
          {
            username: this.username,
            password: this.password,
          }
        );
        const { token } = response.data;
        console.log("userLogged in " ,response);
        localStorage.setItem("token", token);
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  },
};
</script>


<style>

</style>
