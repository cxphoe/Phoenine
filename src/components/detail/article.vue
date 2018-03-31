<template>
  <div class="article-detail">
    <Loading v-if="database.status === null" size="md" />
    <ErrorPage
      v-else-if="error"
      :status="error.code"
      :statusText="error.message"
    />
    <template v-else>
      <ph-sidebar zBaseIndex="13" v-model="catalogueOpen" closable cover>
        <span slot="icon" class="article-catalogue-icon">
          <i class="fas fa-list-ol"></i>
        </span>
        <ph-catalogue>
          <ph-catalogue-item
            class="article-anchor"
            v-for="(data, index) in catalogue"
            v-bind="data"
            :key="index"
            @click="handleCatalogueClick"
          ></ph-catalogue-item>
        </ph-catalogue>
      </ph-sidebar>
      <ArticleDetailCard
        v-bind="data"
      ></ArticleDetailCard>
      <div class="flex items-center f2 pa3 pb0">
        <div
          v-if="hasPrev"
          class="mr-auto flex items-center"
        >
          <ph-button
            class="push-btn"
            @click="pushNewPath(dbIndex-1)"
          >
            <ph-arrow-icon initStatus="left"></ph-arrow-icon>
          </ph-button>
          <span>前篇</span>
        </div>
        <div
          v-if="hasNext"
          class="ml-auto flex items-center"
        >
          <span>旧篇</span>
          <ph-button
            class="push-btn"
            @click="pushNewPath(dbIndex+1)
          ">
            <ph-arrow-icon initStatus="right"></ph-arrow-icon>
          </ph-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ArticleDetailCard from '../card/article/detail'
import Loading from '../utils/loading'
import ErrorPage from '../utils/error_page'
import { toMarked, getmdCatalogue } from '../../utils/article'
import { getData, isSuccess } from '../../utils/data/data'

export default {
  name: 'ArticleDetail',

  data() {
    return {
      database: this.getArticleDatabase(),
      dbIndex: -1,
      data: {
        filename: 'loading...',
        img: '',
        title: 'loading...',
        markedHtml: 'loading...',
        articleTags: [],
        editedAt: '1970-1-1',
      },
      error: null,
      catalogueOpen: false,
    }
  },

  computed: {
    hasPrev() {
      return this.dbIndex > 0
    },

    hasNext() {
      let ds = this.database.dataset
      return this.dbIndex + 1 < ds.length
    },

    catalogue() {
      return getmdCatalogue(this.data.markedHtml)
    },

    sourcePath() {
      let config = this.getGlobalConfig()
      return config.articleBasePath
    },
  },

  watch: {
    'database.status': {
      deep: true,
      immediate: true,
      handler() {
        let db = this.database
        let s = db.status
        if (s === null) {
          return
        }

        if (!isSuccess) {
          this.error = {
            code: db.status,
            message: db.message,
          }
        } else {
          this.fetchData()
        }
      },
    },
  },

  methods: {
    fetchData() {
      let params = this.$route.params
      let name = params.name

      let article = this.database.getArticle(name)
      if (article !== null) {
        let to = this.data
        let from = article.data
        this.dbIndex = article.index
        for (let key in from) {
          if (key in to) {
            to[key] = from[key]
          }
        }

        let contentPath = this.sourcePath + from.path
        getData(contentPath, resp => {
          to.markedHtml = toMarked(resp.data)
        }, (errcode, message) => {
          this.error = {
            code: errcode,
            message,
          }
        })
      } else {
        this.error = {
          code: 404,
          message: '你访问的资源不存在',
        }
      }
    },

    pushNewPath(index) {
      let db = this.database
      let data = db.database[index]
      this.$router.push(`/article/detail/${data.filename}`)
    },

    handleCatalogueClick() {
      this.catalogueOpen = false
    },
  },

  components: {
    ArticleDetailCard,
    ErrorPage,
    Loading,
  },

  mounted() {
    let config = this.getGlobalConfig()
    this.avatar = config.imgPaths.avatar
    this.username = config.username
  },
}
</script>

<style lang="scss" scoped>
.article-detail {
  min-height: 25rem;
}

.article-catalogue-icon {
  position: fixed;
  z-index: 10;
  font-size: 1.5rem;
  line-height: 21px;
  left: 3.5rem;
  top: 0rem;
  padding: .75rem 1rem;
  background-color: #fff;
}

.article-anchor {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.25rem 0;

  &:hover {
    text-decoration: none;
    color: $color-first;
  }
}

.push-btn {
  transition: .3s;
  box-shadow: 0 3px 10px 1px #bbb;
  padding: 1rem;
  background-color: #fff;

  & + *, * + & {
    margin-left: 1rem;
  }

  &:hover {
    box-shadow: 0 6px 12px 1px #bbb;
  }
}
</style>
