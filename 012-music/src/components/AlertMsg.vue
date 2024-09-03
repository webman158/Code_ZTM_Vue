<script>
export default {
  props: {
    show_alert: {
      type: Boolean,
      default: false
    },
    alert_variant: {
      type: String,
      required: true
    },
    alert_msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 消息提示
    }
  },
  methods: {
    afterLeave() {
      this.$emit('done')
    }
  }
}
</script>

<template>
  <transition enter-active-class="animate__animated animate__zoomIn">
    <div
      v-if="show_alert"
      class="text-white text-center font-bold p-4 rounded mb-4 rounded"
      :class="alert_variant"
    >
      {{ alert_msg }}
    </div>
  </transition>
</template>

<style scoped></style>
