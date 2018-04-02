<template>
  <transition name="fade-slide-d">
    <div class="mb3">
      <ph-card class="m-auto repo-card" :bodyStyle="bodyStyle">
        <div class="flex" slot="header">
          <img
            class="repo-logo-img"
            crossorigin="anonymous"
            :src="logoSrc"
          >
          <div class="ml3">
            <div
              class="f3 fw6 gray7 ofx-hidden relative repo-name"
            >{{ name }}</div>
            <ph-tag
              class="repo-lang"
              :content="lang"
              plain
              round
            ></ph-tag>
          </div>
        </div>
        <div class="tc">
          <el-row type=flex class="repo-git-info">
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
            <div class="repo-card-info mb2">
              <p class="gray5">{{ description }}</p>
            </div>
            <a :href="url" class="repo-link f2 fw6" target="_blank">
              <i class="fas fa-info-circle"></i>
              Visit
            </a>
            <a v-if="homePage" :href="homePage" target="_blank" class="f2 fw6 repo-link">
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

  computed: {
    defaultImg() {
      let config = this.getGlobalConfig()
      return config.imgPaths.default
    },

    customizedLogo() {
      let config = this.getGlobalConfig()
      return config.repoLogos[this.name]
    },

    logoSrc() {
      return this.customizedLogo || this.defaultImg
    },
  },

  methods: {
    handleError(ev) {
      ev.target.src = this.defaultImg
    },
  },
}
</script>

<style lang="scss" scoped>
.repo-card {
  width: 16rem;
}

.repo-logo {
  height: 50px;
  width: 50px;
}

.repo-logo-img {
  height: 50px;
}

.repo-name {
  width: 155px;

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

.repo-lang {
  font-size: 12px;
  color: $color-gray5;
  border-color: $color-gray5;
  padding: .05rem .3rem;
  margin: 0;
  line-height: 1;
}

.repo-git-info {
  height: 40px;
  background-color: $color-light;
  font-family: $font-display;
}

.repo-card-info {
  height: 45px;
  font-size: .9rem;
  overflow: hidden;
}

.repo-link {
  color: $color-first;
  border-radius: 15px;
  box-shadow: 0 0 1px 1px $color-first;
  margin: 5px;
  padding: 8px 15px;

  &:hover {
    text-decoration: none;
    color: #fff;
    background-color: $color-first;
    transition: .3s;
  }
}
</style>
