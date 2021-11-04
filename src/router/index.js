import { createRouter, createWebHistory } from 'vue-router'
import MainMapMission from "@/views/MainMapMission.vue"

const routes = [
  {
    path: '/',
    name: 'MainMapMission',
    component: MainMapMission
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
