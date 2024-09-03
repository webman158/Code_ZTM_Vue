import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'

const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const Song = () => import('@/views/Song.vue')
const Manage = () => import('@/views/Manage.vue')

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/zh',
    component: Home,
    name: 'zh'
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
  {
    path: '/song/:id',
    component: Song,
    name: 'song'
  },
  {
    path: '/manage',
    // alias 附加路径， 理解为 path的别名， 无论是path 还是 alias 地址都可以跳转到该组件
    alias: '/manage-path',
    component: Manage,
    name: 'manage',
    meta: {
      requireAuth: true // 需要登录才能访问该路由，默认为 false，不需要登录就可以访问该路由
    }
  },
  {
    // 捕获不存在的路径，匹配404
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  // 无需登录即可访问的路由，直接放行
  if (!to.meta.requireAuth) {
    next()
    return
  }

  const store = useUserStore()
  if (store.userLoggedIn) {
    // 登录直接放行
    next()
  } else {
    // 未登录访问受限的路由，则直接跳转回到首页
    next({ name: 'home' })
  }
})

export default router
