import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: () => import('../components/ListTransaction')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../components/CreateTransaction')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/EditTransaction')
  },
  {
  path: '/resultado',
  name: 'resultado',
  component: () => import('../components/Resultado')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router