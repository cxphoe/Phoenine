<template>
  <ul class="ph-sidebar-list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'PhSidebarList',

  componentName: 'PhSidebarList',
}
</script>

<style lang="scss">
.ph-sidebar-list {
  margin: 0;
  padding: 0;
}
</style>
