<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    require: true
  },
  // 格式化菜单内容函数
  format: {
    type: Function
  }
})
const emits = defineEmits(['clickMenu'])

const showMenu = ref(false)

let timerID = null
const enterMenu = () => {
  clearTimeout(timerID)
  showMenu.value = true
}
const leaveMenu = () => {
  clearTimeout(timerID)
  timerID = setTimeout(() => {
    showMenu.value = false
  }, 300)
}

const clickMenu = (id) => {
  // 处理菜单的高亮
  props.list.forEach((item) => {
    item.active = false
    if (item.id === id) {
      item.active = true
    }
  })
  emits('clickMenu', id)
}
</script>

<template>
  <div @mouseenter="enterMenu" @mouseleave="leaveMenu">
    <slot></slot>
  </div>

  <transition
    enter-active-class="animate__animated animate__fadeInUp animate_s"
    leave-active-class="animate__animated animate__fadeOutDown animate_s"
  >
    <div
      v-show="showMenu"
      @mouseenter="enterMenu"
      @mouseleave="leaveMenu"
      class="bg-white dark:bg-gray-600 rounded p-2 absolute top-7 right-0 z-50 shadow-md shadow-gray-500"
    >
      <p
        class="cursor-pointer p-1"
        v-for="(item, index) in list"
        :key="item.id"
        :class="{
          'text-yellow-500': item.active,
          'border-solid border-b-2': index !== list.length - 1
        }"
        @click.prevent="clickMenu(item.id)"
      >
        {{ format ? format(item.name) : item.name }}
      </p>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.animate_s {
  animation-duration: 0.3s;
}
</style>
