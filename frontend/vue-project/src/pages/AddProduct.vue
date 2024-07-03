<template>
  <NavedBar @search-results="setSearchResults" />
  <div class="container">
    <form @submit.prevent="uploadProduct">
      <h2>Add Products</h2>
      <div class="form-control">
        <label for="image">Image</label>
        <input type="file" id="image" @change="onFileChange" accept="image/*" required>
      </div>
      <div class="form-control">
        <label for="name">Product Name</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-control">
        <label for="price">Price</label>
        <input type="number" id="price" v-model="price" required>
      </div>
      <div class="form-control">
        <label for="desc">Description</label>
        <input type="text" id="desc" v-model="desc" required>
      </div>
      <button type="submit">Upload</button>
      <p v-if="message" :class="{'error': error, 'success': !error}">{{ message }}</p>
    </form>
  </div>
</template>

  
<script>
import axios from 'axios';
import NavedBar from '../components/NavedBar.vue'

export default {
  name: 'AddProduct',
  components: {
    NavedBar
  },
  data() {
    return {
      image: null,
      name: '',
      price: '',
      desc: '',
      message: '',
      error: false
    };
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/signin'); // Redirect to signin page if not authenticated
    } else {
      next();
    }
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
    },
    async uploadProduct() {
      if (!this.image) {
        this.message = 'Please select an image.';
        this.error = true;
        return;
      }
      try {
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('name', this.name);
        formData.append('price', this.price);
        formData.append('desc', this.desc);

        await axios.post('http://localhost:5000/api/product/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.message = 'Product uploaded successfully!';
        this.error = false;
        this.clearForm();
      } catch (error) {
        this.message = 'Error uploading product: ' + (error.response.data.message || error.message);
        this.error = true;
      }
    },
    clearForm() {
      this.image = null;
      this.name = '';
      this.price = '';
      this.desc = '';
    }
  }
};
</script>

