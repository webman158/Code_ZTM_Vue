<script setup>
import { ref } from 'vue'
import useUserStore from '@/stores/user'
import useModalStore from '@/stores/modal'
import { sleep } from '@/utils/index'
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()

const { authentice } = useUserStore()
const { toggleModal } = useModalStore()

const schema = ref({
  email: 'required|email',
  password: 'required|min:8|max:12|not_one_of:password'
})

const loginData = ref({
  email: import.meta.env.DEV ? 'test123@test.com' : '',
  password: import.meta.env.DEV ? '123123123' : ''
})
const show_alert = ref(false)
// 是否正在提交中，决定按钮的禁用
const in_submission = ref(false)
const alert_variant = ref('')
const alert_msg = ref('')

// 登录
const login = async (values) => {
  // 1. 显示提示
  show_alert.value = true
  in_submission.value = true
  alert_msg.value = $t('login_register.login_alert_msg')
  alert_variant.value = 'bg-blue-500'

  // 2. 发送请求
  try {
    await authentice(values)
  } catch (error) {
    // console.log(error)
    in_submission.value = false
    // 具体错误信息： JSON.parse(error.message).error.message
    alert_msg.value = $t('login_register.login_failed_msg')
    alert_variant.value = 'bg-red-500'
    return
  }

  // 3. 更改提示内容
  in_submission.value = false
  alert_msg.value = $t('login_register.login_success_msg')
  alert_variant.value = 'bg-green-500'
  // window.location.reload()

  await sleep(1000)
  // 关闭模态框
  toggleModal()
  // 关闭提示框
  show_alert.value = false
}
</script>

<template>
  <BaseAlertMsg
    :show_alert="show_alert"
    :alert_msg="alert_msg"
    :alert_variant="alert_variant"
  ></BaseAlertMsg>

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
