<template>
  <ph-card class="article-preview" plain>
    <div
      slot="media"
      class="article-title"
      :style="{ backgroundImage: 'url(' + img + ')' }"
    >
      <router-link
        class="text-gray0-shadow-b4 link"
        :to="routerLink"
      >{{ title }}</router-link>
    </div>
    <div class="ph3 pv4 f2">
      <span>{{ preview }}</span>
      <router-link class="ml3" :to="routerLink">阅读全文</router-link>
    </div>
    <div class="pa3 f2 article-meta">
      <div class="flex items-center">
        <div class="avatar article-avatar">
          <img :src="avatar">
        </div>
        <div class="flex flex-column ml3">
          <span class="article-username fw6">{{ username }}</span>
          <span class="lh-solid">{{ editedDate }}</span>
        </div>
      </div>
      <ph-tag
        class="article-category lh-title"
        :content="category"
        @click="handleTagClick(category)"
        round
        plain
      ></ph-tag>
    </div>
  </ph-card>
</template>

<script>
import {
  getFrontLines,
  dateFormat,
} from '../../../utils/article'
import config from '../../../config'

const imgs = {
  avatar: config.imgPaths.avatar,
  username: config.username,
}

export default {
  name: 'ArticlePreviewCard',

  data() {
    return {
      ...imgs,
    }
  },

  props: {
    filename: String,
    img: String,
    title: {
      type: String,
      default: '--',
    },
    content: {
      type: String,
      default: '...',
    },
    editedAt: {
      type: String,
      default: '1970-1-1',
    },
    articleTags: {
      type: Array,
      default: function () {
        return []
      },
    },
    category: String,
  },

  computed: {
    routerLink() {
      return `/article/detail/${this.filename}`
    },

    editedDate() {
      return dateFormat(this.editedAt)
    },

    preview() {
      return getFrontLines(this.content, 1)
    },
  },

  methods: {
    handleTagClick(category) {
      this.$router.push(`/article/category?name=${category}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.article-preview {
  margin: 0;
  min-height: 25pc;

  & + & {
    margin-top: 3rem;
  }

  .article-title {
    font-size: 34px;

    @media screen and (max-width: 840px) {
      font-size: 22px;
    }
  }

  .article-avatar {
    width: 2.75rem;
    height: 2.75rem;
  }

  .article-username  {
    font-size: .9rem;
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
