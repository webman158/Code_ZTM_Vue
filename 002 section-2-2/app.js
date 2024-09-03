let vm = Vue.createApp({
  data() {
    return {
      isPurple: false,
      // 下拉框-选中的颜色
      selectColor: '',
      size: 100,
    }
  },
  computed: {
    compIsPurple() {
      return { purple: this.isPurple }
    },
    compStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        lineHeight: this.size + 'px',
      }
    },
  },
}).mount('#app')
