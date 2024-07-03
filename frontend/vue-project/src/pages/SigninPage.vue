<template>
  <div class="container">
    <form id="register-form" @submit.prevent="signIn">
      <h2>Login</h2>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn">Login</button>
      <h4>if you haven't registerd with us,<router-link to="/signup">Click here</router-link></h4>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SigninPage',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post('http://localhost:5000/api/user/signin', {
          email: this.email,
          password: this.password
        });

        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(user));

        this.$router.push('/');
      } catch (error) {
        this.error = error.response?.data?.message || 'An error occurred while logging in.';
      }
    },
  }
};
</script>

