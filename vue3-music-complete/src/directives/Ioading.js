// 全局 loading 指令
// 覆盖在指定DOM的父容器内，当数据加载完毕的时候，隐藏loading

import { watch } from 'vue'
import { useInterval } from '@vueuse/core'

// 指令使用  v-loading="data"   监听data数据的变化，当数据存在了，就隐藏loading， 也需要考虑到真的没有该数据，也要隐藏loading
export default {
  beforeMount(el, binding) {
    const parent = el
    parent.classList.add('relative', 'py-10')

    const loading = document.createElement('div')
    loading.className =
      'v-loading absolute z-50 left-0 top-0 w-full h-full bg-slate-800 flex justify-center items-center'
    loading.innerHTML = `
      <i class="fas fa-spinner fa-spin text-5xl"></i>
    `
    parent.append(loading)

    const { counter, reset, pause } = useInterval(1000, { controls: true })
    watch(counter, (newVal) => {
      console.log('watch counter ', newVal)

      const data = Object.keys(binding.value).length
      // 当数据来啦，或者超时了都没有数据，就要重置计数器，并隐藏loading
      if (data || (!data && newVal >= 5)) {
        reset()
        pause()
        el.querySelector('.v-loading')?.remove()
        el.classList.remove('relative', 'py-10')
      }
    })

    // 等同于 updated 钩子函数
    // watchEffect(() => {
    //   console.log(binding.value)

    //   const data = Object.keys(binding.value).length
    //   console.log('watchEffect ', data)
    //   if (data) {
    //     el.querySelector('.v-loading')?.remove()
    //     el.classList.remove('relative', 'py-10')
    //   }
    // })

    // 等同于 updated 钩子函数，但是比较消耗性能
    // const watchData = () => {
    //   const data = Object.keys(binding.value).length
    //   console.log('检测到数据', data)

    //   if (data) {
    //     loading.remove()
    //     parent.classList.remove('relative', 'py-10')
    //     cancelAnimationFrame(cancelAni)
    //   } else {
    //     cancelAni = requestAnimationFrame(watchData)
    //   }
    // }
    // let cancelAni = requestAnimationFrame(watchData)
  },
  updated(el, binding) {
    const data = Object.keys(binding.value).length
    // console.log('updated ', binding.value, data)
    if (data) {
      el.querySelector('.v-loading')?.remove()
      el.classList.remove('relative', 'py-10')
    }
  }
}
