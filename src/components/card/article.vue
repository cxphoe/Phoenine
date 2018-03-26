<template>
  <ph-card class="article-card" plain>
    <div
      slot="media"
      class="article-title"
    >
      <a
        class="text-gray0-shadow-b4 link"
        href="#"
      >{{ title }}</a>
    </div>
    <div>
      <div class="ph3 pv4 f2">
        <span>{{ preview }}</span>
        <a class="ml3" href="#">阅读全文</a>
      </div>
      <div class="pa3 f2 article-meta">
        <span>{{ editedDate }}</span>
        <ph-tag
          class="article-category lh-title"
          :content="category"
          round
          plain
        ></ph-tag>
      </div>
    </div>
  </ph-card>
</template>

<script>
import { getFrontLines } from '../../util'

export default {
  name: 'ArticleCard',

  props: {
    title: {
      type: String,
      default: '--',
    },
    content: {
      type: String,
      default: '...',
    },
    editedAt: {
      type: Date,
      default: Date.now(),
    },
    articleID: [Number, String],
    articleTags: {
      type: Array,
      default: function () {
        return []
      },
    },
    category: String,
    views: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    editedDate() {
      let date = this.editedAt
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${month}月 ${day < 10 ? '0' + day : day}, ${year}`
    },

    preview() {
      return getFrontLines(this.content, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.article-card {
  margin: 0;
  min-height: 25pc;

  & + & {
    margin-bottom: 20px;
  }

  .article-title {
    font-size: 34px;
  }

  .article-meta {
    border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .article-category {
     border-color: $color-first;
     color: $color-first;
  }

  &:hover {
    box-shadow: 0 3px 10px 1px rgba($color-text, 0.3);
  }
}
</style>
