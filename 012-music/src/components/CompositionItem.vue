<script>
import AlertMsg from './AlertMsg.vue'
import { songsCollection, storage } from '@/plugins/firebase'

export default {
  name: 'CompositionItem',
  components: { AlertMsg },
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    toggle_is_editing: {
      type: Function,
      required: true
    },
    is_editing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required|min:3|max:100',
        genre: 'min:0|max:100'
      },
      in_submission: false,
      show_alert: false,
      alert_msg: '',
      alert_variant: ''
    }
  },
  methods: {
    // 提交
    async editSong(values) {
      // console.log(values)

      // 提取出需要修改的数据，提交给服务器
      const { modified_name, genre } = values
      // console.log(modified_name, genre)

      // 出现提示
      this.in_submission = true
      this.show_alert = true
      this.alert_msg = this.$t('manage.upload_song')
      this.alert_variant = 'bg-blue-500'

      try {
        await songsCollection.doc(this.song.docId).update({ modified_name, genre })
      } catch (error) {
        this.in_submission = false
        this.alert_msg = this.$t('manage.upload_error_msg')
        this.alert_variant = 'bg-red-500'
        return
      }

      this.updateSong(this.index, { modified_name, genre })

      // 提交成功，当前不是处于编辑中 (做法1)
      // this.toggle_is_editing(false)

      // 做法2
      this.$emit('update:is_editing', false)

      // 成功后的提示
      this.in_submission = false
      this.alert_msg = this.$t('manage.upload_success_msg')
      this.alert_variant = 'bg-green-500'
    },
    async deleteSong() {
      // 删除 storage 中上传的audio + 删除 songs对应的文档集合 + 删除 父组件中的数据
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)
      await songRef.delete()

      await songsCollection.doc(this.song.docId).delete()

      this.removeSong(this.index)
    }
  }
}
</script>

<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div class="overflow-hidden" v-show="!showForm">
      <h4 class="inline-block text-xl font-bold">{{ song.modified_name }}</h4>
      <button
        @click.prevent="deleteSong"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <AlertMsg
        :show_alert="show_alert"
        :alert_msg="alert_msg"
        :alert_variant="alert_variant"
      ></AlertMsg>

      <!-- 表单初始数据，就是父传子的song歌曲数据 -->
      <vee-form :validation-schema="schema" :initial-values="song" @submit="editSong">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('manage.song_title') }}</label>
          <vee-field
            name="modified_name"
            label="歌曲名"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-500 dark:text-white"
            :placeholder="$t('manage.enter_song_title')"
            @input="$emit('update:is_editing', true)"
          />
          <error-message name="modified_name" class="text-red-400"></error-message>
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('manage.genre') }}</label>
          <vee-field
            name="genre"
            label="歌曲信息"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded dark:bg-gray-500 dark:text-white"
            :placeholder="$t('manage.enter_genre')"
            @input="$emit('update:is_editing', true)"
          />
          <error-message name="genre" class="text-red-400"></error-message>
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
          {{ $t('login_register.submit') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = false"
        >
          {{ $t('manage.go_back') }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<style scoped></style>
