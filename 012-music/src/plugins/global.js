// 自动注册全局组件
//  全局组件目录： components/base

export default {
  install(app) {
    // import.meta 对象在所有JS模块中都可以使用, 存有当前模块的信息
    // vite 会添加 glob函数到import.meta 对象上
    // glob函数会自动导入所有的组件文件，默认情况下，glob会延迟加载模块
    // glob函数返回导入文件的对象
    const baseComponent = import.meta.glob('../components/base/*.vue', {
      // 配置 glob函数立即加载模块
      eager: true
    })
    // console.log(baseComponent)

    // 循环遍历所有组件，挨个给组件注册为全局组件
    Object.entries(baseComponent).forEach(([path, module]) => {
      // path 导入的组件文件路径
      // module 导入的组件文件对象
      // console.log(path, module)

      // 获取组件名称
      const componentName = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')

      // 全局注册组件（加上通用的前缀名）
      // 组件也是默认导出，也可以通过默认属性访问组件数据 ==> module.default
      app.component(`Base${componentName}`, module.default)
    })
  }
}
