import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import About from '../components/about.vue'
import Contact from '../components/contact.vue'
import Person from '../components/person.vue'
import Profile from '../components/profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/person/:id',
      name: 'person',
      component: Person
    },
    {
      path:'/profile/:id',
      name:'profile',
      component:Profile
    }
  ]
})
