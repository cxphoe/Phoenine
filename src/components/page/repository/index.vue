<template>
  <div class="center flex flex-row bg-gray0">
    <ph-sidebar zBaseIndex="13" closable cover>
      <span slot="icon" class="repo-page-icon">
        <i class="fas fa-list"></i>
      </span>
      <PageAside
        class="h-100"
        :items=searchTags
        @input="setSelectedTags"
      ></PageAside>
    </ph-sidebar>
    <PageMain
      :selectedTags=selectedTags
      :repos=repos
      @cancel-tag="cancelTag"
    ></PageMain>
  </div>
</template>

<script>
import PageAside from './aside'
import PageMain from './main'
import Bus from '../../bus'
import { getAsyncReposIntro } from '../../data.js'

export default {
  name: 'RepositoryPage',

  data() {
    return {
      selectedTags: [],
      repos: getAsyncReposIntro(),
    }
  },

  computed: {
    // repositories 数组的长度变化时更新组件的 searchTags
    // 并更新数据中的 project 的 tags
    searchTags() {
      let tags = new Set()
      this.repos.forEach((p) => {
        p.tags.forEach((tag) => {
          tags.add(tag)
        })
      })
      return Array.from(tags)
    },
  },

  methods: {
    cancelTag(name) {
      let tags = this.selectedTags
      tags.splice(tags.indexOf(name), 1)
      Bus.$emit('item-remove', name)
    },

    setSelectedTags(tagList) {
      this.selectedTags = tagList
    },
  },

  components: {
    PageAside,
    PageMain,
  },
}
</script>

<style lang="scss" scoped>
.repo-page-icon {
  position: fixed;
  font-size: 1.5rem;
  left: 1.5rem;
  top: 4.5rem;
  z-index: 9;
}
</style>
