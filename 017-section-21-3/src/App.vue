<template>
  <p ref="msg">{{ name }}</p>
  <button @click="add">Click</button>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const name = ref('zs')
    const msg = ref(null)
    const add = () => {
      name.value = 'lisi'
      console.log(msg.value)
    }

    return {
      name,
      add,
      msg,
    }
  },
}
</script>
