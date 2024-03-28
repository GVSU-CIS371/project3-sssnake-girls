import { createApp } from 'vue'
import './styles/mug.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
/*
createApp(App)
    .use(createPinia())
    .mount('#app')
*/
const app = createApp(App)
app.use(createPinia()).mount('#app')