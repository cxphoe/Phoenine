<template>
  <span class="ph-sidebar-icon" @click="handleClick">
    <slot></slot>
  </span>
</template>

<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'PhSidebarIcon',

  componentName: 'PhSidebarIcon',

  mixins: [Emitter],

  methods: {
    handleClick() {
      this.dispatch('PhSidebar', 'icon-click')
    },
  },
}
</script>

<style>
.ph-sidebar-icon {
  position: absolute;
  cursor: pointer;
}
</style>
