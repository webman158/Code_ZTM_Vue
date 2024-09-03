<script>
export default {
  data() {
    return {
      flag: false,
      list: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    add() {
      const num = Math.floor(Math.random() * 100 + 1)
      const index = Math.floor(Math.random() * this.list.length)
      this.list.splice(index, 0, num)
    },
    remove(index) {
      this.list.splice(index, 1)
    },
  },
}
</script>

<template>
  <button @click="add">随机添加新数据到随机位置</button>
  <ul>
    <transition-group
      name="bounce"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__flipOutX"
    >
      <li v-for="(item, index) in list" :key="item">
        {{ item }}

        <span @click="remove(index)">×</span>
      </li>
    </transition-group>
  </ul>
</template>

<style>
h3 {
  width: 400px;
  margin: 20px;
  padding: 20px;
}

.zoom-enter-active {
  animation: zoom 0.5s;
  transition: all 0.5s;
}

.zoom-leave-active {
  animation: zoom 0.5s forwards reverse;
  transition: all 0.5s;
  position: absolute;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}

.zoom-move,
.bounce-move {
  transition: all 0.5s linear;
}

.animate__flipOutX {
  position: absolute;
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
