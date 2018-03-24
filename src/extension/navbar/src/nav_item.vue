<template>
  <li
    class="ph-nav-item"
    :class="[
      { 'ph-nav-item-active': active },
      ...hiddenClass,
    ]"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script>
import navMixin from './nav_mixin'

export default {
  name: 'PhNavItem',

  componentName: 'PhNavItem',

  mixins: [navMixin],

  data() {
    return {
      active: false,
    }
  },

  methods: {
    handleClick() {
      this.$parent.forceCancel(this)
      this.active = true
    },
    forceCancel() {
      this.active = false
    },
  },
}
</script>

<style lang="scss" scoped>
.ph-nav-item {
  display: flex;
  justify-content: space-around;
  align-items: center;

  & + & {
    margin-left: 10px;
  }
}
</style>
