<template>
<div id="main-nav">
  <div class="ph-container">
    <ph-nav dropdownHiddenUp="sm">
      <ph-nav-list hiddenUp="sm">
        <ph-nav-item>
          <span
            class="f4 flex pointer"
            @click="showDropdown = !showDropdown"
          ><i class="fas fa-bars"></i></span>
        </ph-nav-item>
      </ph-nav-list>

      <a class="ph-navbar-brand" href="/">
        <img :src="logo" height="35px" style="margin-top: -10px">
      </a>

      <ph-nav-list hiddenDown="sm" align="left" class="ml5 mt2">
        <ph-nav-item
          v-for="(page, index) in pages"
          :key="index"
        >
          <router-link
            class="ph-nav-link f2"
            exact-active-class="nav-router-active"
            :to="page.path"
          >
            <span v-html="page.prefix" class="v-align-none"></span>
            <span class="ml1">{{ page.name }}</span>
          </router-link>
        </ph-nav-item>
      </ph-nav-list>

      <ph-nav-list>
        <ph-nav-item hiddenDown="sm">
          <el-dropdown class="v-middle f3 mr3">
            <span class="el-dropdown-link">
              Contact<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a class="link" href="https://github.com/phoeninee" target="_blank">
                  <i class="fab fa-github"></i>
                  &nbsp;Github
                </a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="mailto:562818991@qq.com">
                  <i class="fas fa-envelope"></i>
                </a>
                &nbsp;Email
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </ph-nav-item>
        <ph-nav-item>
          <el-tooltip content="登陆" placement="left">
            <router-link id="login" to="/login" class="gray6 f4 ma1">
              <i class="fas fa-sign-in-alt"></i>
            </router-link>
          </el-tooltip>
        </ph-nav-item>
      </ph-nav-list>
    </ph-nav>
  </div>
  <el-collapse-transition>
    <div v-show="showDropdown" class="main-nav-dropdown">
      <div
        v-for="(page, index) in pages"
        :key="index"
        @click="showDropdown = false"
      >
        <router-link
          class="nav-link"
          :to="page.path"
          exact-active-class="subnav-router-active"
        >
          <span v-html="page.prefix"></span>
          <span class="ml1">{{ page.name }}</span>
        </router-link>
      </div>
      <div @click="showDropdown = false">
        <a href="https://github.com/phoeninee" class="nav-link" target="_blank">
          <i class="fab fa-github"></i>
          <span class="ml1">Github</span>
        </a>
      </div>
    </div>
  </el-collapse-transition>
</div>
</template>

<script>
export default {
  name: 'Nav',

  data: function () {
    return {
      showDropdown: false,
      logo: '/static/img/logo.png',
      pages: [
        {
          name: '主页',
          prefix: '<i class="fas fa-home"></i>',
          path: '/',
        },
        {
          name: '项目',
          prefix: '<i class="fas fa-terminal"></i>',
          path: '/project',
        },
        {
          name: '文章',
          prefix: '<i class="fas fa-newspaper"></i>',
          path: '/article',
        },
      ],
    }
  }
}
</script>

<style lang="scss">
#main-nav {
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 10px 1px $color-divider;
  text-align: center;
}

#login {
  &:hover {
    color: $color-first;
  }
}

.main-nav-dropdown {
  text-align: left;
  font-size: .8rem;
  background-color: #fff;
}

.nav-link {
  display: block;
  border-left: 3px solid transparent;
  color: #868e96;
  padding: .5rem 1rem;

  &:hover {
    text-decoration-line: none;
    color: $color-first;
    background-color: #fafbfc;
  }
}

.nav-router-active {
  border-bottom-color: $color-first !important;
}

.subnav-router-active {
  background-color: #fafbfc;
  border-left-color: $color-first;
}
</style>
