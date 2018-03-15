<template>
  <div class="center flex flex-row bg-gray0">
    <PageAside
      :items=searchTags
      @input="setSelectedTags"
    ></PageAside>
    <PageMain
    :selectedTags=selectedTags
    :projects=projects
      @cancel-tag="cancelTag"
    ></PageMain>
  </div>
</template>

<script>
import PageAside from './aside'
import PageMain from './main'
import Bus from '../../bus'
import { getAsyncProjectsIntro } from '../../data.js'

export default {
  name: 'ProjectPage',

  data() {
    return {
      selectedTags: [],
      projects: getAsyncProjectsIntro(),
    }
  },

  computed: {
    // projects 数组的长度变化时更新组件的 searchTags
    // 并更新数据中的 project 的 tags
    searchTags() {
      let tags = new Set()
      this.projects.forEach((p) => {
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
