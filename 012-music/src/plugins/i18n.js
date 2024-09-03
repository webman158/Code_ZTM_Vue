import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    // 每个语言的JSON文件中，按照组件来划分
    en,
    zh
  }
})
