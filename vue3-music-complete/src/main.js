import 'animate.css'
import './assets/base.css'
import './assets/main.css'

// 进度条样式
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 自动将 locales 目录下的语言包 注册为全局语言包
import i18n from './utils/i18n'

// 自动将 components/base 目录下的组件 注册为全局组件
import global from './utils/global'

// 自定义表单校验插件
import VeeValidatePlugin from '@/utils/validator'

import { auth } from './utils/firebase'

// 进度条
import '@/utils/progressBar'

// 自定义指令
import Icon from './directives/Icon'
import Loading from './directives/Ioading'

let app
auth.onAuthStateChanged(() => {
  if (app) return

  app = createApp(App)

  app.directive('icon', Icon)
  app.directive('loading', Loading)

  app.use(createPinia())
  app.use(router)
  app.use(i18n)
  app.use(global)
  app.use(VeeValidatePlugin)

  app.mount('#app')
})
