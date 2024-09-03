// 自动将 components/base 目录下的组件 注册为全局组件

// 以插件的形式来实现功能
export default {
  install(app) {
    const baseComponent = import.meta.glob('../components/base/*.vue', {
      eager: true
    })

    Object.entries(baseComponent).forEach(([path, module]) => {
      app.component(`Base${path.split('/').pop().split('.')[0]}`, module.default)
    })
  }
}
