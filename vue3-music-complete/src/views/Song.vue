<script setup>
import usePlayerStore from '@/stores/player'
import useUserStore from '@/stores/user'
import { commentsCollection, auth, songsCollection } from '@/utils/firebase'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import 'dayjs/locale/zh-cn'
import { ref, onMounted, computed, watch, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t: $t, locale } = useI18n()

const song = ref({})
const schema = ref({
  comment: 'required|min:3'
})
const in_submission = ref(false)
const show_alert = ref(false)
const alert_variant = ref('bg-blue-400')
const alert_msg = ref('')
const sort = ref('1')

const { playSong } = usePlayerStore()
const { userLoggedIn } = toRefs(useUserStore())

onMounted(() => {
  // 获取歌曲信息
  getSong()
  // 获取歌曲评论
  getComments()
  updateSort()
})

const commentsList = ref([])
// 根据sort 计算出排序后的评论列表
const sortedCommentsList = computed(() => {
  // 评论中的时间进行翻译
  if (locale.value === 'zh') {
    dayjs.locale('zh-cn')
  } else {
    dayjs.locale('en')
  }

  return commentsList.value.slice().sort((a, b) => {
    if (sort.value === '1') {
      return new Date(b.time) - new Date(a.time)
    }
    return new Date(a.time) - new Date(b.time)
  })
})

// 获取音乐信息
const id = computed(() => {
  return route.params.id
})
const getSong = async () => {
  const snapshot = await songsCollection.doc(id.value).get()
  // 如果查询的歌曲不存在，就没有必要留在song歌曲页面了，将其跳转到首页
  if (!snapshot.exists) {
    return router.push({
      name: 'home'
    })
  }
  song.value = snapshot.data()
}

const submit = async (values, { resetForm }) => {
  in_submission.value = true
  show_alert.value = true
  alert_msg.value = $t('song.upload_msg')
  alert_variant.value = 'bg-blue-400'

  // 提交的评论信息
  const comment = {
    // 记录该评论是那首歌曲下的
    songid: id.value,
    content: values.comment,
    // firebase 数据库不能记录JS日期对象，所以将其转为字符串进行存储
    time: new Date().toString(),
    uid: auth.currentUser.uid,
    name: auth.currentUser.displayName
  }

  try {
    await commentsCollection.add(comment)
  } catch (e) {
    in_submission.value = false
    alert_msg.value = $t('song.comment_failed')
    alert_variant.value = 'bg-red-400'
    return
  }

  // 重置表单
  resetForm()

  // 歌曲评论数量+1 + 更新数据库的评论数据
  song.value.comment_count++
  await songsCollection.doc(id.value).update({ comment_count: song.value.comment_count })

  // 重新获取所有该首歌曲下的所有评论
  await getComments()

  in_submission.value = false
  alert_msg.value = $t('song.comment_msg')
  alert_variant.value = 'bg-green-400'
}

const getComments = async () => {
  // 获取该首歌曲下的所有评论
  const snapshots = await commentsCollection.where('songid', '==', id.value).get()

  // 每次将评论数组置为空数组，防止重复添加
  commentsList.value = []

  snapshots.forEach((doc) => {
    commentsList.value.push({
      cid: doc.id,
      ...doc.data()
    })
  })

  console.log(commentsList.value)
}

const fromNow = (time) => {
  return dayjs(time).fromNow()
}

const querySort = computed(() => {
  return route.query.sort
})
const updateSort = () => {
  // 将路由上的sort排序取值赋值给sort
  // 需要判断sort是否存在，并且是否是 1 或 2
  sort.value = querySort.value === '1' || querySort.value === '2' ? querySort.value : '1'
}

watch(sort, (newVal) => {
  // 在sort改变的时候，将sort排序的值存储到路由url上，不丢失选择排序
  // 如果修改后的值与当前路由上的sort值一样，就没有必要进行路由添加了
  if (newVal === querySort.value) return
  // console.log(newVal)
  // 将排序sort 添加到url上
  router.push({ query: { sort: newVal } })
})
</script>

<template>
  <main class="w-full mx-auto">
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
              $t('song.comment_count', song.comment_count, {
                count: song.comment_count
              })
            }}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <BaseAlertMsg
            :alert_variant="alert_variant"
            :alert_msg="alert_msg"
            :show_alert="show_alert"
          ></BaseAlertMsg>

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
