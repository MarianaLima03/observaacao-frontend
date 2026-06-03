import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CidadaoView from '../views/CidadaoView.vue'
import ConsultarView from '../views/ConsultarView.vue'
import ConsultarCpfView from '../views/ConsultarCpfView.vue'
import GestorView from '../views/GestorView.vue'

const routes = [
  { path: '/',                component: HomeView },
  { path: '/login',           component: LoginView },
  { path: '/cidadao',         component: CidadaoView },
  { path: '/consultar',       component: ConsultarView },
  { path: '/consultar-cpf',   component: ConsultarCpfView },
  { path: '/gestor',          component: GestorView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
