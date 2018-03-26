<template>
  <ph-sidebar
    id="main-nav"
    class="slim-scrollbar"
    @aside-click="handleClick"
    @item-click="handleClick"
    closable
    cover
  >
    <div class="sidebar-header">
      <img :src="imgs.header">
      <div class="avatar sidebar-header-avatar">
        <img :src="imgs.avatar">
      </div>
    </div>
    <ph-sidebar-list>
      <ph-sidebar-item
        v-for="(page, index) in pages"
        :key="index"
      >
        <router-link
          class="link"
          exact-active-class="sidebar-link-active"
          :to="page.path"
        >
          <span class="sidebar-icon" v-html="page.prefix"></span>
          <span class="sidebar-text" v-text="page.name"></span>
        </router-link>
      </ph-sidebar-item>
    </ph-sidebar-list>

    <ph-sidebar-divider/>

    <ph-collapse v-model="activeCollapse">
      <ph-collapse-item name="archive">
        <span slot="title" class="flex items-center">
          <span class="sidebar-icon">
            <i class="fas fa-archive"></i>
          </span>
          <span class="sidebar-text">归档</span>
        </span>
        <ph-sidebar-item
          v-for="(data, index) in stat.archiveStat"
          :key="index"
          @click="handleArchiveClick(data[0][0], data[0][1])"
        >
          <div class="stat-meta">
            <span>{{ dateFormat(data[0][0], data[0][1]) }}</span>
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
          v-for="(count, tag) in stat.tagStat"
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
          v-for="(count, cate) in stat.categoryStat"
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

    <ph-sidebar-divider/>

    <ph-sidebar-list>
      <ph-sidebar-item>
        <span class="flex items-center">
          <span class="sidebar-icon">
            <i class="far fa-id-card"></i>
          </span>
          <span class="sidebar-text">About Me</span>
        </span>
      </ph-sidebar-item>
      <ph-collapse v-model="activeCollapse">
        <ph-collapse-item name="contact">
          <span slot="title" class="flex items-center">
            <span class="sidebar-icon">
              <i class="fas fa-reply"></i>
            </span>
            <span class="sidebar-text">Contact</span>
          </span>
          <ph-sidebar-item>
            <a href="mailto:562818991@qq.com">
              <span class="sidebar-icon">
                <i class="far fa-envelope"></i>
              </span>
              <span class="sidebar-text">Email Me</span>
            </a>
          </ph-sidebar-item>
        </ph-collapse-item>
      </ph-collapse>
    </ph-sidebar-list>
  </ph-sidebar>
</template>

<script>
import { imgPaths } from '../config'
import articleDatabase from '../database/article'

const imgs = {
  header: imgPaths.sidebar,
  avatar: imgPaths.avatar,
}

export default {
  name: 'Sidebar',

  data() {
    return {
      imgs,
      activeCollapse: '',
      stat: articleDatabase.getDatabaseStat(),
      pages: [
        {
          name: '主页',
          prefix: '<i class="fas fa-home"></i>',
          path: '/',
        },
        {
          name: '库',
          prefix: '<i class="fas fa-rocket"></i>',
          path: '/repository',
        },
        {
          name: '文章',
          prefix: '<i class="fas fa-newspaper"></i>',
          path: '/article',
        },
      ],
    }
  },

  methods: {
    handleClick() {
      this.activeCollapse = ''
    },

    dateFormat(year, month) {
      return `${month < 10 ? '0' + month : month}月 ${year}`
    },

    handleArchiveClick(year, month) {
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

<style lang="scss" scoped>
$avatar-width: 3.2rem;

#main-nav {
  a {
    color: rgba(#000, .7);

    &:hover {
      color: rgba(#000, .7);
    }
  }
}

.sidebar-header {
  height: 10rem;
  position: relative;
  margin-bottom: .5rem;

  & > img {
    min-width: 100%;
    height: 100%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .sidebar-header-avatar {
    position: absolute;
    width: $avatar-width;
    height: $avatar-width;
    top: 1.3rem;
    right: 2rem;

    img {
      height: $avatar-width;
    }
  }
}

.stat-meta {
  font-size: 14px;
  line-height: 24px;
  position: relative;

  .stat-count {
    position: absolute;
    right: 1.5rem;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: $color-first;
    color: #fff;
    font-size: 10px;
    text-shadow: 1px 1px 3px #444;
  }
}

.sidebar-icon {
  width: 30px;
  margin-right: 1rem;
  font-size: 1rem;
}

.sidebar-text {
  font-size: .9rem;
}

.sidebar-link-active {
  background-color: #f3f4f5;

  &:after {
    content: "";
    border-radius: 50%;
    border: 3px solid #bbb;
    position: absolute;
    right: 2.1rem;
  }
}
</style>
