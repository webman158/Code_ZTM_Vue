<template>
  <p>
    <input type="text" v-model="word" />
  </p>
  <p>{{ reverse }}</p>

  <hr />

  <p>{{ num }}</p>
  <p>{{ double }}</p>
  <button @click="fn">Click</button>

  <hr />
  <p ref="alert">{{ user }}</p>
  <AppAlert :user="user"></AppAlert>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  watch,
  watchEffect,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
} from 'vue'

import AppAlert from './components/Alert.vue'

export default {
  name: 'App',
  components: { AppAlert },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  setup() {
    console.log('setup')
    onMounted(() => {
      console.log('onMounted')
    })

    onBeforeMount(() => {
      console.log('onBeforeMount')
    })

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })

    onUpdated(() => {
      console.log('onUpdated')
    })

    const word = ref('CIA')
    const reverse = ref('')

    // watchEffect(() => {
    //   reverse.value = [...word.value].reverse().join('')
    // })

    watch(
      word,
      (val) => {
        reverse.value = [...val].reverse().join('')
      },
      {
        immediate: true,
      }
    )

    const num = ref(10)
    const double = computed(() => {
      return num.value * 2
    })
    const fn = () => {
      num.value++
      console.log(alert.value)
    }

    const user = ref({ name: 'john', age: 19 })
    setTimeout(() => {
      user.value.name = 'xl'
    }, 3000)

    const alert = ref(null)

    return {
      word,
      reverse,
      num,
      double,
      fn,
      user,
      alert,
    }
  },
}
</script>
