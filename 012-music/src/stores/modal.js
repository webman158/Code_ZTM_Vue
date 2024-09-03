// 模态框仓库

import { defineStore } from 'pinia'

const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    tab: 'login'
  }),
  getters: {
    // 计算模态框的是否需要隐藏的类名
    toggleClass() {
      return { hidden: !this.isOpen }
    }
  },
  actions: {
    toggle(tab) {
      // 类似 getter，action 也可通过 this 访问整个 store 实例
      // action 可以是异步的，你可以在它们里面 await 调用任何 API
      this.isOpen = !this.isOpen
      this.toggleTab(tab)

      if (this.isOpen) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = ''
      }
    },
    toggleTab(value) {
      this.tab = value
    }
  }
})

export default useModalStore
