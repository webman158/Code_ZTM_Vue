<script>
export default {
  data() {
    return {
      flag: false,
    }
  },
}
</script>

<template>
  <button @click="flag = !flag">{{ flag ? '淡出' : '淡入' }}</button>

  <!-- <transition name="fade" :duration="3000">
    <h3 v-if="flag">淡入淡出的带动画</h3>
  </transition> -->

  <transition name="fade" mode="out-in" appear>
    <h3 v-if="flag">淡入淡出的带动画1</h3>
    <h3 v-else>淡入淡出的带动画2</h3>
  </transition>
</template>

<style>
body {
  overflow: hidden;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}
</style>
