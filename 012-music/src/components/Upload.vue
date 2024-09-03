<script>
import { auth, storage, songsCollection } from '@/plugins/firebase'

export default {
  name: 'Upload',
  props: {
    addSongs: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      // 设置当前浏览器默认不支持拖拽
      is_support_drag: true,
      is_dragOver: false,
      uploadList: []
    }
  },
  created() {
    // 检测是否支持拖拽功能
    this.is_support_drag = this.test_support_drag()
  },
  methods: {
    upload(e) {
      this.is_dragOver = false

      // get files (drag 事件中的 files文件在dataTransfer 属性中)
      // 便于遍历，展开到数组中
      // const files = [...e.dataTransfer.files]
      // console.log(files)

      // ! 需要考虑是拖拽上传还是文件选择框上传
      const files = e.dataTransfer ? [...e.dataTransfer.files] : [...e.target.files]

      // upload file （循环遍历 逐一上传）
      // storage
      files.forEach((file) => {
        if (!file.type.includes('audio')) return
        if (file.size > 15 * 1024 * 1024) return

        // 用户离线的时候，来上传文件，抛出错误
        // 需要再上传之前，先检测用户是否离线
        if (!navigator.onLine) {
          this.uploadList.push({
            name: file.name,
            current_progress: 100,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            text_color: 'text-red-400',
            task: {}
          })
          return
        }

        // console.log('上传的文件 ', file)

        const storageRef = storage.ref()
        const songsRef = storageRef.child(`songs/${file.name}`)
        const task = songsRef.put(file)

        // 通过下标记录当前添加到数组中的对象
        const currentIndex =
          this.uploadList.push({
            name: file.name,
            current_progress: 0,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            text_color: '',
            task
          }) - 1

        // 第一个回调函数处理： 上传进度
        // 第二个回调函数处理： 上传失败
        // 第三个回调函数处理： 上传成功
        task.on(
          'state_change',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.uploadList[currentIndex].current_progress = progress
          },
          (error) => {
            this.uploadList[currentIndex].variant = 'bg-red-400'
            this.uploadList[currentIndex].text_color = 'text-red-400'
            this.uploadList[currentIndex].icon = 'fas fa-times'
            console.log(error)
          },
          async () => {
            // 将上传成功的audio 关联上上传人信息
            const song = {
              // 上传人 uid
              uid: auth.currentUser.uid,
              // 上传人 用户名（注册的时候，填写的name）
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0
            }

            // 存储歌曲的下载播放地址
            song.url = await task.snapshot.ref.getDownloadURL()

            // 将歌曲信息添加到 集合中
            const songRef = await songsCollection.add(song)

            this.addSongs({
              ...song,
              docId: songRef.id
            })

            this.uploadList[currentIndex].variant = 'bg-green-400'
            this.uploadList[currentIndex].text_color = 'text-green-400'
            this.uploadList[currentIndex].icon = 'fas fa-check'
          }
        )
      })
    },
    // 取消上传所有文件
    cancelUpload() {
      this.uploadList.forEach((upload) => {
        upload.task.cancel()
      })
    },
    test_support_drag() {
      const div = document.createElement('div')
      return 'draggable' in div || ('ondragstart' in div && 'ondrop' in div)
    }
  },
  // 在组件卸载之前，取消上传所有文件
  beforeUnmount() {
    this.cancelUpload()
  }
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-600 dark:text-white rounded border border-gray-200 relative flex flex-col"
  >
    <div
      v-icon.right.green.large="'upload'"
      class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
    >
      <span class="card-title">{{ $t('manage.upload') }}</span>
      <!-- <i class="fas fa-upload float-right text-green-400 text-2xl"></i> -->
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        v-if="is_support_drag"
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 dark:text-white transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragOver = false"
        @dragenter.prevent.stop="is_dragOver = true"
        @dragleave.prevent.stop="is_dragOver = false"
        @dragover.prevent.stop="is_dragOver = true"
        @drop.prevent.stop="upload"
      >
        <h5>{{ $t('manage.drop') }}</h5>
      </div>
      <!-- 当不支持拖拽事件的时候，使用文件选择框来实现上传操作 -->
      <input v-else type="file" multiple @change="upload" />

      <template v-if="uploadList.length">
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4" v-for="upload in uploadList" :key="upload.name">
          <!-- File Name -->
          <div class="font-bold text-sm" :class="upload.text_color">
            <i :class="upload.icon"></i> {{ upload.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar"
              :class="upload.variant"
              :style="{ width: upload.current_progress + '%' }"
            ></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
