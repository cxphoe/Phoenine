<template>
  <ph-card class="article" :bodyStyle="bodyStyle">
    <div slot="header">
      <div class="f4 fw6 mb1">{{ title }}</div>
      <div class="article-intro-meta gray5">
        <span class="flex items-center">
          <i class="fas fa-tags"></i>
          <ph-tag
            class="article-tag"
            v-for="(tag, index) in articleTags"
            :content="tag"
            :key="index"
            plain
            round
          ></ph-tag>
        </span>
        <span>
          <i class="fas fa-calendar-alt"></i>
          {{ editedDate }}
        </span>
      </div>
    </div>
    <div class="content">
      <div
        class="text item markdown-body"
        v-html="previewContent"
      ></div>
      <div class="article-link">
        <a href="#">
          阅读全文
          <i class="fas fa-chevron-circle-down"></i>
        </a>
      </div>
    </div>
  </ph-card>
</template>

<script>
import { toMarked, getFrontLines } from '../../util'

export default {
  name: 'ArticleCard',

  data() {
    return {
      bodyStyle: {
        'background-color': '#f7f9fe',
      },
    }
  },

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
      return `${year}/${month}/${day}`
    },
    previewContent() {
      console.log(this.content)
      let preview = getFrontLines(this.content, 10)
      return toMarked(preview)
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  margin-bottom: 10px;

  .article-intro-meta {
    display: flex;
    font-size: .7rem;

    & > span {
      padding-right: .5rem;

      & + span {
        border-left: 1px solid #ccc;
        padding-left: .5rem;
      }
    }
  }

  .article-tag {
    font-size: .7rem;
    padding: 0 .2rem;
    margin: 0;
    margin-left: 3px;
    color: $color-gray5;
    border-color: $color-gray5;
  }

  &:hover {
    box-shadow: 0 3px 10px 1px rgba($color-text, 0.3);
  }
}

.article-link {
  margin: 10px 0 -5px;
  text-align: right;

  a {
    text-decoration-line: none;
    color: $color-first;

    &:hover {
      color: $color-text;
    }
  }
}
</style>
