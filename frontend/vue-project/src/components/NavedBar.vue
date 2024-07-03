<template>
    <div class="navbar">
      <div class="logo">
        <router-link to="/">Vue<img src="../assets/logo.png" alt="Logo" width="50%"></router-link>
      </div>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search...">
        <button @click="searchProducts">Search</button>
      </div>
      <div class="listing">
        <a href="#" @click.prevent="logout">Logout</a>
        <router-link to="/add-product">Add Product</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NavedBar',
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      async searchProducts() {
        try {
          const response = await axios.get('http://localhost:5000/api/product/search', {
            params: {
              query: this.searchQuery
            }
          });
          this.$emit('search-results', response.data);
        } catch (error) {
          console.error('Error searching products:', error);
        }
      },
      async logout() {
        try {
          await axios.post('http://localhost:5000/api/user/signout');
          localStorage.removeItem('token');  // Clear the token from local storage
          this.$router.push('/signin');      // Redirect to the sign-in page
        } catch (error) {
          console.error('Error logging out:', error);
        }
      }
    }
  };
  </script>