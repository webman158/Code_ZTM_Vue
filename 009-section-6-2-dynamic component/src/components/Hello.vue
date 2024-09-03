<script>
export default {
  unmounted() {
    console.log('hello component unmounted！！！')
  },
  activated() {
    console.log('hello component activated')
  },
  deactivated() {
    console.log('hello component deactivated')
  },
}
</script>

<template>
  <h3>this is Hello Component</h3>
</template>
