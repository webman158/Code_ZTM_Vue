<template>
  <div class="modal" :style="{ display: show ? 'block' : 'none' }">
    <div class="modal-dialog" style="z-index: 2000">
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
  props: {
    show: {
      required: true,
    },
    scrollable: {
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('hide')
    },
    keyHandler(e) {
      console.log(e.key)
      if (e.key === 'Escape' && this.show) {
        // 当按键为 ESC 并且 modal 显示的时候，关闭模态框
        this.close()
      }
    },
  },
  mounted() {
    // 原生DOM API操作，实现ESC 关闭模态框
    // 监听文档的按键事件，无需关注焦点是否在某个元素上
    document.addEventListener('keydown', this.keyHandler)
  },
  unmounted() {
    document.removeEventListener('keydown', this.keyHandler)
  },
  watch: {
    // 侦听模态框的显示，scrollable为false，禁用页面滚动
    show: {
      immediate: true,
      handler(newVal) {
        if (newVal && !this.scrollable) {
          document.documentElement.style.overflow = 'hidden'
        } else {
          document.documentElement.style.overflow = ''
        }
      },
    },

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
