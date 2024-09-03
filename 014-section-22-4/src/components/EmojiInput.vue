<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      readonly
      :value="modelValue.emoji"
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="picker.togglePicker($event.target)"
    >
      {{ modelValue ? modelValue.emoji : 'Select' }}
    </button>
  </div>
</template>
<script>
import { EmojiButton } from '@joeattardi/emoji-button'

export default {
  name: 'EmojiInput',
  props: {
    modelValue: {
      required: true,
    },
    options: {
      default: () => ({}),
    },
  },
  mounted() {
    this.picker = new EmojiButton(this.options)

    this.picker.on('emoji', (selection) => {
      this.$emit('update:modelValue', selection)
    })
  },
}
</script>
<style lang=""></style>
