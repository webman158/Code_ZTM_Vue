<template>
  <p>{{ num }}</p>
  <button @click="add">click me</button>

  <hr />
  <p>{{ user }}</p>
  <p>{{ user.name }}</p>
  <p>{{ user.age }}</p>

  <hr />
  <p>{{ name }}</p>

  <hr />
  <p>
    <input type="text" v-model="word" />
  </p>
  <p>{{ reverse }}</p>
</template>

<script>
import { ref, reactive, toRefs, watch, watchEffect } from 'vue'

export default {
  name: 'App',
  setup() {
    const num = ref(0)
    const add = () => num.value++

    const user = reactive({
      name: 'lw',
      age: 20,
    })
    setTimeout(() => {
      user.name = 'xl'
    }, 3000)

    const word = ref('')
    const reverse = ref('')

    // watchEffect(() => {
    //   reverse.value = [...word.value].reverse().join('')
    // })

    watch(word, (val) => {
      reverse.value = [...val].reverse().join('')
    })

    return {
      num,
      add,
      user,
      ...toRefs(user),
      word,
      reverse,
    }
  },
}
</script>
