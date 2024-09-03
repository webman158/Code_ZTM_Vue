<script setup>
import { ref, toRefs, computed, onMounted } from 'vue'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'
import localforage from 'localforage'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { toggleModal } = useModalStore()
const userStore = useUserStore()
const { logout } = userStore
const { userLoggedIn } = toRefs(userStore)
const { locale, t: $t } = useI18n()

const getLocal = async () => {
  const locale = (await localforage.getItem('locale')) || 'en'
  const theme = (await localforage.getItem('theme')) || 'light'
  console.log(locale, theme)

  changeMenu(locale)
  changeLocale(locale)
  changeTheme(theme)
}
getLocal()

// 初始化语言
const initLocale = () => {
  console.log(route, route.name)
  console.log(route.name === 'zh')
}

onMounted(() => {
  initLocale()
})

// 初始化主题
const initTheme = () => {}

// 点击切换语言
const changeLocale = (data) => {
  console.log(data)
  // 改变网站的语言
  locale.value = data
  // 设置表单校验的提示语言
  setLocale(data)
  // 本地存储语言
  localforage.setItem('locale', data)
  // 路由上记录
  // if (data === 'zh') {
  //   router.push({ name: 'zh' })
  // } else {
  //   router.push({ name: 'home' })
  // }
}

const theme = ref('light')
const unTheme = computed(() => {
  return theme.value === 'light' ? 'dark' : 'light'
})

// 更换主题
const changeTheme = (data) => {
  theme.value = data

  if (theme.value === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }

  // 本地存储主题
  localforage.setItem('theme', data)
}

// 语言菜单
const menuList = ref([
  {
    id: 'en',
    active: true,
    name: 'english'
  },
  {
    id: 'zh',
    active: false,
    name: 'chinese'
  }
])
// 语言菜单高亮
const changeMenu = (data) => {
  menuList.value.forEach((item) => {
    item.active = false
    if (item.id === data) {
      item.active = true
    }
  })
}

// 退出登录
const signOut = async () => {
  await logout()
  // 判断退出的时候是否在manage页面，是的话，跳转回到首页，不让用户继续看该页面
  route.meta.requireAuth && router.push({ name: 'home' })
}
</script>

<template>
  <header
    id="header"
    class="border-b dark:border-gray-400 text-black dark:text-white dark:bg-gray-700"
  >
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="dark:text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <!-- 
                需要带斜杠，可以确保路径添加到域而不是添加到当前路径中 
                测试： /test/test ==> 不带 / 的话，会切换到 /test/about
              -->
            <!-- <router-link class="px-2" to="/about">About</router-link> -->

            <router-link class="px-2" :to="{ name: 'about' }">
              {{ $t('nav.about') }}
            </router-link>
          </li>

          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="pl-2" href="#" @click.prevent="toggleModal('login')">
              {{ $t('nav.login') }}
            </a>
            /
            <a class="pr-2" href="#" @click.prevent="toggleModal('register')"
              >{{ $t('nav.register') }}
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2" :to="{ name: 'manage' }">
                {{ $t('nav.manage') }}
              </router-link>
            </li>
            <li>
              <a class="px-2" href="#" @click.prevent="signOut">
                {{ $t('nav.logout') }}
              </a>
            </li>
          </template>
        </ul>

        <ul class="flex flex-row ml-auto">
          <!-- Language -->
          <li class="relative">
            <base-menu :list="menuList" :format="$t" @clickMenu="changeLocale">
              <a class="px-3 py-4" href="javascript:;">
                {{ $t('language') }}
              </a>
            </base-menu>
          </li>

          <li class="relative">
            <!-- theme -->
            <!-- <base-menu :menuList="themeList" @clickMenu="changeTheme">
              <a class="px-3 py-4" href="javascript:;">
                {{ $t('theme') }}
              </a>
            </base-menu> -->

            <i
              class="fas fa-solid text-lg cursor-pointer ml-2"
              :class="{ 'fa-moon': theme === 'light', 'fa-sun': theme === 'dark' }"
              @click="changeTheme(unTheme)"
            ></i>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
