import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  // Здесь можно добавить логирование ошибок
  console.error('Глобальная ошибка:', err)
}

app.mount('#app')
