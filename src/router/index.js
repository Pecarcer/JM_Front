import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/PostViews/Home.vue'
import Register from '../views/UnauthorizedViews/Register.vue'

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
    component: () => import('../views/UnauthorizedViews/Login.vue')
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
    component: () => import('../views/UserViews/Users.vue')
  },
  {
    path: '/adduser',
    name: 'Adduser',
    meta: {
      auth: true
    },
    component: () => import('../views/UserViews/AddUser.vue')
  },
    {
    path: '/users/edit/:id',
    name: 'Edituser',
    meta: {
      auth: true
    },
    component: () => import('../views/UserViews/EditUser.vue')
  },
  {
    path: '/boardgames',
    name: 'Boardgames',
    meta: {
      auth: true
    },
    component: () => import('../views/BoardgamesViews/Boardgames.vue')
  },
  {
    path: '/addboardgame',
    name: 'Addboardgame',
    meta: {
      auth: true
    },
    component: () => import('../views/BoardgamesViews/AddBoardgame.vue')
  },
  {
    path: '/editboardgame',
    name: 'EditBoardgame',
    meta: {
      auth: true
    },
    component: () => import('../views/BoardgamesViews/EditBoardgame.vue')
  },
  {
    path: '/reviews',
    name: 'Reviews',
    meta: {
      auth: true
    },
    component: () => import('../views/ReviewViews/Reviews.vue')
  },
  {
    path: '/rooms',
    name: 'Rooms',
    meta: {
      auth: true
    },
    component: () => import('../views/RoomViews/Rooms.vue')
  },
  {
    path: '/games',
    name: 'Games',
    meta: {
      auth: true
    },
    component: () => import('../views/GameViews/Games.vue')
  },
  {
    path: '/myprofile',
    name: 'Myprofile',
    meta: {
      auth: true
    },
    component: () => import('../views/UserViews/OwnProfile.vue')
  },
  {
    path: '/users/profile/:id',
    name: 'Profile',
    meta: {
      auth: true
    },
    component: () => import('../views/UserViews/Profile.vue')
  },
  {
    path: '/editMyself',
    name: 'EditMyself',
    meta: {
      auth: true
    },
    component: () => import('../views/UserViews/EditMyself.vue')
  },

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