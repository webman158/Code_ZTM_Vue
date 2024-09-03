<template>
  <div class="result">
    <div class="title">{{ result.title }}</div>
    <div class="desc">{{ result.desc }}</div>
  </div>
</template>

<script>
export default {
  props: ['results', 'totalCurrent'],
  computed: {
    result() {
      let res

      this.results.forEach((item, index) => {
        if (this.totalCurrent >= item.min && this.totalCurrent <= item.max) {
          res = item
        }
      })

      return res
    },
  },
}
</script>
