<template>
<div id="main-nav">
  <div class="ph-container">
    <ph-nav>
      <ph-nav-list hiddenUp="sm">
        <ph-nav-item>
          <el-dropdown>
            <el-button class="ph2 pv1 f4 gray6 bn">
              <i class="fas fa-bars"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(page, key) in pages"
                :key=key>
                <router-link
                  :to="page.path"
                  v-text="page.name"
                ></router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </ph-nav-item>
      </ph-nav-list>

      <ph-nav-list>
        <a class="ph-navbar-brand" href="/">
          <img :src="logo" height="30px">
        </a>
      </ph-nav-list>

      <ph-nav-list hiddenDown="sm" align="left" class="ml3 mt2">
        <ph-nav-item v-for="(page, key) in pages" :key=key>
          <router-link
            class="ph-nav-link"
            v-text="page.name"
            :to="page.path"
          ></router-link>
        </ph-nav-item>
      </ph-nav-list>

      <ph-nav-list hiddenDown="sm">
        <ph-nav-item>
          <el-dropdown class="v-middle">
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
          <a id="login" href="#" class="ph-nav-link">
            <i class="fas fa-sign-in-alt"></i> 登录
          </a>
        </ph-nav-item>
      </ph-nav-list>
    </ph-nav>
  </div>
</div>
</template>

<script>
export default {
  name: 'Nav',

  data: function () {
    return {
      logo: '/static/img/logo.png',
      pages: [
        {
          name: '主页',
          path: '/',
        },
        {
          name: '项目',
          path: '/project',
        },
        {
          name: '文章',
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

.el-dropdown {
  font-size: 1.1rem;
  margin-right: 20px;
}

#login {
  padding: 4px 12px;
  color: $color-first;
  border-bottom: 2px solid $color-first;
  box-shadow: 0 0 1px 1px $color-first;

  &:hover {
    background-color: $color-first;
    color: #fff;
    border-bottom-color: #fff;
  }
}
</style>
