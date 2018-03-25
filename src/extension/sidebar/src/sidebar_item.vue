<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'PhSidebarItem',

  componentName: 'PhSidebarItem',

  mixins: [Emitter],

  methods: {
    handleClick(ev) {
      this.$emit('click', ev)
      this.dispatch('PhSidebar', '__item-click')
    }
  },

  /* eslint indent: 0 */
  render(h) {
    let {
      handleClick,
    } = this

    const containTextNode = this.$slots.default.some(node => {
      return node.text !== undefined
    })

    return (
      <li
        class={[
          'ph-sidebar-item',
          containTextNode ? 'wrap-text' : 'fill-child',
        ]}
        on-click={ handleClick }
      >
        { this.$slots.default }
      </li>
    )
  },
}
</script>

<style lang="scss">
.ph-sidebar-item {
  cursor: pointer;
  user-select: none;
  list-style-type: none;
  margin: 0;
  color: rgba(#000, .6);
  transition: all .3s;

  &:hover {
    color: rgba(#000, .6);
    background-color: #f1f2f3;
  }
}

.ph-sidebar-item.wrap-text {
  padding: .6rem 2rem;
}

.ph-sidebar-item.fill-child {
  & > * {
    padding: .6rem 2rem;
    display: flex;
    align-items: center;
  }
}
</style>
