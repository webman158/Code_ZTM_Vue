import { defineStore } from 'pinia'
import { Howl } from 'howler'
import { formatTime } from '@/utils/index'
import { ref, computed } from 'vue'

export default defineStore('player', () => {
  // 当前播放音乐信息
  const currentSong = ref({})
  // 当前播放音乐实例
  const sound = ref({})
  // 当前播放进度
  const seek = ref('00:00')
  // 播放时长
  const duration = ref('00:00')
  const progressBar = ref('0%')
  // 状态
  const is_loading = ref(false)
  const animationFrame = ref(null)

  const playIconClass = computed(() => {
    // 播放 / 暂停 图标类名
    // 判断 当前播放音乐实例 是否创建成功
    // 没有的话，就显示默认播放音乐图标
    if (!sound.value.playing) return { 'fa-play': true }

    // 播放的话，playing() 为true
    const playing = sound.value.playing()

    return {
      'fa-play': !playing,
      'fa-pause': playing,
      'fa-spinner fa-spin': is_loading.value
    }
  })

  // 播放音乐
  const playSong = (song) => {
    // 同步当前播放的音乐
    currentSong.value = song

    // 如果当前有正在播放的歌曲，在播放的时候，先卸载播放音乐
    if (sound.value instanceof Howl) {
      sound.value.unload()
    }

    sound.value = new Howl({
      src: [song.url],
      // Set to true to force HTML5 Audio. This should be used for large audio files so that you don't have to wait for the full file to be downloaded and decoded before playing.
      // 默认 会发送ajax请求音频文件，造成跨域请求报错
      html5: true,
      onplay: () => {
        // 监听处理播放进度
        animationFrame.value = requestAnimationFrame(animateProgress)
      },
      onload: () => {
        is_loading.value = false
      },
      onend: () => {
        cancelAnimationFrame(animationFrame.value)
        progress()
      },
      onpause: () => {
        cancelAnimationFrame(animationFrame.value)
      },
      onstop: () => {
        cancelAnimationFrame(animationFrame.value)
      }
    })

    // 播放音乐
    sound.value.play()
    toggleLoading()
  }

  // 切换音乐播放状态
  const toggleSong = () => {
    if (!sound.value.playing) return
    const playing = sound.value.playing()
    !playing ? sound.value.play() : sound.value.pause()
  }

  const toggleLoading = () => {
    if (sound.value.state() === 'loaded') {
      is_loading.value = false
    } else {
      is_loading.value = true
    }
  }

  const progress = () => {
    // console.log('requestAnimationFrame...')
    seek.value = formatTime(sound.value.seek())
    duration.value = formatTime(sound.value.duration())

    toggleLoading()

    // 处理进度条的进度
    progressBar.value = `${(sound.value.seek() / sound.value.duration()) * 100}%`
  }

  const animateProgress = () => {
    progress()
    // 如果在播放状态，才进行递归调用
    animationFrame.value = requestAnimationFrame(animateProgress)
  }

  // 点击更新播放进度
  const updateProgress = (e) => {
    if (!sound.value.playing) return

    // e.currentTarget 获取的是注册事件的元素
    // e.currentTarget.getBoundingClientRect() 获取元素相对于视口的位置和大小
    const { x, width } = e.currentTarget.getBoundingClientRect()
    // e.clientX 获取的是鼠标点击的 x 坐标
    // x 是元素相对于视口的位置，clientX 是鼠标点击的 x 坐标, 两者差值就是鼠标相对于进度条所在的位置
    const clickX = e.clientX - x
    // 计算鼠标相对于进度条所在的位置，就是当前播放进度
    const precent = clickX / width
    // 设置进度条进度
    // console.log('设置进度条进度', this.sound.duration(), precent)
    sound.value.seek(sound.value.duration() * precent)
    // this.progress()

    // 或者如下代码
    // sound.value.once('seek', progress)
  }

  return {
    currentSong,
    animationFrame,
    playIconClass,
    is_loading,
    sound,
    seek,
    duration,
    progressBar,
    playSong,
    toggleSong,
    toggleLoading,
    progress,
    animateProgress,
    updateProgress
  }
})
