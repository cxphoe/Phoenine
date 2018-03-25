<template>
  <div>
    <div class="article-header">
      <h2 class="article-title">{{ title }}</h2>
      <div class="article-meta">
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
          {{ editedAt.toLocaleDateString() }}
        </span>
      </div>
    </div>
    <div class="article-body markdown-body"></div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetail',

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
}
</script>

<style lang="scss" scoped>
.article-header {
  margin-top: 60px;
}

.article-title {
  font-size: 26px;
  font-weight: 400;
  text-align: center;
  word-break: break-word;
}

@media (max-width: 767px) {
  .article-title {
    font-size: 22px;
  }
}

.article-meta {
  margin: 3px 0 60px 0;
  color: #999;
  font-size: 12px;
  text-align: center;
  display: flex;
  text-align: center;

  span + span {
    margin-left: 10px;
  }

  span:first-child {
    margin-left: auto;
  }

  span:last-child {
    margin-right: auto;
  }

  .article-tag {
    font-size: .7rem;
    padding: 0 .2rem;
    margin: 0;
    margin-left: 3px;
    color: $color-gray5;
    border-color: $color-gray5;
  }
}
</style>
