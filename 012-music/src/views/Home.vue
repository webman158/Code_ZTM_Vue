<script>
import SongItem from '@/components/SongItem.vue'
import { songsCollection } from '@/plugins/firebase'

export default {
  name: 'Home',
  components: {
    SongItem
  },
  directives: {
    iconsub: {
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
  },
  data() {
    return {
      songs: [],
      max_pre_count: 6,
      is_load: false
    }
  },
  async created() {
    this.getSongs()

    window.addEventListener('scroll', this.scrollBottom)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrollBottom)
  },
  methods: {
    scrollBottom() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window

      if (Math.round(scrollTop) + innerHeight >= offsetHeight) {
        // console.log('滚动到底部')
        this.getSongs()
      }
    },
    async getSongs() {
      if (this.is_load) return
      this.is_load = true

      let snapshots
      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docId).get()
        console.log(lastDoc)

        // 查询歌曲
        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.max_pre_count)
          .get()
        // console.log(snapshots)
      } else {
        // 查询歌曲
        snapshots = await songsCollection.orderBy('modified_name').limit(this.max_pre_count).get()
      }

      snapshots.forEach((document) => {
        this.songs.push({
          ...document.data(),
          docId: document.id
        })
      })

      // 加载结束
      this.is_load = false
    }
  }
}
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
