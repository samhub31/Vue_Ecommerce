<template>
  <div>
    <NavedBar @search-results="setSearchResults" />
    <h1>Featured Products</h1>
    <div class="products">
      <div v-for="product in products" :key="product._id" class="product-card">
        <img class="product-image" :src="product.image" :alt="product.name">
        <div class="product-details">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">${{ product.price }}</div>
          <p class="product-description">{{ product.description }}</p>
          <button class="add-to-cart" @click="deleteProduct(product._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
       import NavedBar from '../components/NavedBar.vue'

export default {
  name: 'HomePage',
  components: {
    NavedBar
  },
  data() {
    return {
      products: []
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/signin');
    } else {
      this.fetchProducts(token);
    }
  },
  methods: {
    async fetchProducts(token) {
      try {
        const response = await axios.get('http://localhost:5000/api/product/getProduct', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.products = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$router.push('/signin');
        } else {
          console.error('Error fetching products:', error);
        }
      }
    },
    async deleteProduct(productId) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/signin');
        return;
      }

      try {
        await axios.delete(`http://localhost:5000/api/product/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.products = this.products.filter(product => product._id !== productId);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$router.push('/signin');
        } else {
          console.error('Error deleting product:', error);
        }
      }
    },
    setSearchResults(results) {
      this.products = results;
    }
  }
};
</script>

