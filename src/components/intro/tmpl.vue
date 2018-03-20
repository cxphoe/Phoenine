<template>
  <div class="bg-gray0">
    <div class="ph-container">
      <nav class="ph-navbar">
        <p class="mr-auto gray7 f4 fw6 mv3">
          <slot name="header"></slot>
        </p>
        <el-button
          class="fw6 br2 pv2 ph2 f2"
          type="primary"
          @click="handleClick(link)">
          <span>查看更多</span>
          <i class="fas fa-angle-double-right"></i>
        </el-button>
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
