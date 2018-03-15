<template>
  <div class="bg-gray0">
    <div class="ph-container">
      <nav class="ph-navbar">
        <p class="mr-auto gray7 f4 fw6 mv2">
          <slot name="header"></slot>
        </p>
        <a :href="link" class="link white bg-gray7
          fw6 br5 pv2 ph3 f2 hover-white hover-scale">
          <span>查看更多</span>
          <i class="fas fa-angle-double-right"></i>
        </a>
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
}
</script>
