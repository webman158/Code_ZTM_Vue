<template lang="">
  <input
    type="email"
    class="form-control"
    placeholder="E-mail"
    :value="email"
    @input="$emit('update:email', $event.target.value)"
    :class="{
      'is-valid': email.length >= 4 && email.length > 0,
      'is-invalid': email.length < 4 && email.length > 0,
    }"
  />

  <!-- 
    v-model="email"

    报错信息
      [plugin:vite:vue] v-model cannot be used on a prop, because local prop bindings are not writable.
      Use a v-bind binding combined with a v-on listener that emits update:x event instead.

    含义：
      v-model 不能绑定 props的数据，因为v-model会修改props的数据，不符合单项数据流的原则

    解决方案：
      使用 v-bind 指令 + v-on监听事件，从而触发 update:x 事件来代替
   -->
</template>
<script>
export default {
  name: 'EmailInput',

  // 修改为受控组件模式
  props: {
    email: {
      required: true,
    },
  },
  methods: {
    update(e) {
      this.$emit('update:email', e.target.value)
    },
  },

  // data() {
  //   return {
  //     value: '',
  //   }
  // },
}
</script>
