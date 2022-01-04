import { createApp } from 'vue'
import App from './App.vue'
import VueStorage from '../../src'

createApp(App)
  .use(VueStorage, { namespace: 'VueStorage__', name: 'vst', storage: 'local' })
  .mount('#app')
