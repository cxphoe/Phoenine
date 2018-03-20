<template>
  <ph-card class="tc" :bodyStyle="bodyStyle" :headerStyle="headerStyle">
    <div class="relative project-header" slot="header">
      <!-- onerror 防止图片加载错误 -->
      <img
        class="project-logo-img" :src="logo"
        onerror="onerror=null;src='static/img/default.png'">
      <span class="project-name f4">{{ name }}</span>
      <span class="project-lang">
        <i class="fas fa-code"></i>
        {{ lang }}
      </span>
      <img class="w-100" :src="bgImg">
    </div>
    <div>
      <el-row type=flex class="project-git-info">
        <el-col
          class="mv-auto"
          v-for="(value, key) in gitInfo"
          :key=key :span="8">
          <el-tooltip
            effect="dark"
            placement="top"
            :content=value.tooltip>
            <el-button type="text" :class="value.contentClass">
              <a v-if="value.url" :href="value.url" target="_blank">
                <i :class="value.svgClass"></i>
              </a>
              <i v-else :class="value.svgClass"></i>
              {{ value.count }}
            </el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <div class="pa3">
        <div class="project-card-info">
          <p class="gray5">{{ description }}</p>
        </div>
        <a :href="'\\project\\' + name" class="project-link">
          <i class="fas fa-info-circle"></i>
          详情
        </a>
        <a v-if="homePage" :href="homePage" target="_blank" class="project-link">
          <i class="fas fa-eye"></i>
          Demo
        </a>
      </div>
    </div>
  </ph-card>
</template>

<script>
export default {
  name: 'ProjectCompleteCard',

  data() {
    return {
      bgImg: '/static/img/logo_base.png',
      bodyStyle: {
        padding: 0,
      },
      headerStyle: {
        padding: 0,
      },
      gitInfo: {
        stars: {
          count: this.stars,
          tooltip: 'Github stars',
          svgClass: 'fas fa-star',
          contentClass: 'gray5',
        },
        gitUrl: {
          url: this.url,
          tooltip: 'Github源地址',
          svgClass: 'fab fa-github',
          contentClass: 'f5 gray7',
        },
        forks: {
          count: this.forks,
          tooltip: 'Github forks',
          svgClass: 'fas fa-code-branch',
          contentClass: 'gray5',
        },
      },
    }
  },

  props: {
    logo: {
      type: String,
      required: false,
      default: 'static/img/default.png',
    },
    name: {
      type: String,
      default: '--',
    },
    lang: {
      type: String,
      default: '--',
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '...',
    },
    homePage: String,
    url: String,
  },
}
</script>

<style lang="scss" scoped>
.project-logo-img {
  position: absolute;
  width: 20%;
  left: 40%;
  top: 25px;
}

.project-header span {
  width: 100%;
  font-family: $font-display;
  position: absolute;
}

.project-card-info {
  height: 80px;
}

.project-name {
  color: #fff;
  top: 94px;
}

.project-lang {
  font-size: 14px;
  color: $color-third;
  top: 135px;

  svg {
    font-size: 10px;
  }
}

.project-git-info {
  height: 50px;
  background-color: $color-light;
  font-family: $font-display;

  a {
    color: inherit;
  }
}

.project-link {
  font-size: 0.8em;
  font-weight: 600;
  color: $color-first;
  border-radius: 15px;
  box-shadow: 0 0 1px 1px $color-first;
  margin: 5px;
  padding: 8px 15px;

  &:hover {
    text-decoration: none;
    color: #fff;
    background-color: $color-first;
    transition: 300ms;
  }
}
</style>
