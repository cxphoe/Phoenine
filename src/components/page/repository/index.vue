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
      :status="database.status"
      :message="database.message"
      :repos="database.dataset"
      @cancel-tag="cancelTag"
    ></PageMain>
  </div>
</template>

<script>
import PageAside from './aside'
import PageMain from './main'
import Bus from '../../bus'

export default {
  name: 'RepositoryPage',

  data() {
    return {
      database: this.getRepoDatabase(),
      selectedTags: [],
    }
  },

  computed: {
    // repositories 数组的长度变化时更新组件的 searchTags
    // 并更新数据中的 project 的 tags
    searchTags() {
      let tags = new Set()
      let repos = this.database.dataset
      repos.forEach((p) => {
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
  line-height: 21px;
  left: 0;
  padding: .75rem 1rem;
  background-color: #fff;
  top: 3.1rem;
  z-index: 9;
}
</style>
