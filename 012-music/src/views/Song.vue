<script>
import { mapState, mapActions } from 'pinia'
import usePlayerStore from '@/stores/player'
import useUserStore from '@/stores/user'
import AlertMsg from '@/components/AlertMsg.vue'
import { commentsCollection, auth, songsCollection } from '@/plugins/firebase'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import 'dayjs/locale/zh-cn'

export default {
  name: 'Song',
  components: { AlertMsg },
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3'
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-400',
      alert_msg: '',
      commentsList: [],
      sort: '1'
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    id() {
      return this.$route.params.id
    },
    querySort() {
      return this.$route.query.sort
    },
    // 根据sort 计算出排序后的评论列表
    sortedCommentsList() {
      // if (this.sort === '1') {
      //   // 根据日期排序，新 -> 旧
      //   return this.commentsList.slice().sort((a, b) => new Date(b.time) - new Date(a.time))
      // }
      // return this.commentsList.slice().sort((a, b) => new Date(a.time) - new Date(b.time))

      // 评论中的时间进行翻译
      if (this.$i18n.locale === 'zh') {
        dayjs.locale('zh-cn')
      } else {
        dayjs.locale('en')
      }

      // 优化写法
      return this.commentsList.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.time) - new Date(a.time)
        }
        return new Date(a.time) - new Date(b.time)
      })
    }
  },
  created() {
    // 获取歌曲信息
    this.getSong()
    // 获取歌曲评论
    this.getComments()
    this.updateSort()
  },
  methods: {
    ...mapActions(usePlayerStore, ['playSong']),
    // 获取音乐信息
    async getSong() {
      const snapshot = await songsCollection.doc(this.id).get()
      // 如果查询的歌曲不存在，就没有必要留在song歌曲页面了，将其跳转到首页
      if (!snapshot.exists) {
        return this.$router.push({
          name: 'home'
        })
      }
      this.song = snapshot.data()
    },
    async submit(values, { resetForm }) {
      this.in_submission = true
      this.show_alert = true
      this.alert_msg = this.$t('song.upload_msg')
      this.alert_variant = 'bg-blue-400'

      // 提交的评论信息
      const comment = {
        // 记录该评论是那首歌曲下的
        songid: this.id,
        content: values.comment,
        // firebase 数据库不能记录JS日期对象，所以将其转为字符串进行存储
        time: new Date().toString(),
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName
      }

      try {
        await commentsCollection.add(comment)
      } catch (e) {
        this.in_submission = false
        this.alert_msg = this.$t('song.comment_failed')
        this.alert_variant = 'bg-red-400'
        return
      }

      // 重置表单
      resetForm()

      // 歌曲评论数量+1 + 更新数据库的评论数据
      this.song.comment_count++
      await songsCollection.doc(this.id).update({ comment_count: this.song.comment_count })

      // 重新获取所有该首歌曲下的所有评论
      await this.getComments()

      this.in_submission = false
      this.alert_msg = this.$t('song.comment_msg')
      this.alert_variant = 'bg-green-400'
    },
    async getComments() {
      // 获取该首歌曲下的所有评论
      const snapshots = await commentsCollection.where('songid', '==', this.id).get()

      // 每次将评论数组置为空数组，防止重复添加
      this.commentsList = []

      snapshots.forEach((doc) => {
        this.commentsList.push({
          cid: doc.id,
          ...doc.data()
        })
      })
    },
    fromNow(time) {
      return dayjs(time).fromNow()
    },
    updateSort() {
      // 将路由上的sort排序取值赋值给sort
      // 需要判断sort是否存在，并且是否是 1 或 2
      this.sort = this.querySort === '1' || this.querySort === '2' ? this.querySort : '1'
    }
  },
  watch: {
    // 在sort改变的时候，将sort排序的值存储到路由url上，不丢失选择排序
    sort(newVal) {
      // 如果修改后的值与当前路由上的sort值一样，就没有必要进行路由添加了
      if (newVal === this.querySort) return
      // console.log(newVal)
      // 将排序sort 添加到url上
      this.$router.push({ query: { sort: newVal } })
    }
  }
}
</script>

<template>
  <main class="container mx-auto">
    <!-- Music Header -->
    <section class="w-full mb-4 py-14 px-4 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <transition enter-active-class="animate__animated animate__zoomIn">
        <div class="container mx-auto flex items-center" v-if="song.modified_name">
          <!-- Play/Pause Button -->
          <button
            @click.prevent="playSong(song)"
            type="button"
            class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          >
            <i class="fas fa-play"></i>
          </button>
          <div class="z-50 text-left ml-8">
            <!-- Song Info -->
            <div class="text-3xl font-bold">{{ song.modified_name }}</div>
            <div v-if="song.genre">{{ song.genre }}</div>
          </div>
        </div>
      </transition>
    </section>

    <!-- Form -->
    <section class="w-full mb-4 px-4" id="comments">
      <div
        class="bg-white dark:bg-gray-600 dark:text-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{
              $tc('song.comment_count', song.comment_count, {
                count: song.comment_count
              })
            }}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <AlertMsg
            :alert_variant="alert_variant"
            :alert_msg="alert_msg"
            :show_alert="show_alert"
          ></AlertMsg>

          <vee-form :validation-schema="schema" @submit="submit" v-if="userLoggedIn">
            <vee-field
              :validateOnChange="true"
              :validateOnBlur="false"
              name="comment"
              as="textarea"
              label="评论内容"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4 dark:bg-gray-500 dark:text-white"
              :placeholder="$t('song.textarea_comment')"
            ></vee-field>
            <error-message name="comment" class="text-red-600"></error-message>
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="in_submission"
            >
              {{ $t('login_register.submit') }}
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-if="song.comment_count > 1"
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-500 dark:text-white"
          >
            <!-- 最新 -> 最旧 -->
            <option value="1">{{ $t('song.latest') }}</option>
            <!-- 最旧 -> 最新 -->
            <option value="2">{{ $t('song.oldest') }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <ul class="mx-4 border rounded overflow-hidden" v-if="song.comment_count">
      <li
        v-for="comment in sortedCommentsList"
        :key="comment.cid"
        class="p-6 bg-gray-50 dark:bg-gray-600 dark:text-white border-b border-gray-200 dark:hover:bg-gray-500"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ fromNow(comment.time) }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
