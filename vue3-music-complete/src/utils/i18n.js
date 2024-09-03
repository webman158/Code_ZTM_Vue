import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import zh from '@/locales/zh'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    zh
  } // set locale messages
})

export default i18n
