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
    path: '/reviews',
    name: 'Reviews',
    meta: {
      auth: true
    },
    component: () => import('../views/ReviewViews/Reviews.vue')
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
  {
    path: '/boardgames/profile/:id',
    name: 'BoardgameProfile',
    meta: {
      auth: true
    },
    component: () => import('../views/BoardgamesViews/BoardgameProfile.vue')
  },
  {
    path: '/reviews/profile/:id',
    name: 'ReviewsProfile',
    meta: {
      auth: true
    },
    component: () => import('../views/ReviewViews/ReviewProfile.vue')
  },
  {
    path: '/boardgames/edit/:id',
    name: 'EditBoardgame',
    meta: {
      auth: true
    },
    component: () => import('../views/BoardgamesViews/EditBoardgame.vue')
  },
  {
    path: '/addreview',
    name: 'AddReview',
    meta: {
      auth: true
    },
    component: () => import('../views/ReviewViews/AddReview.vue')
  },
  {
    path: '/reviews/edit/:id',
    name: 'Editreview',
    meta: {
      auth: true
    },
    component: () => import('../views/ReviewViews/EditReview.vue')
  },
  {
    path: '/debtors',
    name: 'Debtors',
    meta: {
      auth: true
    },
    component: () => import('../views/DebtorViews/Debtors.vue')
  },
  {
    path: '/adddebtor',
    name: 'AddDebtor',
    meta: {
      auth: true
    },
    component: () => import('../views/DebtorViews/Adddebtor.vue')
  },
  {
    path: '/debtors/edit/:id',
    name: 'EditDebtor',
    meta: {
      auth: true
    },
    component: () => import('../views/DebtorViews/Editdebtor.vue')
  },
  {
    path: '/comments',
    name: 'Comments',
    meta: {
      auth: true
    },
    component: () => import('../views/CommentViews/Comments.vue')
  },
  {
    path: '/comments/edit/:id',
    name: 'EditComment',
    meta: {
      auth: true
    },
    component: () => import('../views/CommentViews/Editcomment.vue')
  },
  {
    path: '/addgame',
    name: 'AddGame',
    meta: {
      auth: true
    },
    component: () => import('../views/GameViews/Addgame.vue')
  },
  {
    path: '/games/edit/:id',
    name: 'EditGame',
    meta: {
      auth: true
    },
    component: () => import('../views/GameViews/Editgame.vue')
  },
  {
    path: '/players/of/:id',
    name: 'PlayersOf',
    meta: {
      auth: true
    },
    component: () => import('../views/GameViews/Playersof.vue')
  },
  {
    path: '/games/addplayer/:id',
    name: 'AddPlayer',
    meta: {
      auth: true
    },
    component: () => import('../views/GameViews/Addplayer.vue')
  },
  {
    path: '*',
    meta: {
      auth: true
    },
    redirect: '/'   
  },
  {
    path: '/posts',
    name: 'AdminPosts',
    meta: {
      auth: true
    },
    component: () => import('../views/PostViews/Posts.vue') 
  },
  {
    path: '/likes',
    name: 'AdminLikes',
    meta: {
      auth: true
    },
    component: () => import('../views/LikesViews/Likes.vue') 
  },
  {
    path: '/addpost',
    name: 'AddPosts',
    meta: {
      auth: true
    },
    component: () => import('../views/PostViews/Addpost.vue') 
  },
  {
    path: '/posts/edit/:id',
    name: 'EditPost',
    meta: {
      auth: true
    },
    component: () => import('../views/PostViews/Editpost.vue') 
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