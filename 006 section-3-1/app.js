Vue.createApp({
  data() {
    return {
      per: 100,
      rotate: {
        x: 0,
        y: 0,
        z: 0,
      },
    }
  },
  computed: {
    compStyle() {
      return {
        // 计算属性的结果，作为copy的结果
        transform: `
            perspective(${this.per}px) 
            rotateX(${this.rotate.x}deg) 
            rotateY(${this.rotate.y}deg) 
            rotateZ(${this.rotate.z}deg)
        `,
      }
    },
  },
  methods: {
    reset() {
      this.per = 100
      this.rotate = {
        x: 0,
        y: 0,
        z: 0,
      }
    },
    async copy() {
      // 点击得到样式，写入到剪贴板中
      await navigator.clipboard.writeText(
        // 计算属性的结果
        `transform: ${this.compStyle.transform}`
      )
      alert('复制成功')
    },
  },
}).mount('#app')
