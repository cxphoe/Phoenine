<template>
  <div
    v-show="isActived"
    class="ph-tab-pane"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PhTabPane',

  data() {
    return {
      index: null,
    }
  },

  props: {
    label: String,
    name: String,
  },

  computed: {
    isActived() {
      return this.$parent.currentName === this.paneName
    },
    paneName() {
      return this.name || this.index
    },
  },

  mounted() {
    this.$parent.addPane(this)
  },
}
</script>

<style lang="scss">

</style>
