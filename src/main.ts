import { createApp } from 'vue'
import './style.css'
import 'vue3-toastify/dist/index.css';
import App from './App.vue'
import router from './router';

createApp(App).use(router).mount('#app')


// const app = createApp(App);
// app.use(router);
// app.mount('#app');