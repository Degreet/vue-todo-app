import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Reg from '../views/Reg'
import Login from '../views/Login'
import Todos from '../views/Todos'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
