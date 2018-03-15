<script>
import navMixin from './nav_mixin'

export default {
  name: 'PhNavItem',

  mixins: [navMixin],

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
      class: [...this.hiddenClass],
      style,
    }, this.$slots.default)
  }
}
</script>
