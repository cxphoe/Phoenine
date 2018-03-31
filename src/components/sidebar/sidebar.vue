<template>
  <ph-sidebar
    id="main-nav"
    class="slim-scrollbar"
    zBaseIndex="10"
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
          class="link relative"
          exact-active-class="sidebar-link-active"
          :to="page.path"
        >
          <span class="sidebar-icon" v-html="page.prefix"></span>
          <span class="sidebar-text" v-text="page.name"></span>
        </router-link>
      </ph-sidebar-item>
    </ph-sidebar-list>

    <ph-sidebar-divider/>

    <SidebarStat :activeCollapse.sync="activeCollapse"/>

    <ph-sidebar-divider/>

    <ph-sidebar-list>
      <ph-sidebar-item>
        <router-link
          class="link relative"
          exact-active-class="sidebar-link-active"
          to="/about"
        >
          <span class="sidebar-icon">
            <i class="far fa-id-card"></i>
          </span>
          <span class="sidebar-text">关于我</span>
        </router-link>
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

    <ph-sidebar-divider/>

    <ph-sidebar-item>
      <router-link
        class="link relative"
        exact-active-class="sidebar-link-active"
        to="/editor"
      >
        <span class="sidebar-icon">
          <i class="far fa-edit"></i>
        </span>
        <span class="sidebar-text">编辑器</span>
      </router-link>
    </ph-sidebar-item>

  </ph-sidebar>
</template>

<script>
import SidebarStat from './sidebar_stat'

export default {
  name: 'Sidebar',

  data() {
    return {
      activeCollapse: '',
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

  computed: {
    imgs() {
      let config = this.getGlobalConfig()
      let imgPaths = config.imgPaths

      return {
        header: imgPaths.sidebar,
        avatar: imgPaths.avatar,
      }
    },
  },

  methods: {
    handleClick() {
      this.activeCollapse = ''
    },
  },

  components: {
    SidebarStat,
  },
}
</script>

<style lang="scss">
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
    top: 2rem;
    left: 1rem;
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
    right: 33px;
  }
}
</style>
