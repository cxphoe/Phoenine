<template>
  <div class="project-container">
    <header class="header">
      <div>
        <div class="flex items-center">
          <h4>{{ detail.name }}</h4>
          <ph-tag
            :content="detail.lang"
            :styleObj="{ marginLeft: '10px', fontSize: '.7em' }"
          ></ph-tag>
        </div>
        <span class="gray6"> {{ detail.description }}</span>
      </div>
      <div class="flex items-center ml-auto mt2 pl5">
        <el-button
          class="f2"
          size="small"
          type="primary"
          @click="handleClick(detail.url)"
          round
        ><i class="fab fa-github"></i>&nbsp;源地址</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleClick(detail.homePage)"
          round
        ><i class="fas fa-eye"></i>&nbsp;Demo</el-button>
      </div>
    </header>
    <main class="main bg-white">
      <div class="main-header">
        <i class="fas fa-book"></i>
        README.md
      </div>
      <div
        v-html="doc"
        class="markdown-body pa5"
      ></div>
    </main>
  </div>
</template>

<script>
import { getAsyncProjectDetail } from '../data'

export default {
  name: 'ProjectInstance',

  data() {
    return {
      detail: getAsyncProjectDetail(this.$route.params.name),
    }
  },

  computed: {
    demoUrl() {
      return this.detail.demo
    },
    doc() {
      let doc = this.detail.doc
      if (!doc) {
        return
      }
      // 把所有 img 的根目录路径替换为相应的链接
      let cp = this.detail.contentPath
      let imgReg = /<img src="(?!(http|https))(.*)>/g
      let match = imgReg.exec(doc)
      while (match) {
        let src = match[2]
        doc = doc.replace(src, cp + src)
        match = imgReg.exec(doc)
      }
      return doc
    },
  },

  methods: {
    handleClick(url) {
      window.location.href = url
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  margin: 1.5rem 0;
  display: flex;
  flex-wrap: wrap;

  h4 {
    font-family: $font-display;
  }

  a {
    color: $color-text;
    font-size: .8rem;
    padding: .3rem .4rem;
    margin-left: .5rem;
    background-color: $color-gray3;
    border: 1px solid $color-gray3;
    border-radius: .25rem;
    background-image: linear-gradient(-180deg, $color-light 0%, $color-gray2 90%);;

    &:hover {
      text-decoration: none;
      background-image: none;
      border-color: $color-gray5;
    }
  }
}

.main {
  border: 1px solid $color-gray4;
  border-radius: .25rem;

  .main-header {
    border-bottom: 1px solid $color-gray4;
    padding: .5rem .6rem;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: $color-light;
  }
}

.project-container {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5rem;
}

@media screen and (max-width: 576px) {
  .project-container {
    width: 95%;
  }
}

@media screen and (min-width: 576px) {
  .project-container {
    width: 550px;
  }
}

@media screen and (min-width: 768px) {
  .project-container {
    width: 720px;
  }
}

@media screen and (min-width: 992px) {
  .project-container {
    width: 960px;
  }
}
</style>
