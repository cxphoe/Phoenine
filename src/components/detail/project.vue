<template>
  <div class="project-container ph-container-wo-xl">
    <ErrorPage
      v-if="fetchFailed"
      :status="resp.status"
      :statusText="resp.statusText"
    ></ErrorPage>
    <ErrorPage
      v-else-if="notProject"
      status="404"
      statusText="你访问的页面不存在"
    ></ErrorPage>
    <div v-else>
      <header class="header">
        <div>
          <div class="flex items-center">
            <h4>{{ detail.name }}</h4>
            <ph-tag
              :content="detail.lang"
              :styleObj="{ marginLeft: '10px', fontSize: '.7em' }"
              round
            ></ph-tag>
          </div>
          <span class="gray6"> {{ detail.description }}</span>
        </div>
        <div class="flex items-center ml-auto mt2 pl4">
          <a
            class="link project-btn"
            :href="detail.url"
          >
            <span class="ph-btn-icon">
              <i class="fab fa-github-alt"></i>
            </span>
            <span>源地址</span>
          </a>
          <a
            class="link project-btn"
            v-if="detail.homePage"
            :href="detail.homePage"
          >
            <span class="ph-btn-icon">
              <i class="fas fa-eye"></i>
            </span>
            <span>Demo</span>
          </a>
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
    <CommentList
      :dataset="dataset"
      @submit="handleSubmit"
    ></CommentList>
  </div>
</template>

<script>
import { getAsyncProjectDetail } from '../data'
import ErrorPage from '../utils/error_page'
import CommentList from '../comment/list'
import projectDatabase from '../../database/project'

export default {
  name: 'ProjectInstance',

  data() {
    let name = this.$route.params.name
    const resp = getAsyncProjectDetail(name)
    return {
      name,
      resp,
      dataset: projectDatabase.getDataset(name)
    }
  },

  computed: {
    detail() {
      return this.resp.data
    },
    fetchFailed() {
      let s = this.resp.status
      return s && (s < 200 || s >= 300)
    },
    notProject() {
      let isProject = this.resp.isProject
      return typeof isProject === 'boolean' && !isProject
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
    handleSubmit(data) {
      projectDatabase.addComment(this.name, data)
    },
  },

  components: {
    ErrorPage,
    CommentList,
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

.link {
  color: $color-first;
  &:hover {
    color: #fff;
    background-color: rgba($color-first, 0.7);
    border-color: $color-first;
  }
}

.link + .link {
  margin-left: .5rem;
}

.project-btn {
  @include ph-btn($color-first, #fff);
}

.project-container {
  margin-bottom: 5rem;
}

@media screen and (max-width: 576px) {
  .project-container {
    width: 95%;
  }
}
</style>
