import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App)
app.component('datepicker', Datepicker)

app
              .use(store)
              .use(router)
              .mount('#app')
