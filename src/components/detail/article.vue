<template>
  <div>
    <ph-sidebar class="show-xs" zBaseIndex="13" closable cover>
      <span slot="icon" class="article-catalogue-icon">
        <i class="fas fa-list-ol"></i>
      </span>
      <ph-catalogue>
        <ph-catalogue-item
          class="article-anchor"
          v-for="(data, index) in catalogue"
          v-bind="data"
          :key="index"
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
        <ph-button class="push-btn" @click="pushNewPath(dbIndex-1)">
          <ph-arrow-icon initStatus="left"></ph-arrow-icon>
        </ph-button>
        <span>前篇</span>
      </div>
      <div
        v-if="hasNext"
        class="ml-auto flex items-center"
      >
        <span>旧篇</span>
        <ph-button class="push-btn" @click="pushNewPath(dbIndex+1)">
          <ph-arrow-icon initStatus="right"></ph-arrow-icon>
        </ph-button>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDetailCard from '../card/article/detail'
import articleDatabase from '../../database/article'
import Config from '../../mixins/config'
import { toMarked, getmdCatalogue } from '../../utils/article'

export default {
  name: 'ArticleDetail',

  mixins: [Config],

  data() {
    return {
      database: articleDatabase,
      dbIndex: -1,
      data: {
        filename: 'loading...',
        img: '',
        title: 'loading...',
        markedHtml: 'loading...',
        articleTags: [],
        editedAt: '1970-1-1',
      },
    }
  },

  computed: {
    hasPrev() {
      return this.dbIndex > 0
    },

    hasNext() {
      let db = this.database
      return this.dbIndex + 1 < db.database.length
    },

    catalogue() {
      return getmdCatalogue(this.data.markedHtml)
    },
  },

  methods: {
    fetchData() {
      let params = this.$route.params
      let name = params.name

      let data = this.database.getData(name)
      if (data !== null) {
        let data1 = this.data
        let data2 = data.data
        this.dbIndex = data.index
        for (let key in data2) {
          if (key in data1) {
            data1[key] = data2[key]
          }
        }
        data1.markedHtml = toMarked(data2.content)
      }
    },

    pushNewPath(index) {
      let db = this.database
      let data = db.database[index]
      this.$router.push(`/article/detail/${data.filename}`)
    },
  },

  watch: {
    '$route': 'fetchData',
  },

  components: {
    ArticleDetailCard,
  },

  created() {
    this.fetchData()
  },

  mounted() {
    let config = this.getConfig()
    this.avatar = config.imgPaths.avatar
    this.username = config.username
  },
}
</script>

<style lang="scss" scoped>
.article-catalogue-icon {
  position: fixed;
  z-index: 10;
  font-size: 1.5rem;
  left: 1.5rem;
  top: 4.5rem;
}

@media screen and (max-width: 484px) {
  .show-xs {
    display: none;
  }
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
  padding: 1rem;
  background-color: #fff;

  & + *, * + & {
    margin-left: 1rem;
  }
}
</style>
