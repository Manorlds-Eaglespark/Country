import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '@/components/Intro'
import Login from '@/components/Login'
import Register from '@/components/Register'
import IntroSlides from '@/components/IntroSlides'
import Home from '@/components/Home'
import Account from '@/components/Account'
import NewPost from '@/components/NewPost'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/post',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/introSlides',
      name: 'IntroSlides',
      component: IntroSlides
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
