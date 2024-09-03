import 'animate.css'
// tailwindcss 基础样式
import './assets/base.css'
// 项目样式
import './assets/main.css'
// 进度条样式
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './plugins/validator'
import { auth } from './plugins/firebase'
import Icon from './directives/Icon'
import loading from './directives/loading'

import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'

// 开启 Service Worker 注册功能，并自动注册 Service Worker 文件
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

// 自动注册全局组件
import GlobalComponent from './plugins/global'
// 进度条
import '@/plugins/progressBar'

let app
auth.onAuthStateChanged(() => {
  if (app) return

  app = createApp(App)

  app.use(router)
  app.use(createPinia())
  app.use(VeeValidatePlugin, { name: 'li' })
  app.use(GlobalComponent)
  app.use(i18n)
  app.directive('icon', Icon)
  app.directive('loading', loading)

  app.mount('#app')
})
