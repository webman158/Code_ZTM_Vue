<script setup>
import Upload from '@/components/Upload.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { auth, songsCollection } from '@/utils/firebase'
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useI18n } from 'vue-i18n'

onMounted(async () => {
  getList()
  unLoadhandler()
})

const songList = ref([])
const getList = async () => {
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
    songList.value.push(song)
  })
}

const updateSong = (index, newSong) => {
  songList.value[index].modified_name = newSong.modified_name
  songList.value[index].genre = newSong.genre
}
const removeSong = (index) => {
  songList.value.splice(index, 1)
}
const addSongs = (song) => {
  songList.value.unshift(song)
}

const is_editing = ref(false)
const toggle_is_editing = (flag) => {
  is_editing.value = flag
}

const unLoadhandler = () => {
  window.addEventListener('beforeunload', (e) => {
    // 如果未编辑，无需提示用户
    if (!is_editing.value) return

    // 阻止浏览器默认的提示消息
    e.preventDefault()

    event.returnValue = '' // 兼容旧版浏览器

    // 显示自定义的提示框
    const message = $t('unload')
    event.returnValue = message // 兼容旧版浏览器

    // 在现代浏览器中，可以返回一个自定义的提示消息
    return message
  })
}

const { t: $t } = useI18n()
onBeforeRouteLeave((to, from, next) => {
  // 离开该路由的时候，判断是否正在编辑中，是的话，则提示
  if (!is_editing.value) {
    // 未编辑，直接next放行
    next()
  } else {
    const is_leave = confirm($t('manage.leave'))
    next(is_leave)
  }
})
</script>

<template>
  <main class="px-4">
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <Upload ref="upload" :addSongs="addSongs"></Upload>
        </div>
        <div class="col-span-2 mt-6 md:mt-0">
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
