import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";
// import './style.css'
import App from './App.vue'
import router from './router'
import MediaclipHubApi from './api'

createApp(App).use(router).use(MediaclipHubApi).mount('#app')
