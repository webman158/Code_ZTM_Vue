// 模态框仓库

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const tab = ref('login')

  // 计算模态框的是否需要隐藏的类名

  const toggleClass = computed(() => {
    return { hidden: !isOpen.value }
  })

  const toggleModal = (tab) => {
    // 类似 getter，action 也可通过 this 访问整个 store 实例
    // action 可以是异步的，你可以在它们里面 await 调用任何 API
    isOpen.value = !isOpen.value
    toggleTab(tab)

    if (isOpen.value) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
  }

  const toggleTab = (value) => {
    tab.value = value
  }

  return {
    isOpen,
    tab,
    toggleClass,
    toggleModal,
    toggleTab
  }
})

export default useModalStore
