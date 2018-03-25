<template>
  <ph-sidebar
    id="main-nav"
    class="slim-scrollbar"
    @aside-click="handleClick"
    @item-click="handleClick"
    cover
  >
    <div class="sidebar-header">
      <img src="/static/img/bg1.jpg">
      <div class="sidebar-header-avatar">
        <img src="/static/img/avatar.jpg">
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
        <div>1 asdf</div>
        <div>2</div>
        <div>3</div>
      </ph-collapse-item>
      <ph-collapse-item name="tags">
        <span slot="title" class="flex items-center">
          <span class="sidebar-icon">
            <i class="fas fa-tags"></i>
          </span>
          <span class="sidebar-text">标签</span>
        </span>
        <ph-sidebar-item>1 asdf</ph-sidebar-item>
        <ph-sidebar-item>2</ph-sidebar-item>
        <ph-sidebar-item>3</ph-sidebar-item>
      </ph-collapse-item>
      <ph-collapse-item name="category">
        <span slot="title" class="flex items-center">
          <span class="sidebar-icon">
            <i class="fas fa-th"></i>
          </span>
          <span class="sidebar-text">分类</span>
        </span>
        <ph-sidebar-item>1 asdf</ph-sidebar-item>
        <ph-sidebar-item>2</ph-sidebar-item>
        <ph-sidebar-item>3</ph-sidebar-item>
        <ph-sidebar-item>3</ph-sidebar-item>
        <ph-sidebar-item>3</ph-sidebar-item>
        <ph-sidebar-item>3</ph-sidebar-item>
        <ph-sidebar-item>3</ph-sidebar-item>
        <ph-sidebar-item>3</ph-sidebar-item>
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
          name: '项目',
          prefix: '<i class="fas fa-rocket"></i>',
          path: '/project',
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
    border-radius: 50%;
    width: $avatar-width;
    height: $avatar-width;
    overflow: hidden;
    top: 1.3rem;
    right: 2rem;

    img {
      position: relative;
      height: $avatar-width;
      left: 50%;
      transform: translateX(-50%);
    }
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
