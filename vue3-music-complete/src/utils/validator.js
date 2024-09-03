// 自定义表单校验插件-全局注册插件

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  alpha_spaces,
  min_value,
  max_value,
  confirmed,
  not_one_of
} from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json'

localize({ en, zh })

export default {
  // eslint-disable-next-line no-unused-vars
  install(app, options) {
    // app.component('aa')
    // console.log(app, options)

    app.component('VeeForm', Form)
    app.component('VeeField', Field)
    app.component('ErrorMessage', ErrorMessage)

    // 定义规则
    defineRule('required', required)
    defineRule('email', email)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('not_one_of', not_one_of)

    // 给特殊的校验规则重新起个名字，还是使用对应的规则函数（方便后续提供特定的提示消息）
    defineRule('tos', required)
    defineRule('country', not_one_of)
    defineRule('unequal_password', confirmed)

    // 全局自定义提示消息
    configure({
      generateMessage: localize({
        en,
        zh: {
          // 特定字段的自定义消息
          fields: {
            confirm_password: {
              unequal_password: '两次输入的密码不一致'
            },
            country: {
              country: '抱歉，由于限制，我们不接受来自此位置的用户。'
            },
            tos: {
              tos: '您必须接受服务条款才能注册账户。'
            }
          },
          // Localizing Field Names 本地化字段名称
          names: {
            name: '用户名',
            age: '年龄',
            email: '邮箱',
            password: '密码',
            confirm_password: '确认密码',
            country: '日本',
            tos: '用户协议'
          }
        }
      })

      // generateMessage: (ctx) => {
      //   const locale = i18n.global.locale
      //   console.log(i18n, i18n.global.locale)
      //   const messages = {
      //     zh: {
      //       required: `请输入${ctx.field}`,
      //       min: `${ctx.field}字符数量太少`,
      //       max: `${ctx.field}字符数量太多`,
      //       alpha_spaces: `${ctx.field}只能包含字母和空格`,
      //       email: `不符合邮箱格式`,
      //       min_value: `${ctx.field}太小了`,
      //       max_value: `${ctx.field}太大了`,
      //       not_one_of: `${ctx.field}不能使用该结果`,
      //       country: `由于限制，我们不接受来自此位置的用户。`,
      //       unequal_password: `两次输入的密码不同`,
      //       tos: `您必须接受服务条款。`
      //     },
      //     en: {
      //       required: `The field ${ctx.field} is required.`,
      //       min: `The field ${ctx.field} is too short.`,
      //       max: `The field ${ctx.field} is too long.`,
      //       alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
      //       email: `The field ${ctx.field} must be a valid email.`,
      //       min_value: `The field ${ctx.field} is too low.`,
      //       max_value: `The field ${ctx.field} is too high.`,
      //       not_one_of: `You are not allowed to use this value for the field ${ctx.field}.`,
      //       country: 'Due to restrictions, we do not accept users from this location.',
      //       unequal_password: "The passwords don't match.",
      //       tos: 'You must accept the Terms of Service.'
      //     }
      //   }
      //   const message_zh = `${ctx.field} 不合法。`
      //   const message_en = `The field ${ctx.field} is invalid.`
      //   let message = messages[locale][ctx.rule.name]
      //   message = message ? message : locale === 'zh' ? message_zh : message_en
      //   return message
      // }
    })
  }
}
