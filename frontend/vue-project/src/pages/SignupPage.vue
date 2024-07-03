<template>

    <div class="container">
        <form id="register-form"  @submit.prevent="signUp">
          <h2>Register</h2>
          <div class="form-control">
            <label for="username">Username</label>
            <input type="text" id="username"  v-model="name" required>
          </div>
          <div class="form-control">
            <label for="email">Email</label>
            <input type="email" id="email"  v-model="email" required>
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password"  v-model="password" required>
          </div>
          <button type="submit" class="btn">Register</button>
          <h4>Already registerd with us,<router-link to="/signin">Click here</router-link></h4>
        </form>
      </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'SignupPage',
    data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post('http://localhost:5000/api/user/signup', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        console.log(response.data);
        this.$router.push('/signin'); 
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
}
</script>