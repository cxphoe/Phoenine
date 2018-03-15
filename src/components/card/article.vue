<template>
  <ph-card class="article" :bodyStyle="bodyStyle">
    <div slot="header">
      <h5>{{ title }}</h5>
      <div>
        <i class="fas fa-tags"></i>
        <ph-tag
          class="ph-badge"
          v-for="(tag, index) in articleTags"
          :content="tag"
          :key="index"
        ></ph-tag>
        <i class="fas fa-calendar-alt"></i>
        <ph-tag class="ph-badge" :content="updatedAt"></ph-tag>
      </div>
    </div>
    <div class="content">
      <div class="text item">
        {{ info }}
      </div>
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
    title: String,
    info: {
      type: String,
      default: '...',
    },
    updateDate: {
      type: Date,
      default: Date.now(),
    },
    articleTags: {
      type: Array,
      default: function () {
        return []
      },
    },
  },

  computed: {
    updatedAt() {
      let date = this.updateDate
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${year}/${month}/${day}`
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  margin-bottom: 10px;

  .ph-badge {
    font-size: .7rem;
    font-family: $font-display;
    color: rgba($color-text, 0.5);
    background-color: #f3f4f7;
    margin-right: 2px;
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
