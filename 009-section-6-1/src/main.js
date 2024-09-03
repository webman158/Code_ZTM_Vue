import { createApp } from 'vue'
import App from './App.vue'

// import Greeting from '@/components/Greeting.vue'

const vm = createApp(App)

// 注册为全局组件使用
// vm.component('Greeting', Greeting)

vm.mount('#app')
