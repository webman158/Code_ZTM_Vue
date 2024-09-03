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
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|email',
        age: 'required|min_value:8|max_value:100',
        password: 'required|min:9|max:12|not_one_of:password',
        confirm_password: 'unequal_password:@password',
        country: 'required|country:Japan',
        tos: 'tos'
      },
      // 注册表单的默认值
      registerData: {
        name: import.meta.env.DEV ? 'test' : '',
        email: import.meta.env.DEV ? 'test@test.com' : '',
        age: import.meta.env.DEV ? 19 : '',
        password: import.meta.env.DEV ? '123123123' : '',
        confirm_password: import.meta.env.DEV ? '123123123' : '',
        country: import.meta.env.DEV ? 'USA' : 'USA',
        tos: import.meta.env.DEV ? '1' : ''
      },
      show_alert: false,
      in_submission: false,
      alert_variant: '',
      alert_msg: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register'
    }),
    // 注册
    async register(values) {
      // 1. 显示提示
      this.show_alert = true
      this.in_submission = true
      this.alert_msg = this.$t('login_register.register_alert_msg')
      this.alert_variant = 'bg-blue-500'

      // 2. 发送请求
      try {
        await this.createUser(values)
      } catch (error) {
        this.in_submission = false
        this.alert_variant = 'bg-red-500'
        this.alert_msg = this.$t('login_register.register_failed_msg')
        return
      }

      // 3. 更改提示内容
      this.in_submission = false
      this.alert_variant = 'bg-green-500'
      this.alert_msg = this.$t('login_register.register_success_msg')

      // window.location.reload()

      await sleep(1000)
      // 关闭模态框
      useModalStore().toggle()
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

  <vee-form :validation-schema="schema" :initial-values="registerData" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.name') }}</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
        :placeholder="$t('login_register.enter_name')"
      />
      <error-message name="name" class="text-red-600"></error-message>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.email') }}</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
        :placeholder="$t('login_register.enter_email')"
      />
      <error-message name="email" class="text-red-600"></error-message>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.age') }}</label>
      <vee-field
        name="age"
        type="number"
        :placeholder="$t('login_register.enter_age')"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
      />
      <error-message name="age" class="text-red-600"></error-message>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.password') }}</label>
      <vee-field name="password" :bails="false" #default="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
          :placeholder="$t('login_register.enter_password')"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.confirm_password') }}</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
        :placeholder="$t('login_register.enter_confirm_password')"
      />
      <error-message name="confirm_password" class="text-red-600"></error-message>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_register.country') }}</label>
      <vee-field
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-600 dark:text-white"
      >
        <option value="china">{{ $t('login_register.china') }}</option>
        <option value="USA">{{ $t('login_register.usa') }}</option>
        <option value="Japan">{{ $t('login_register.japan') }}</option>
      </vee-field>
      <error-message name="country" class="text-red-600"></error-message>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <label>
        <vee-field
          name="tos"
          value="1"
          type="checkbox"
          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        />
        <i18n-t keypath="register.accept" tag="span" class="inline-block">
          <a href="#">{{ $t('register.tos') }}</a>
        </i18n-t>
      </label>
      <error-message name="tos" class="text-red-600 block"></error-message>
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

<style scoped></style>
