import { defineStore } from 'pinia'
import { Howl } from 'howler'
import { formatTime } from '@/plugins/utils'

export default defineStore('player', {
  state: () => ({
    // 当前播放音乐信息
    currentSong: {},
    // 当前播放音乐实例
    sound: {},
    // 当前播放进度
    seek: '00:00',
    // 播放时长
    duration: '00:00',
    progressBar: '0%',
    // 状态
    is_loading: false,
    animationFrame: null
  }),
  getters: {
    // 播放 / 暂停 图标类名
    playIconClass() {
      // 判断 当前播放音乐实例 是否创建成功
      // 没有的话，就显示默认播放音乐图标
      if (!this.sound.playing) return { 'fa-play': true }

      // 播放的话，playing() 为true
      const playing = this.sound.playing()

      return {
        'fa-play': !playing,
        'fa-pause': playing,
        'fa-spinner fa-spin': this.is_loading
      }
    }
  },
  actions: {
    // 播放音乐
    playSong(song) {
      // 同步当前播放的音乐
      this.currentSong = song

      // 如果当前有正在播放的歌曲，在播放的时候，先卸载播放音乐
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }

      this.sound = new Howl({
        src: [song.url],
        // Set to true to force HTML5 Audio. This should be used for large audio files so that you don't have to wait for the full file to be downloaded and decoded before playing.
        // 默认 会发送ajax请求音频文件，造成跨域请求报错
        html5: true,
        onplay: () => {
          // 监听处理播放进度
          this.animationFrame = requestAnimationFrame(this.animateProgress)
        },
        onload: () => {
          this.is_loading = false
        },
        onend: () => {
          cancelAnimationFrame(this.animationFrame)
          this.progress()
        },
        onpause: () => {
          cancelAnimationFrame(this.animationFrame)
        },
        onstop: () => {
          cancelAnimationFrame(this.animationFrame)
        }
      })

      // 播放音乐
      this.sound.play()
      this.toggleLoading()
    },
    // 切换音乐播放状态
    toggleSong() {
      if (!this.sound.playing) return
      const playing = this.sound.playing()
      !playing ? this.sound.play() : this.sound.pause()
    },
    toggleLoading() {
      if (this.sound.state() === 'loaded') {
        this.is_loading = false
      } else {
        this.is_loading = true
      }
    },
    progress() {
      // console.log('requestAnimationFrame...')
      this.seek = formatTime(this.sound.seek())
      this.duration = formatTime(this.sound.duration())

      this.toggleLoading()

      // 处理进度条的进度
      this.progressBar = `${(this.sound.seek() / this.sound.duration()) * 100}%`
    },
    animateProgress() {
      this.progress()
      // 如果在播放状态，才进行递归调用
      this.animationFrame = requestAnimationFrame(this.animateProgress)
    },
    // 点击更新播放进度
    updateProgress(e) {
      if (!this.sound.playing) return

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
      this.sound.seek(this.sound.duration() * precent)
      // this.progress()

      // 或者如下代码
      this.sound.once('seek', this.progress)
    }
  }
})
