<script>
import PhTabBar from './tab_bar'

export default {
  name: 'PhTabNav',

  data() {
    return {
      activeIndex: 0,
    }
  },

  props: {
    panes: Array,
    onTabClick: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    handleClick(pane, tabName, ev) {
      this.activeIndex = +pane.index
      this.onTabClick(pane, tabName, ev)
    },
    handleResize(ev) {
      console.log(this.$el.offsetW)
      this.$refs['tab-bar'].update()
    },
  },

  components: {
    PhTabBar,
  },

  /* eslint indent: 0 */
  render(h) {
    let {
      activeIndex,
      handleClick,
      handleResize,
      panes,
    } = this

    const tabs = panes.map((pane, index) => {
      pane.index = `${index}`

      let tabName = pane.name || pane.index || index
      const tabLabelContent = pane.$slots.label || pane.label
      return (
        <div
          class={{
            'ph-tabs__item': true,
            'ph-tab-item-actived': pane.isActived,
          }}
          aria-controls={ `pane-${tabName}` }
          role="tab"
          aria-selected={ pane.isActived }
          on-click={ (ev) => {
            handleClick(pane, tabName, ev)
          } }
        >
          { tabLabelContent }
        </div>
      )
    })

    const bar = (
      <ph-tab-bar
        activeIndex={ activeIndex }
        tabs={ panes }
      ></ph-tab-bar>
    )

    return (
      <div
        on-resize={ handleResize }
      >
        <div class="ph-tabs__nav">
          { tabs }
        </div>
        { bar }
      </div>
    )
  },
}
</script>

<style lang="scss">
.ph-tabs__nav {
  display: flex;
  justify-content: space-around;
}

.ph-tabs__item {
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: .5rem 0;

  &:hover {
    color: #52aac1;
  }
}

.ph-tab-item-actived {
  color: #52aac1;
}
</style>
