import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import SigninPage from './pages/SigninPage.vue'
import SignupPage from './pages/SignupPage.vue'
import AddProduct from './pages/AddProduct.vue'
import HomePage from './pages/HomePage.vue'

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/signin',
        component: SigninPage,
    },{
        path: '/signup',
        component: SignupPage,
    },{

        path: '/add-product',
        component: AddProduct,
    }, {
        path: '/',
        component: HomePage,
    }]
}))
.mount('#app')
