<template>
  <div>
    <ph-sidebar class="show-md" zBaseIndex="13" closable cover>
      <span slot="icon" class="article-catalogue-icon">
        <i class="fas fa-list-ol"></i>
      </span>
      <ph-catalogue>
        <ph-catalogue-item
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
import config from '../../config'
import { toMarked, getmdCatalogue } from '../../utils/article'

const data = {
  avatar: config.imgPaths.avatar,
  username: config.username,
}

export default {
  name: 'ArticleDetail',

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
      ...data,
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
        console.log(this.catalogue)
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

@media screen and (max-width: 800px) {
  .show-md {
    display: none;
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
