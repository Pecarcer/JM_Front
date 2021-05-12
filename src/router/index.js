import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      auth: true
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/users',
    name: 'Users',
    meta: {
      auth: true
    },
    component: () => import('../views/Users.vue')
  },
  {
    path: '/boardgames',
    name: 'Boardgames',
    meta: {
      auth: true
    },
    component: () => import('../views/Boardgames.vue')
  },
  {
    path: '/reviews',
    name: 'Reviews',
    meta: {
      auth: true
    },
    component: () => import('../views/Reviews.vue')
  },
  {
    path: '/rooms',
    name: 'Rooms',
    meta: {
      auth: true
    },
    component: () => import('../views/Rooms.vue')
  },
  {
    path: '/games',
    name: 'Games',
    meta: {
      auth: true
    },
    component: () => import('../views/Games.vue')
  },
  {
    path: '/myprofile',
    name: 'Profile',
    meta: {
      auth: true
    },
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login')
    return
  }
  next()
})

export default router