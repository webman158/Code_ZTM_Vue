<script>
import AlertMsg from './AlertMsg.vue'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import useModalStore from '@/stores/modal'
import { sleep } from '@/plugins/utils'

export default {
  components: { AlertMsg },
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:8|max:12|not_one_of:password'
      },
      // TODO 设置表单默认值，之后删除
      loginData: {
        email: import.meta.env.DEV ? 'test123@test.com' : '',
        password: import.meta.env.DEV ? '123123123' : ''
      },
      show_alert: false,
      // 是否正在提交中，决定按钮的禁用
      in_submission: false,
      alert_variant: '',
      alert_msg: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authentice']),
    // 登录
    async login(values) {
      // 1. 显示提示
      this.show_alert = true
      this.in_submission = true
      this.alert_msg = this.$t('login_register.login_alert_msg')
      this.alert_variant = 'bg-blue-500'

      // 2. 发送请求
      try {
        await this.authentice(values)
      } catch (error) {
        // console.log(error)
        this.in_submission = false
        // 具体错误信息： JSON.parse(error.message).error.message
        this.alert_msg = this.$t('login_register.login_failed_msg')
        this.alert_variant = 'bg-red-500'
        return
      }

      // 3. 更改提示内容
      this.in_submission = false
      this.alert_msg = this.$t('login_register.login_success_msg')
      this.alert_variant = 'bg-green-500'
      // window.location.reload()

      await sleep(1000)
      // 关闭模态框
      useModalStore().toggle()
      // 关闭提示框
      this.show_alert = false
    }
  }
}
</script>

<template>
  <AlertMsg
    :show_alert="show_alert"
    :alert_msg="alert_msg"
    :alert_variant="alert_variant"
  ></AlertMsg>

  <vee-form :validation-schema="schema" :initial-values="loginData" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.email') }}</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
        :placeholder="$t('login_register.enter_email')"
      />
      <error-message name="email" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.password') }}</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
        :placeholder="$t('login_register.enter_password')"
      />
      <error-message name="password" class="text-red-600" />
    </div>
    <button
      :disabled="in_submission"
      :class="{ 'bg-slate-200 hover:bg-slate-200 text-black cursor-not-allowed': in_submission }"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      {{ $t('login_register.submit') }}
    </button>
  </vee-form>
</template>

<style lang="scss" scoped></style>
