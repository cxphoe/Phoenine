<template>
  <transition name="fade-slide-d" mode="out-in">
    <ph-card
      class="article-detail shadow--4dp"
      plain
    >
      <div
        slot="media"
        class="article-title"
        :style="{ backgroundImage: 'url(' + data.img + ')' }"
      >
        <span
          class="text-gray0-shadow-b4"
        >{{ data.title }}</span>
      </div>
      <div>
        <div class="pa3 f2 article-meta">
          <div class="flex items-center">
            <div class="avatar article-avatar">
              <img :src="avatar">
            </div>
            <div class="flex flex-column ml3">
              <span class="fw6 username">{{ username }}</span>
              <span class="lh-solid">{{ editedDate }}</span>
            </div>
          </div>
          <span class="f4">
            <i class="fas fa-bookmark"></i>
          </span>
        </div>
      </div>
      <div class="markdown-body article-content" v-html="markedHtml">
      </div>
      <div class="article-comment"></div>
    </ph-card>
  </transition>
</template>

<script>
import articleDatabase from '../../database/article'
import { dateFormat, toMarked } from '../../utils/article'
import config from '../../config'

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
      let db = this.articleDatabase
      return this.dbIndex + 1 < db.database.length
    },

    editedDate() {
      return dateFormat(this.data.editedAt)
    },

    markedHtml() {
      return toMarked(this.data.content)
    },
  },

  methods: {
    fetchData() {
      let params = this.$route.params
      let name = params.name

      let data = this.database.getData(name)
      if (data !== null) {
        this.dbIndex = data.index
        this.data = data.data
      }
    },
  },

  created() {
    this.fetchData()
  },
}
</script>

<style lang="scss" scoped>
.article-detail {
  margin: 0;
  min-height: 25pc;

  .article-avatar {
    width: 2.75rem;
    height: 2.75rem;
  }

  .username {
    font-size: .9rem;
  }

  .article-title {
    font-size: 34px;
    height: 280px;

    @media screen and (max-width: 840px) {
      font-size: 22px;
    }
  }

  .article-meta {
    border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .article-content {
    max-width: 90%;
    margin: 1rem auto 3rem;
    font-family: $font-main;
  }

  .article-comment {
    padding: 2rem;
    background-color: #eee;
  }
}
</style>
