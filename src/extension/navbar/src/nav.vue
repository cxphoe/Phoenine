<template>
  <nav class="ph-navbar">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'PhNav',

  data() {
    return {
      styleObj: {
        'border-bottom': this.type === 'card'
          ? '1px solid #ddd'
          : '',
      },
    }
  },

  porps: {
    type: String,
  },
}
</script>

<style lang="scss">
.ph-navbar {
  position: relative;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ph-navbar-brand {
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
  padding-top: .5rem;
  padding-bottom: .5rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}
</style>
