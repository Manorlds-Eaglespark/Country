import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NewPost from '@/components/NewPost'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
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
    }, {
      path: '/newPost',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})

