let vm = Vue.createApp({
  data() {
    return {
      message: 'Hello world!',
    }
  },
  template: `<a href="#">{{ message }}</a> <hello></hello><hello></hello><hello></hello>`,
  // beforeCreate() {
  //   console.log('beforeCreate function called', this.message)
  // },

  // created() {
  //   console.log('created function called', this.message)
  // },

  // beforeMount() {
  //   console.log('beforeMount function called', this.$el)
  // },

  // mounted() {
  //   console.log('mounted function called', this.$el)
  // },

  // beforeUpdate() {
  //   console.log('beforeUpdate function called', this.$el)
  // },

  // updated() {
  //   console.log('updated function called', this.$el)
  // },

  // beforeUnmount() {
  //   console.log('beforeUnmount function called', this.$el)
  // },

  // unmounted() {
  //   console.log('unmounted function called', this.$el)
  // },
})

// 创建vue组件 通过 Vue实例的 component 方法来创建自定义组件（全局组件）
vm.component('hello', {
  data() {
    return {
      hello: 'hello msg',
    }
  },
  methods: {
    change() {
      this.hello = [...this.hello].reverse().join('')
    },
  },
  template: `<h1 @click="change">{{ hello }}</h1>`,
})

vm.mount('#app')

// setTimeout(() => {
//   // 卸载一个已挂载的应用实例
//   vm.unmount()
// }, 2000)

// setTimeout(() => {
//   vm.mount('#app')
// }, 3000)

const vm2 = Vue.createApp({
  data() {
    return {
      message: 'Hello world2!',
    }
  },
  template: `<a href="#">{{ message }}</a>`,
  // render 渲染函数优先级高于 template
  // render() {
  //   return Vue.h('h2', this.message)
  // },
}).mount('#app2')

const res = Vue.compile('<h1 v-if="true">哈哈</h1>')
console.log(res)
