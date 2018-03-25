<template>
  <div
    class="ph-collapse"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PhCollapse',

  componentName: 'PhCollapse',

  data() {
    return {
      selfModel: this.accordion ? '' : [],
    }
  },

  props: {
    value: [String, Array, Number],
    accordion: Boolean,
  },

  computed: {
    model: {
      get() {
        return this.value === undefined
          ? this.selfModel
          : this.value
      },

      set(name) {
        let m = this.model
        let model = null
        if (Array.isArray(m)) {
          model = [...m]
          let i = model.indexOf(name)
          i >= 0 ? model.splice(i, 1) : model.push(name)
          this.selfModel = model
        } else {
          model = name === this.model ? '' : name
          this.selfModel = this.selfModel === model
            ? ''
            : model
        }
        this.$emit('input', model)
      },
    },
  },

  methods: {
    hasItem(item) {
      let m = this.model
      let name = item.itemName
      return Array.isArray(m)
        ? m.includes(name)
        : m === name
    },

    handleItemClick(item) {
      this.model = item.itemName
    },
  },

  created() {
    this.$on('item-click', this.handleItemClick)
  },

  mounted() {
    let index = 0
    for (let c of this.$children) {
      if (c.$options.componentName === 'PhCollapseItem') {
        c.index = index++
      }
    }
  },
}
</script>

<style>

</style>
