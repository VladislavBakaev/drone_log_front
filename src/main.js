import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import ModalCreateFormComponent from '@/components/UI/ModalCreateFormComponent.vue'
import axios from 'axios'

const base = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API
  });

const app = createApp(App)
app.component('datepicker', Datepicker)
app.component('modal-create-form-component', ModalCreateFormComponent)

app
    .use(store)
    .use(router)
app.config.globalProperties.$http = base
app.mount('#app')