<template>
  <ph-collapse v-model="activeName">
    <ph-collapse-item name="archive">
      <span slot="title" class="flex items-center">
        <span class="sidebar-icon">
          <i class="fas fa-archive"></i>
        </span>
        <span class="sidebar-text">归档</span>
      </span>
      <ph-sidebar-item
        v-for="(data, index) in archiveStat"
        :key="index"
        @click="handleArchiveClick(data[0])"
      >
        <div class="stat-meta">
          <span>{{ dateFormat(data[0]) }}</span>
          <span class="stat-count">{{ data[1] }}</span>
        </div>
      </ph-sidebar-item>
    </ph-collapse-item>
    <ph-collapse-item name="tags">
      <span slot="title" class="flex items-center">
        <span class="sidebar-icon">
          <i class="fas fa-tags"></i>
        </span>
        <span class="sidebar-text">标签</span>
      </span>
      <ph-sidebar-item
        v-for="(count, tag) in tagStat"
        :key="tag"
        @click="handleTagClick(tag)"
      >
        <div class="stat-meta">
          <span>{{ tag }}</span>
          <span class="stat-count">{{ count }}</span>
        </div>
      </ph-sidebar-item>
    </ph-collapse-item>
    <ph-collapse-item name="category">
      <span slot="title" class="flex items-center">
        <span class="sidebar-icon">
          <i class="fas fa-th"></i>
        </span>
        <span class="sidebar-text">分类</span>
      </span>
      <ph-sidebar-item
        v-for="(count, cate) in categoryStat"
        :key="cate"
        @click="handleCateClick(cate)"
      >
        <div class="stat-meta">
          <span>{{ cate }}</span>
          <span class="stat-count">{{ count }}</span>
        </div>
      </ph-sidebar-item>
    </ph-collapse-item>
  </ph-collapse>
</template>

<script>
import { isSuccess } from '../../utils/data/data'

export default {
  name: 'SidebarStat',

  data() {
    return {
      database: this.getArticleDatabase(),
      archiveStat: [],
      categoryStat: {},
      tagStat: {},
    }
  },

  props: {
    activeCollapse: String,
  },

  computed: {
    activeName: {
      get() {
        return this.activeCollapse
      },

      set(value) {
        this.$emit('update:activeCollapse', value)
      },
    },
  },

  watch: {
    'database.status': {
      deep: true,
      immdiate: true,
      handler() {
        let db = this.database
        let s = db.status
        if (isSuccess(s)) {
          this.updateStat(db.getDatabaseStat())
        }
      },
    },
  },

  methods: {
    updateStat(stat) {
      this.archiveStat = stat.archiveStat
      this.categoryStat = stat.categoryStat
      this.tagStat = stat.tagStat
    },

    handleClick() {
      this.activeCollapse = ''
    },

    dateFormat(time) {
      let [year, month] = time
      return `${month < 10 ? '0' + month : month}月 ${year}`
    },

    handleArchiveClick(time) {
      let [year, month] = time
      this.$router.push(`/article/archive?year=${year}&month=${month}`)
    },

    handleCateClick(cate) {
      this.$router.push(`/article/category?name=${cate}`)
    },

    handleTagClick(tag) {
      this.$router.push(`/article/tag?name=${tag}`)
    },
  },
}
</script>

<style>

</style>
