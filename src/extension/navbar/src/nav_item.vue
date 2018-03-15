<script>
export default {
  name: 'PhNavItem',

  props: {
    // margin-left
    left: Number,
    // margin-right
    right: Number,
  },

  render(h) {
    let style = {}
    let marginProps = ['left', 'right']

    marginProps.forEach(prop => {
      if (this[prop]) {
        style['margin-' + prop] = this[prop] + 'px'
      }
    })

    return h('li', {
      style,
    }, this.$slots.default)
  }
}
</script>
