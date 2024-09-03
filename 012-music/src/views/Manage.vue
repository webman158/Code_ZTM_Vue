<script>
// import useUserStore from '@/stores/user'
import Upload from '@/components/Upload.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { auth, songsCollection } from '@/plugins/firebase'

// eslint-disable-next-line no-unused-vars
import { sleep } from '@/plugins/utils'

export default {
  name: 'manage',
  components: { Upload, CompositionItem },
  data() {
    return {
      songList: [],
      is_editing: false
    }
  },
  async created() {
    // await sleep(3000)

    // 获取上传歌曲列表（需要过滤出来该作者的上传歌曲数据）
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
    // console.log(snapshot)

    snapshot.forEach((document) => {
      // console.log(document)
      const song = {
        ...document.data(),
        isEdit: false,
        docId: document.id
      }
      // console.log(song)
      this.songList.push(song)
    })
  },
  methods: {
    updateSong(index, newSong) {
      this.songList[index].modified_name = newSong.modified_name
      this.songList[index].genre = newSong.genre
    },
    removeSong(index) {
      this.songList.splice(index, 1)
    },
    addSongs(song) {
      this.songList.unshift(song)
    },
    toggle_is_editing(flag) {
      this.is_editing = flag
    }
  },
  mounted() {
    window.addEventListener('beforeunload', (e) => {
      // 如果未编辑，无需提示用户
      if (!this.is_editing) return

      // 阻止浏览器默认的提示消息
      e.preventDefault()

      // 在现代浏览器中，可以返回一个自定义的提示消息
      event.returnValue = '' // 兼容旧版浏览器
      // 显示自定义的提示框
      const message = this.$t('unload')
      event.returnValue = message // 兼容旧版浏览器
      return message
    })
  },
  beforeRouteLeave(to, from, next) {
    // 离开该路由的时候，判断是否正在编辑中，是的话，则提示
    if (!this.is_editing) {
      // 未编辑，直接next放行
      next()
    } else {
      const is_leave = confirm(this.$t('manage.leave'))
      next(is_leave)
    }
  }

  // 在该路由离开的时候，触发 该钩子函数
  // beforeRouteLeave(to, from, next) {
  //   // 取消upload组件的上传文件
  //   this.$refs.upload.cancelUpload()
  //   // 记得调用next函数才能离开该路由
  //   next()
  // }

  // beforeRouteEnter(to, from, next) {
  //   // console.log('beforeRouterEnter, 组件内的钩子函数')
  //   // console.log(to, from)

  //   // 进入到该页面，判读是否登录了，没有的话则跳转去首页
  //   const store = useUserStore()
  //   if (store.userLoggedIn) {
  //     next()
  //   } else {
  //     next({ name: 'home' })
  //   }
  // }
}
</script>

<template>
  <main class="px-4">
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <Upload ref="upload" :addSongs="addSongs"></Upload>
        </div>
        <div class="col-span-2">
          <div
            class="bg-white dark:bg-gray-600 dark:text-white rounded border border-gray-200 relative flex flex-col"
          >
            <div
              v-icon.right.green.large="'compact-disc'"
              class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
            >
              <span class="card-title">{{ $t('manage.my_songs') }}</span>
              <!-- <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i> -->
            </div>
            <div class="p-6" v-loading="songList">
              <!-- Composition Items -->
              <p v-if="!songList.length">未上传音乐</p>
              <template v-else>
                <CompositionItem
                  v-for="(song, index) in songList"
                  :key="song.docId"
                  :song="song"
                  :updateSong="updateSong"
                  :index="index"
                  :removeSong="removeSong"
                  :toggle_is_editing="toggle_is_editing"
                  v-model:is_editing="is_editing"
                ></CompositionItem>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
