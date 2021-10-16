import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChannelDescription from '../components/ChannelDescription/ChannelDescription/ChannelDescription.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ChannelDescription/:id',
    name: 'ChannelDescription',
    component: ChannelDescription
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
