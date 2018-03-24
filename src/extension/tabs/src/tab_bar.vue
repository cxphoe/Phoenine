<template>
  <div
    class="ph-tab-bar"
    res="tab-bar"
    :style="styleObj"
  ></div>
</template>

<script>
export default {
  name: 'PhTabBar',

  data() {
    return {
      parentSize: 0,
    }
  },

  props: {
    tabs: Array,
    activeIndex: Number,
  },

  computed: {
    styleObj() {
      if (!this.tabs) {
        return {}
      }
      const barDefaultWidth = 30

      let style = {}
      let tabAmount = this.tabs.length
      let tabSize = this.parentSize / tabAmount
      let offset = (tabSize * this.activeIndex)
        + (tabSize - barDefaultWidth) / 2
      style.left = `${offset}px`
      style.width = `${barDefaultWidth}px`
      return style
    },
  },

  methods: {
    update() {
      let parent = this.$parent.$el
      this.parentSize = parent.offsetWidth
    },
  },

  mounted() {
    this.update()

    window.onresize = ev => {
      this.update()
    }
  },
}
</script>

<style>
.ph-tab-bar {
  position: relative;
  transition: all .3s;
  border-top: 2px solid #52aac1;
  height: 0;
  width: 0;
}
</style>
