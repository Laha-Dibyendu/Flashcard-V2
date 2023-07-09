import home from './components/home.js'
import signin from './components/signin.js'
import register from './components/register.js'
import decks from './components/decks.js'

import dashboard from './components/dashboard.js'

const routes = [
  //home route
  { path: '/', component: home },

  //sign route
  { path: '/signin', component: signin },


  { path: '/register', component: register },
  // { path: '/profile/:id', component: profile },

  { path: '/dashboard/:id', component: dashboard },
  
  { path: '/decks/:id', component: decks },
]

const router = new VueRouter({
  routes,
  base: '/',
})

export default router