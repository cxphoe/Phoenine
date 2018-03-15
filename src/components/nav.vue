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
                  :to="page.path" v-text="page.name"
                ></router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </ph-nav-item>
      </ph-nav-list>

      <a class="ph-navbar-brand" href="/">
        <img :src="logo" height="35px" style="margin-top: -10px">
      </a>

      <ph-nav-list hiddenDown="sm" align="left" class="ml5 mt1">
        <ph-nav-item>
          <el-menu class="bn" mode="horizontal" router>
            <el-menu-item class="f3" index="1-1" route="/project">
              项目
            </el-menu-item>
            <el-menu-item class="f3" index="1-2" route="/article">
              文章
            </el-menu-item>
          </el-menu>
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
            <a id="login" href="#" class="gray6 f4 ma1">
              <i class="fas fa-sign-in-alt"></i>
            </a>
          </el-tooltip>
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

#login {
  &:hover {
    color: $color-first;
  }
}
</style>
