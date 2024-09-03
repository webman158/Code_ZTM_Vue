import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'

// 不会立即导入该组件，而是创建一个函数，函数的返回值是导入的组件
// import函数是动态加载组件，该组件会被自动分成一个chunk
// 当访问Home路由的时候，会调用Home函数，就会调用import函数动态加载Home组件
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const Manage = () => import('@/views/Manage.vue')
const Song = () => import('@/views/Song.vue')

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
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
    },
    // 进入该路由执行的导航守卫
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter， 进入该路由执行的导航守卫')
      console.log(to, from)
      next()
    }
  },
  {
    // 捕获不存在的路径，匹配404
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

// console.log(import.meta)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 全局配置 精确匹配的 类名，可以在 router-link 组件上 单独配置 精确匹配的类名
  linkExactActiveClass: 'text-yellow-500'
  // scrollBehavior: function (to, from, savedPosition) {
  //   console.log('to.hash ', to.hash)
  //   if (to.hash) {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve({
  //           selector: to.hash,
  //           behavior: 'smooth'
  //         })
  //       }, 500)
  //     })
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})

// 全局导航守卫
// 导航守卫的执行顺序，先全局，在路由上的守卫，在组件内的守卫
// 导航守卫无法访问组件内的数据和方法
//  因为：组件尚未初始化，导航守卫在任何声明周期函数之前执行，直到调用了next函数，组件才会被创建
router.beforeEach((to, from, next) => {
  // console.log('beforeEach, 全局导航守卫')
  // console.log(to, from)
  // next()

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
