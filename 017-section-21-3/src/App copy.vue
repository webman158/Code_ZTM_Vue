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
  <p>{{ info.time }}</p>
  <p>{{ time }}</p>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'

export default {
  name: 'App',
  setup() {
    const num = ref(0)
    const add = () => num.value++

    const info = ref({
      title: 'is me',
      time: '2023',
    })

    const user = reactive({
      name: 'lw',
      age: 20,
    })

    setTimeout(() => {
      user.name = 'xl'

      info.value.time = '2024'
    }, 3000)

    return {
      num,
      add,
      user,
      ...toRefs(user),
      info,
      ...toRefs(info.value),
    }
  },
}
</script>
