export default {
  data() {
    return {
      offset: 0,
    }
  },
  mounted() {
    console.log('Mixin Mounted')
    document.addEventListener('scroll', this.handler)
  },
  methods: {
    handler() {
      this.offset = window.pageYOffset
    },
  },
}
