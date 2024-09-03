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
  <button @click="flag = !flag">切 换</button>

  <transition name="zoom" type="transition">
    <h3 v-if="flag">zoom 动画</h3>
  </transition>
</template>

<style>
h3 {
  width: 400px;
  margin: 20px;
  padding: 20px;
}

.zoom-enter-active {
  animation: zoom 1s;
  transition: all 2s;
}

.zoom-leave-active {
  animation: zoom 1s forwards reverse;
  transition: all 2s;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
