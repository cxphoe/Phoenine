<template>
  <ph-card :headerStyle="headerStyle">
    <div class="project-header" slot="header">
      <!-- onerror 防止图片加载错误 -->
      <img
        class="project-logo-img" :src="logo"
        onerror="onerror=null;src='static/img/default.png'">
      <div class="ml3">
        <div class="f3 fw6">{{ name }}</div>
        <div class="f1 gray5 project-info">
          <span>
            <i class="fas fa-code"></i>
            <span>{{ lang }}</span>
          </span>
          <span>
            <el-tooltip
              effect="dark"
              placement="top"
              content="Github stars"
            >
              <span>
                <i class="fas fa-star"></i>
                <span>{{ stars }}</span>
              </span>
            </el-tooltip>
          </span>
          <span>
            <el-tooltip
              effect="dark"
              placement="top"
              content="Github forks"
            >
              <span>
                <i class="fas fa-code-branch"></i>
                <span>{{ forks }}</span>
              </span>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
    <div>
      <div class="project-card-info">
        <p class="gray5">{{ description }}</p>
      </div>
      <div class="flex">
        <a :href="'\\project\\' + name" class="project-link ml-auto block">
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
  name: 'ProjectSimpleCard',

  data: function () {
    return {
      headerStyle: {
        'background-color': '#fafbfc',
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
.project-header {
  display: flex;
  align-items: center;
  font-family: $font-display;
}

.project-logo-img {
  height: 40px;
}

.project-card-info {
  height: 60px;
  font-size: .9rem;
}

.project-info > span {
  margin: 0;
  & + span {
    padding-left: .25rem;
    border-left: 1px solid #ccc;
  }
}

.project-link {
  font-size: 0.7em;
  font-weight: 600;
  color: $color-first;
  border-radius: 15px;
  box-shadow: 0 0 1px 1px $color-first;
  padding: 5px 10px;

  &:hover {
    text-decoration: none;
    color: #fff;
    background-color: $color-first;
    transition: 300ms;
  }

  & + .project-link {
    margin-left: .5rem;
  }
}
</style>
