export default {
  methods: {
    getGlobalConfig() {
      return this.$root.$data.config
    },

    getRepoDatabase() {
      return this.$root.$data.repoDatabase
    },

    getArticleDatabase() {
      return this.$root.$data.articleDatabase
    },
  },
}
