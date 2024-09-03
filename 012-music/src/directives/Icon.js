export default {
  beforeMount(el, binding) {
    console.log(el, binding)

    // 造成内容覆盖，影响模板上注册的事件
    // el.innerHTML += `<i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>`

    // 创建图标标签
    const iconEle = document.createElement('i')
    // 添加图标样式
    // iconEle.classList.add('fa', 'fa-headphones-alt', 'float-right', 'text-green-400', 'text-xl')

    let iconClass = `fa`

    if (binding.value) {
      iconClass += ` fa-${binding.value}`
    }

    // 如果有full 参数，那么就使用value值覆盖默认类名
    if (binding.arg === 'full') {
      iconClass = binding.value
    }

    // 如果有修饰符的话，使用修饰符添加额外类名
    if (binding.modifiers.right) {
      iconClass += ' float-right'
    }

    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400'
    }

    if (binding.modifiers.green) {
      iconClass += ' text-green-400'
    }

    if (binding.modifiers.large) {
      iconClass += ' text-2xl'
    }

    iconEle.className = iconClass
    // 将图标标签添加到指令所在的元素内
    el.append(iconEle)
  }
}
