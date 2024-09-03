<template>
  <p>接收到父组件的数据： {{ age }}</p>
  <p>双倍的数据： {{ ageDoubled }}</p>

  <!-- 
    子组件中直接修改父组件中的数据：不能、不推荐的做法
    问题1： 父组件不会收到更改通知，其他组件也不回接收到更改
    问题2： 子组件中直接修改了数据，但无法保留这些更改（意味着如果父组件更新数据，更新的数据会覆盖子组件中的更改）
   -->
  <!-- <button @click="age++">子组件直接修改age</button> -->

  <button @click="ageFn">子传父</button>
</template>

<script>
export default {
  // props: ['age'],
  // 对props 进行校验
  props: {
    age: {
      type: Number,
      required: true,

      // 当默认值为 数组或对象的时候，default默认值必须是个函数
      // default: 10,

      // default: () => ({
      //   name: 'lw',
      // }),

      // 自定义校验：返回值true 表示校验通过，false 表示校验未通过
      validator(value) {
        // 参数value 是接收到的props 值
        // console.log(value)

        // ! validator函数是在创建组件实例之前运行的，所以无法在该函数内使用数据，计算属性，方法等
        // this.ageFn()
        console.log(this) // undefined

        return value < 130
      },
    },
  },
  computed: {
    ageDoubled() {
      // props 属性可以在计算属性等地方使用，没有直接修改props数据
      return this.age * 2
    },
  },
  // 添加该选项有助于记录子组件中触发的事件
  emits: ['age-change'],
  // Vue3中 $emit 触发的事件必须要在 emits 选项中声明
  methods: {
    ageFn() {
      this.$emit('age-change')
    },
  },
}
</script>

<style lang="scss" scoped></style>
