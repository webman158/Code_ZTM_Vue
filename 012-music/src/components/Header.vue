<script>
import { setLocale } from '@vee-validate/i18n'
import { mapState, mapActions } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'
import localforage from 'localforage'

export default {
  data() {
    return {
      modalStore: null,
      theme: 'light',
      menuList: [
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
      ]

      // 主题下拉菜单的数据
      // themeList: [
      //   {
      //     id: 'light',
      //     active: true,
      //     name: 'Light'
      //   },
      //   {
      //     id: 'dark',
      //     active: false,
      //     name: 'Dark'
      //   }
      // ]
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn'])
  },
  async created() {
    this.modalStore = useModalStore()

    this.getLocal()
  },
  methods: {
    ...mapActions(useUserStore, {
      storeLogout: 'logout'
    }),
    async signOut() {
      // 退出登录
      await this.storeLogout()
      // 判断退出的时候是否在manage页面，是的话，跳转回到首页，不让用户继续看该页面
      this.$route.meta.requireAuth && this.$router.push({ name: 'home' })
    },
    toggleModal(tab) {
      this.modalStore.toggle(tab)
    },
    // 从本地取出当前语言 && 主题
    async getLocal() {
      const locale = (await localforage.getItem('locale')) || 'en'
      // console.log(locale)
      const theme = (await localforage.getItem('theme')) || 'light'

      // 语言菜单高亮
      this.menuList.forEach((item) => {
        item.active = false
        if (item.id === locale) {
          item.active = true
        }
      })

      this.setLocale(locale)

      // 主题下拉菜单的数据
      // this.themeList.forEach((item) => {
      //   item.active = false
      //   if (item.id === theme) {
      //     item.active = true
      //   }
      // })
      this.theme = theme
      this.toggleHTMLDark()
    },
    // 点击切换语言
    changeLocale(locale) {
      this.setLocale(locale)
      // 本地存储语言
      localforage.setItem('locale', locale)
    },
    // 设置语言
    setLocale(locale) {
      // 改变网站的语言
      this.$i18n.locale = locale
      // 设置表单校验的提示语言
      setLocale(locale)
    },
    // 更换主题
    changeTheme() {
      // 切换主题
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.toggleHTMLDark()
      // 本地存储主题
      localforage.setItem('theme', this.theme)
    },
    toggleHTMLDark() {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
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
              @click="changeTheme"
            ></i>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
