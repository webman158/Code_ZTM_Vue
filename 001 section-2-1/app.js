const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Li',
      lastName: 'me',
      url: 'http://google.com',
      age: 10,
    }
  },
  methods: {
    // // 不要使用箭头函数，否则无法使用this从而来获取data中的数据
    // fullName() {
    //   console.log('methods 的 fullName方法被调用了')
    //   return `${this.firstName} ${this.lastName.toUpperCase()}`
    // },
    ageFn() {
      this.age--
    },
    updateLastName(e) {
      this.lastName = e.target.value
    },
    updateLastName2(msg, event) {
      event.preventDefault()
      console.log(msg)
      this.lastName = event.target.value
    },
  },
  computed: {
    fullName() {
      console.log('computed 的 fullName方法被调用了')
      return `${this.firstName} ${this.lastName.toUpperCase()}`
    },
  },
}).mount('#app')
// mount() 只会挂载到查找到的第一个元素上

/* 
// 访问数据
setTimeout(() => {
  // 没有使用代理
  // vm.$data.firstName = '何'

  // 代理写法（简化）
  vm.firstName = 'X'
}, 3000) 
*/

/* 
// 创建多个Vue实例（实际工作中很少见）
Vue.createApp({
  data() {
    return {
      firstName: 'An',
      lastName: 'OK',
    }
  },
}).mount('#app2')
 */
