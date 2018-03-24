<template>
  <div class="bg-gray0 pb4">
    <div class="ph-container flex">
      <div class="a-page-sidebar hidden-md-down">
        <span class="a-page-author-avatar">
          <img src="/static/img/bg.png">
        </span>
        <div class="a-page-author-info">
          <a href="mailto:562818991@qq.com">
            <i class="far fa-envelope"></i>
            <span class="ml1">562818991@qq.com</span>
          </a>
          <a href="https://github.com/phoeninee">
            <i class="fab fa-github"></i>
            <span class="ml1">Phoenine</span>
          </a>
        </div>
      </div>
      <div class="bg-white w-100">
        <ph-tabs v-model="activeName">
          <ph-tab-pane name="article" label="文章">
            <ArticlePagePreview
              :dataset="dataset"
            ></ArticlePagePreview>
          </ph-tab-pane>
          <ph-tab-pane name="cate" label="分类">分类</ph-tab-pane>
          <ph-tab-pane name="tags" label="标签">标签</ph-tab-pane>
          <ph-tab-pane name="archive" label="归档">归档</ph-tab-pane>
        </ph-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import articleDatabase from '../../../database/article'
import ArticlePagePreview from './preview'

export default {
  data() {
    return {
      dataset: articleDatabase.database,
      activeName: 'article',
    }
  },

  components: {
    ArticlePagePreview,
  },
}
</script>

<style lang="scss" scoped>
.a-page-sidebar {
  width: 20rem;
  margin-right: 20px;
  background-color: white;
  box-shadow: 0 0 10px 1px $color-gray2;

  $avatar-width: 10rem;

  .a-page-author-avatar {
    display: block;
    border-radius: 50%;
    border: 1px dashed #ddd;
    width: $avatar-width;
    height: $avatar-width;
    overflow: hidden;
    margin: 1rem auto;

    img {
      position: relative;
      height: $avatar-width;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .a-page-author-info {
    margin: 2rem auto;
    font-size: .9rem;

    & > * {
      display: block;
      color: $color-gray6;
      padding: .1rem 2.5rem;

      &:hover {
        text-decoration: none;
        background-color: $color-gray1;
      }
    }
  }
}

.a-page-nav {
  margin-top: 20px;
}

.a-page-nav-list {
  padding: 0 1rem;
  width: 100%;

  a {
    display: block;
    text-decoration: none;
    color: $color-gray7;

    &:hover {
      text-decoration: none;
    }
  }

  & > * {
    font-size: .8rem;
    width: 25%;
    text-align: center;
  }
}
</style>
