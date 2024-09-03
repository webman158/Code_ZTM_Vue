<template>
  <div class="questions-ctr">
    <div class="progress">
      <div class="bar" :style="barStyle"></div>
      <div class="status">
        {{ questionAnswered }} out of {{ questions.length }} questions answered
      </div>
    </div>
    <transition-group name="fade">
      <div
        class="single-question"
        v-for="(question, index) in questions"
        :key="question.q"
        v-show="questionAnswered === index"
      >
        <div class="question">{{ question.q }}</div>
        <div class="answers">
          <div
            class="answer"
            v-for="answer in question.answers"
            :key="answer.text"
            @click="selectAndswer(answer.is_correct)"
          >
            {{ answer.text }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: ['questions', 'questionAnswered'],
  computed: {
    barStyle() {
      return {
        width: (this.questionAnswered / this.questions.length) * 100 + '%',
      }
    },
  },
  methods: {
    selectAndswer(is_correct) {
      this.$emit('select-answered', is_correct)
    },
  },
}
</script>
