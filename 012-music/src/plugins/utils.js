export const paddingZero = (n) => {
  return n < 10 ? '0' + n : n
}

export const formatTime = (time) => {
  // 秒转分钟 + 秒
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${paddingZero(minutes)}:${paddingZero(seconds)}`
}

// 延时函数
export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
