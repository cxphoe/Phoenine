<template>
  <div class="about-page">
    <Loading v-if="status === null" size="md" />
    <ErrorPage
      v-else-if="!success"
      :status="status"
      :statusText="message"
    />
    <ArticleDetailCard
      v-else
      v-bind="data"
      :markedHtml="markedHtml"
    ></ArticleDetailCard>
  </div>
</template>

<script>
import Config from '../../mixins/config'
import ArticleDetailCard from '../card/article/detail'
import Loading from '../utils/loading'
import ErrorPage from '../utils/error_page'
import { getData } from '../../utils/data'
import { toMarked } from '../../utils/article'

export default {
  name: 'AboutPage',

  mixins: [Config],

  data() {
    return {
      status: null,
      message: '',
      data: {},
      content: '',
    }
  },

  computed: {
    markedHtml() {
      return toMarked(this.content)
    },

    success() {
      let s = +this.status
      return (s >= 200 && s < 300) || s === 304
    },
  },

  methods: {
    setErrorInfo(errcode, message) {
      this.status = errcode
      this.message = message
    },
  },

  components: {
    ArticleDetailCard,
    Loading,
    ErrorPage,
  },

  created() {
    let path = this.getGlobalConfig().aboutMePath
    let json = path + '/about_me.json'
    let md = path + '/about_me.md'

    getData(json, response => {
      this.status = response.status
      this.data = response.data
    }, this.setErrorInfo)

    getData(md, response => {
      this.status = response.status
      this.content = response.data
    }, this.setErrorInfo)
  },
}
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 25rem;
}
</style>
