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

  <transition name="fade">
    <h3 v-if="flag">淡入淡出的带动画</h3>
  </transition>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}
</style>
