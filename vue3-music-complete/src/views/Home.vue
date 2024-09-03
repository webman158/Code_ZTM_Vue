<script setup>
import SongItem from '@/components/SongItem.vue'
import { onUnmounted, onMounted, ref } from 'vue'
import { songsCollection } from '@/utils/firebase'

// 在模板中启用  v--iconsub
const vIconsub = {
  beforeMount(el, binding) {
    const iconELe = document.createElement('i')

    const { name, right, yellow, green, large } = binding.value
    const full = binding.arg?.full

    let iconClassName = `fa fa-${name}`
    full && (iconClassName = name)
    right && (iconClassName += ' float-right')
    yellow && (iconClassName += ' text-yellow-400')
    green && (iconClassName += ' text-green-400')
    large && (iconClassName += ' text-2xl')

    iconELe.className = iconClassName
    el.append(iconELe)
  }
}

const max_pre_count = 6
const is_load = ref(false)
const songs = ref([])
const getSongs = async () => {
  if (is_load.value) return

  let snapshots
  if (songs.value.length) {
    const lastDoc = await songsCollection.doc(songs.value[songs.value.length - 1].docId).get()
    // console.log(lastDoc)

    // 查询歌曲
    snapshots = await songsCollection
      .orderBy('modified_name')
      .startAfter(lastDoc)
      .limit(max_pre_count)
      .get()
    // console.log(snapshots)
  } else {
    // 查询歌曲
    snapshots = await songsCollection.orderBy('modified_name').limit(max_pre_count).get()
  }

  snapshots.forEach((document) => {
    songs.value.push({
      ...document.data(),
      docId: document.id
    })
  })

  // 加载结束
  is_load.value = false
}

onMounted(() => {
  getSongs()

  window.addEventListener('scroll', scrollBottom)
})

const scrollBottom = () => {
  const { scrollTop, offsetHeight } = document.documentElement
  const { innerHeight } = window

  if (Math.round(scrollTop) + innerHeight >= offsetHeight) {
    // console.log('滚动到底部')
    getSongs()
  }
}

onUnmounted(() => {
  window.removeEventListener('scroll', scrollBottom)
})
</script>

<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(/assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            {{ $t('home.introduction') }}
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto px-4">
      <div
        class="bg-white dark:bg-gray-600 dark:text-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          v-iconsub="{ name: 'headphones-alt', right: 1, yellow: 1, large: 1 }"
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        >
          <span class="card-title">{{ $t('home.songs') }}</span>
          <!-- Icon -->
          <!-- 使用自定义指令来解决图标展示 -->
          <!-- <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i> -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs" :key="song.docId" :song="song"></SongItem>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>
