export default {
  methods: {
    getConfig() {
      let App = this.$root.$children[0]
      return App.$options.propsData.config
    }
  },
}
