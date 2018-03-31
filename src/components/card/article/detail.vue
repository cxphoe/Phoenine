<template>
  <ph-card
    class="article-detail shadow--4dp"
    plain
  >
    <div
      slot="media"
      class="article-title"
      :style="{ backgroundImage: 'url(' + img + ')' }"
    >
      <span
        class="text-gray0-shadow-b4"
      >{{ title }}</span>
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
        <div>
          <template v-if="tags.length > 0">
            <el-popover
              ref="bookmark"
              trigger="click"
              placement="bottom"
            >
              <router-link
                class="link article-tag-link"
                v-for="(tag, index) in tags"
                :key="index"
                :to="`/article/tag?name=${tag}`"
              >{{ tag }}</router-link>
            </el-popover>
            <ph-button class="article-bookmark" v-popover:bookmark>
              <span>
                <i class="fas fa-bookmark"></i>
              </span>
            </ph-button>
          </template>
        </div>
      </div>
    </div>
    <div class="markdown-body article-content" v-html="markedHtml">
    </div>
    <div class="article-comment"></div>
  </ph-card>
</template>

<script>
import {
  dateFormat,
} from '../../../utils/article'

export default {
  name: 'ArticleDatailCard',

  props: {
    img: String,
    title: {
      type: String,
      default: '--',
    },
    markedHtml: {
      type: String,
      default: '...',
    },
    editedAt: {
      type: String,
      default: '1970-1-1',
    },
    tags: {
      type: Array,
      default: function () {
        return []
      },
    },
  },

  computed: {
    editedDate() {
      return dateFormat(this.editedAt)
    },
  },

  created() {
    let config = this.getGlobalConfig()
    this.avatar = config.imgPaths.avatar
    this.username = config.username
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

  .article-bookmark {
    margin-right: .5rem;
    padding: 1.1rem;
    font-size: 21px;
    line-height: 21px;
    background-color: transparent;

    &:hover {
      background-color: #eee;
    }
  }

  .article-content {
    max-width: 90%;
    margin: 1rem auto 3rem;
    font-family: $font-main;
    font-size: 15px;
  }

  .article-comment {
    padding: 2rem;
    background-color: #eee;
  }
}

.article-tag-link {
  display: block;
  padding: .5rem 0;
  color: $color-first;

  &:hover {
    background-color: #efefef;
  }
}
</style>
