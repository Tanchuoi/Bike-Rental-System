import './assets/tailwind.css'

import App from './App.vue'
import { createApp } from 'vue'

import router from './router'
import { createPinia } from 'pinia'

import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})
app.use(ToastService)
app.use(router)

app.mount('#app')
