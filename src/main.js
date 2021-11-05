import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'vue3-date-time-picker/dist/main.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import Datepicker from 'vue3-date-time-picker';
import ModalCreateFormComponent from '@/components/UI/ModalCreateFormComponent.vue'



const app = createApp(App)
app.component('datepicker', Datepicker)
app.component('modal-create-form-component', ModalCreateFormComponent)

app
              .use(store)
              .use(router)
              .mount('#app')
