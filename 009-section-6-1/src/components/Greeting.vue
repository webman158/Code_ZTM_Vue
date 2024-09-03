<template>
  <h3 v-if="age > 25">{{ msg }}</h3>
  <p v-else>年龄未到，不能看哦</p>
</template>

<script>
export default {
  name: 'Greeting',
  props: ['age'],
  data() {
    return {
      msg: 'is hello',
    }
  },
}
</script>

<style scoped lang="scss">
h3 {
  color: powderblue;

  &:hover {
    color: darken(#f99, 15%);
  }
}
</style>
