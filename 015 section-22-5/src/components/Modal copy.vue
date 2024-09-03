<template>
  <div class="modal" :style="{ display: show ? 'block' : 'none' }">
    <div
      class="modal-dialog"
      @keydown.esc="close"
      tabindex="0"
      ref="modal"
      v-focus
      style="z-index: 2000"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Awesome Title</h5>
          <button type="button" class="close" @click="close">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Awesome content.</p>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: ['show'],
  methods: {
    close() {
      this.$emit('hide')
    },
  },
  watch: {
    // async show(newVal) {
    //   console.log(newVal)
    //   // TODO: 当模态框显示的时候，自动获取焦点，以便可以出发keydown事件
    //   if (newVal) {
    //     await this.$nextTick()
    //     console.log(this.$refs.modal.focus)
    //     this.$refs.modal.focus()
    //   }
    // },
  },
  directives: {
    focus: {
      // mounted(el) {
      //   console.log('mounted ', el)
      // },
      updated(el) {
        console.log('updated ', el)
        el.focus()
      },
    },
  },
}
</script>

<style>
.modal-dialog {
  outline: auto;
}
</style>
