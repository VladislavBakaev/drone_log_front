import { createRouter, createWebHistory } from 'vue-router'
import AllMission from '@/views/AllMissionPage.vue'
import MissionCreate from '@/views/NewMissionPage.vue'
import LogCreate from '@/views/NewLogsPage.vue'
import MissionPage from '@/views/MissionPage.vue'

const routes = [
  {
    path: '/',
    name: 'AllMission',
    component: AllMission
  },
  {
    path: '/mission_create',
    name: 'MissionCreate',
    component: MissionCreate
  },
  {
    path: '/log_create',
    name: 'LogCreate',
    component: LogCreate
  },
  {
    path: '/mission/:id',
    component: MissionPage
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
