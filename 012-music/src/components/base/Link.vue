<script>
export default {
  name: 'Like',
  props: {
    content: {
      type: String,
      default: '链接'
    },
    url: {
      type: String,
      default: '#'
    }
  }
}
</script>

<template>
  <div>
    <a href="url">{{ content }}</a>
  </div>
</template>

<style lang="css"></style>
