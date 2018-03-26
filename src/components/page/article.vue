<template>
  <ArticleIntro :dataset="matchedSet" />
</template>

<script>
import ArticleIntro from '../intro/article'
import articleDatabase from '../../database/article'

export default {
  name: 'ArticlePage',

  data() {
    return {
      dataset: articleDatabase.database,
      routeData: {
        archive: null,
        category: null,
        tag: null,
      },
    }
  },

  computed: {
    matchedSet() {
      let set = this.dataset
      let {
        archive,
        category,
        tag
      } = this.routeData
      if (archive !== null) {
        set = set.filter(d => {
          return d.editedAt.indexOf(archive) > -1
        })
      } else if (category !== null) {
        set = set.filter(d => {
          return d.category === category
        })
      } else if (tag !== null) {
        set = set.filter(d => {
          return d.articleTags.includes(tag)
        })
      }

      // 如果没有匹配的项，则重定向到文章主页
      if (set.length === 0) {
        this.init()
        this.redirect()
        return this.dataset
      }
      return set
    },
  },

  watch: {
    '$route': 'fetchData',
  },

  methods: {
    init() {
      let data = this.routeData
      for (let key in data) {
        data[key] = null
      }
    },

    fetchData() {
      let data = this.routeData
      let type = this.$route.params.type
      let query = this.$route.query

      if (type === 'archive' && query.year && query.month) {
        data.archive = `${query.year}-${query.month}`
      } else if (type === 'category' && query.name) {
        data.category = query.name
      } else if (type === 'tag' && query.name) {
        data.tag = query.name
      } else {
        this.redirect()
      }
    },

    redirect() {
      this.$router.push('/article')
    },
  },

  components: {
    ArticleIntro,
  },

  beforeRouteUpdate(to, from, next) {
    this.init()
    next()
  },

  created() {
    this.fetchData()
  },
}
</script>
