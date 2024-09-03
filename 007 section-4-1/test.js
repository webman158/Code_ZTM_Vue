const obj = { name: 'is li', age: 20 }

const proxy = new Proxy(obj, {
  get(target, key, value) {
    // console.log(target, key)
    return target[key]
  },

  set(target, key, value) {
    console.log(target, key, value)
    target[key] = value
  },
})

// console.log(proxy)
console.log(proxy.name)
console.log(proxy.age)

proxy.age++

console.log(proxy)
