// 路由切换，展示进度条

import NProgress from 'nprogress'
import router from '@/router'

// 借助于导航守卫来实现（多次定义导航守卫是可以的，这样有利于分离代码）
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 记得调用next函数，以便加载组件
  next()
})

// 路由加载完成，会调用我们传入的函数，传入 进度条的done函数，completes the progress
// 与其他导航守卫不同，afterEach不用提供next函数进行调用，无论做啥，路由都已经跳转了
router.afterEach(NProgress.done)

// 错误写法： NProgress.done() 这样是立即调用，就不是导航守卫 afterEach调用的函数了
// router.afterEach(NProgress.done())
