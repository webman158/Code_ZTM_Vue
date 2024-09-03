<script>
export default {
  name: 'BaseButton',
  props: {},
  methods: {
    fn(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<template>
  <button class="py-1.5 px-3 rounded text-white bg-green-600" type="button" @click="fn">
    <slot></slot>
  </button>
</template>

<style lang=""></style>
