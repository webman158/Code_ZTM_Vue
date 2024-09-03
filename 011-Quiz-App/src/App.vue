<script>
import Questions from './components/Questions.vue'
import Result from './components/Result.vue'

export default {
  name: 'App',
  components: { Questions, Result },
  data() {
    return {
      // 回答问题的数量
      questionAnswered: 0,
      // 回答正确的总数
      totalCurrent: 0,
      questions: [
        {
          q: 'What is 2 + 2?',
          answers: [
            {
              text: '4',
              is_correct: true,
            },
            {
              text: '3',
              is_correct: false,
            },
            {
              text: 'Fish',
              is_correct: false,
            },
            {
              text: '5',
              is_correct: false,
            },
          ],
        },
        {
          q: 'How many letters are in the word "Banana"?',
          answers: [
            {
              text: '5',
              is_correct: false,
            },
            {
              text: '7',
              is_correct: false,
            },
            {
              text: '6',
              is_correct: true,
            },
            {
              text: '12',
              is_correct: false,
            },
          ],
        },
        {
          q: 'Find the missing letter: C_ke',
          answers: [
            {
              text: 'e',
              is_correct: false,
            },
            {
              text: 'a',
              is_correct: true,
            },
            {
              text: 'i',
              is_correct: false,
            },
          ],
        },
      ],
      results: [
        {
          min: 0,
          max: 2,
          title: 'Try again!',
          desc: 'Do a little more studying and you may succeed!',
        },
        {
          min: 3,
          max: 3,
          title: "Wow, you're a genius!",
          desc: 'Studying has definitely paid off for you!',
        },
      ],
    }
  },
  methods: {
    onSelectAnswered(is_correct) {
      // console.log(is_correct)
      // 统计正确的数量
      is_correct && this.totalCurrent++
      // 进入到下一个问题
      this.questionAnswered++
    },
    reset() {
      // 重置数据
      this.questionAnswered = 0
      this.totalCurrent = 0
    },
  },
}
</script>

<template>
  <div class="ctr">
    <transition name="fade">
      <questions
        v-if="questionAnswered < questions.length"
        :questions="questions"
        :questionAnswered="questionAnswered"
        @select-answered="onSelectAnswered"
      />
      <Result v-else :results="results" :totalCurrent="totalCurrent"></Result>
    </transition>
    <button
      type="button"
      class="reset-btn"
      v-if="questionAnswered >= questions.length"
      @click="reset"
    >
      Reset
    </button>
  </div>
</template>

<style scoped></style>
