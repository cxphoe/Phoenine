<template>
  <transition name="fade-slide-d">
    <div class="repository">
      <ph-card :bodyStyle="bodyStyle">
        <div class="repository-header" slot="header">
          <!-- onerror 防止图片加载错误 -->
          <img
            class="repository-logo-img" :src="logo"
            @error.stop="handleError"
          >
          <div class="ml3">
            <div
              class="f3 fw6 gray7 repository-name"
            >{{ name }}</div>
            <ph-tag
              class="repository-lang"
              :content="lang"
              plain
              round
            ></ph-tag>
          </div>
        </div>
        <div class="tc">
          <el-row type=flex class="repository-git-info">
            <el-col
              class="mv-auto"
              v-for="(value, key) in gitInfo"
              :key=key :span="12">
              <el-tooltip
                placement="top"
                :content=value.tooltip
              >
                <el-button type="text" :class="value.contentClass">
                  <i :class="value.svgClass"></i>
                  {{ value.count }}
                </el-button>
              </el-tooltip>
            </el-col>
          </el-row>
          <div class="pa3">
            <div class="repository-card-info">
              <p class="gray5">{{ description }}</p>
            </div>
            <a :href="url" class="repository-link" target="_blank">
              <i class="fas fa-info-circle"></i>
              Visit
            </a>
            <a v-if="homePage" :href="homePage" target="_blank" class="repository-link">
              <i class="fas fa-eye"></i>
              Demo
            </a>
          </div>
        </div>
      </ph-card>
    </div>
  </transition>
</template>

<script>
import config from '../../config'

let imgPaths = config.imgPaths
const imgs = {
  default: imgPaths.default,
}

export default {
  name: 'RepositoryCard',

  data() {
    return {
      bodyStyle: {
        padding: 0,
      },
      gitInfo: {
        stars: {
          count: this.stars,
          tooltip: 'Github stars',
          svgClass: 'fas fa-star',
          contentClass: 'gray5',
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
      default: imgs.default,
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

  methods: {
    handleError(ev) {
      ev.target.src = imgs.default
    },
  },
}
</script>

<style lang="scss" scoped>
.repository {
  margin-bottom:20px;
  align-items: center;

  .ph-card {
    width: 16rem;
    margin: auto;
    border-color: transparent;

    &:hover {
      transition: 300ms;
      box-shadow: 0 10px 20px 2px #cccccc;
    }
  }
}

.repository-logo-img {
  height: 50px;
}

.repository-header {
  display: flex;

  span {
    width: 100%;
  }
}

.repository-name {
  color: $color-gray7;
  width: 155px;
  overflow-x: hidden;
  position: relative;

  &:after {
    content: "";
    display: block;
    top: 0;
    right: 0;
    height: 100%;
    position: absolute;
    box-shadow: 0 0 50px 30px #fff;
  }
}

.repository-lang {
  font-size: 12px;
  color: $color-gray5;
  border-color: $color-gray5;
  padding: .05rem .3rem;
  margin: 0;
  line-height: 1;

  svg {
    font-size: 10px;
  }
}

.repository-git-info {
  height: 40px;
  background-color: $color-light;
  font-family: $font-display;

  a {
    color: inherit;
  }
}

.repository-card-info {
  height: 45px;
  font-size: .9rem;
  overflow: hidden;
  margin-bottom: .5rem;
}

.repository-link {
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
