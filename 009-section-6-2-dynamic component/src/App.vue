<script>
import Hello from '@/components/Hello.vue'
import About from '@/components/About.vue'

export default {
  name: 'App',
  components: {
    Hello,
    About,
  },
  data() {
    return {
      compName: 'Hello',
    }
  },
}
</script>

<template>
  <select name="" id="" v-model="compName">
    <option value="Hello">Hello 组件</option>
    <option value="About">About 组件</option>
  </select>

  <hr />

  <!-- 
    is 属性值是 组件名（全局或局部注册的组件名） 
    当组件被切换出，该组件会被卸载掉，组件中的数据不可使用，当组件被切换回来的时候，组件的数据会被重置为初始值

    keep-alive 组件会将切换出去的组件缓存到内存中，如果该组件被切换回来的时候，会使用内存中的组件，而不是创建新组件
  -->
  <keep-alive>
    <component :is="compName"></component>
  </keep-alive>
</template>
