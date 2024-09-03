<template>
  <div v-if="!flag" style="color: red">Name Changed</div>
</template>
<script>
import { computed } from 'vue'

export default {
  props: ['user'],
  setup(props) {
    // 由于setup 函数 是在组件创建之前执行的，那么无法使用this，就无法获取到 props 父传子的数据
    // 可以通过 setup函数的第一个参数 props 直接来使用
    const flag = computed(() => {
      return props.user.name === 'john'
    })

    return { flag }
  },
}
</script>
<style lang=""></style>
