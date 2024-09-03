<script>
export default {
  data() {
    return {
      flag: false,
    }
  },
  methods: {
    beforeEnter(el) {
      console.log('beforeEnter ', el)
    },
    enter(el) {
      console.log('enter', el)
      // el.animate([{ transform: 'scale(0)' }, {}], { duration: 1000 }).onfinish =
      //   () => {
      //     done()
      //   }
    },
    afterEnter(el) {
      console.log('afterEnter', el)
    },
    beforeLeave(el) {
      console.log('beforeLeave', el)
    },
    leave(el) {
      console.log('leave', el)
      // el.animate([{}, { transform: 'scale(0)' }], { duration: 1000 }).onfinish =
      //   () => {
      //     done()
      //   }
    },
    afterLeave(el) {
      console.log('afterLeave', el)
    },
  },
}
</script>

<template>
  <button @click="flag = !flag">切 换</button>

  <transition
    :css="true"
    name="zoom"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
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
