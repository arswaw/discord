import { createMemoryHistory, createRouter } from 'vue-router'
import { ref } from 'vue'

import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutPage.js'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
