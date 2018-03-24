<template>
  <div class="intro-tmpl">
    <div class="ph-container">
      <nav class="ph-navbar">
        <p class="mr-auto gray7 f4 fw6 mv3">
          <slot name="header"></slot>
        </p>
        <button
          class="intro-btn"
          @click="handleClick(link)">
          <span class="mr2">更多</span>
          <i class="fas fa-angle-double-right"></i>
        </button>
      </nav>
    </div>
    <div v-if="isMobile" class="flex of-auto ph5 pv2">
      <slot name="mobile"></slot>
    </div>
    <div v-else class="ph-container">
      <el-row :gutter="20">
        <slot></slot>
      </el-row>
    </div>
  </div>
</template>

<script>
import { isMobile } from '../../util'

export default {
  name: 'IntroTemplate',

  data() {
    return {
      isMobile: isMobile(),
    }
  },

  props: {
    link: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleClick(url) {
      this.$router.push(url)
    }
  },
}
</script>

<style lang="scss" scoped>
.intro-btn {
  border: none;
  @include ph-btn2($init-width: 35%, $end-width: 50%);
}

.intro-tmpl {
  background-color: #fafbfc;
  position: relative;

  & + & {
    &:before {
      position: absolute;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: .25rem solid #e9ecef;
      content: '';
    }
  }
}
</style>
