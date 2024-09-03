<script setup>
import { songsCollection, storage } from '@/utils/firebase'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()

const props = defineProps({
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
})

const emits = defineEmits(['update:is_editing'])

const showForm = ref(false)
const schema = ref({
  modified_name: 'required|min:3|max:100',
  genre: 'min:0|max:100'
})

const in_submission = ref(false)
const show_alert = ref(false)
const alert_msg = ref('')
const alert_variant = ref('')

const editSong = async (values) => {
  // console.log(values)

  // 提取出需要修改的数据，提交给服务器
  const { modified_name, genre } = values
  // console.log(modified_name, genre)

  // 出现提示
  in_submission.value = true
  show_alert.value = true
  alert_msg.value = $t('manage.upload_song')
  alert_variant.value = 'bg-blue-500'

  try {
    await songsCollection.doc(props.song.docId).update({ modified_name, genre })
  } catch (error) {
    in_submission.value = false
    alert_msg.value = $t('manage.upload_error_msg')
    alert_variant.value = 'bg-red-500'
    return
  }

  props.updateSong(props.index, { modified_name, genre })

  // 提交成功，当前不是处于编辑中 (做法1)
  // this.toggle_is_editing(false)

  // 做法2
  emits('update:is_editing', false)

  // 成功后的提示
  in_submission.value = false
  alert_msg.value = $t('manage.upload_success_msg')
  alert_variant.value = 'bg-green-500'
}

const deleteSong = async () => {
  // 删除 storage 中上传的audio + 删除 songs对应的文档集合 + 删除 父组件中的数据
  const storageRef = storage.ref()
  const songRef = storageRef.child(`songs/${props.song.original_name}`)
  await songRef.delete()

  await songsCollection.doc(props.song.docId).delete()

  props.removeSong(props.index)
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
      <BaseAlertMsg
        :show_alert="show_alert"
        :alert_msg="alert_msg"
        :alert_variant="alert_variant"
      ></BaseAlertMsg>

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
