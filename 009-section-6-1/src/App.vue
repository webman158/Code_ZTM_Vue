<template>
  <h3>这是 App</h3>

  <button @click="age++">父组件直接修改age</button>

  <Greeting :age="age"></Greeting>
  <User :age="age" @age-change="ageChange"></User>
</template>

<script>
import Greeting from './components/Greeting.vue'
import User from '@/components/User.vue'

export default {
  name: 'App',
  data() {
    return {
      age: 20,
    }
  },
  components: {
    Greeting,
    User,
  },
  methods: {
    ageChange() {
      this.age++
    },
  },
}
</script>
