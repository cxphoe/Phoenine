<script>
import PhTabNav from './tab_nav'

export default {
  name: 'PhTabs',

  data() {
    return {
      currentName: this.value || this.activeName,
      panes: [],
    }
  },

  props: {
    value: {},
    activeName: String,
  },

  methods: {
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) {
        return
      }
      this.setCurrentName(tabName)
      this.$emit('tab-click', tab, event)
    },
    setCurrentName(value) {
      this.currentName = value
      this.$emit('input', value)
    },
    addPane(pane) {
      this.panes.push(pane)
    },
  },

  components: {
    PhTabNav,
  },

  /* eslint indent: 0 */
  render(h) {
    let {
      currentName,
      handleTabClick,
      panes,
    } = this

    const navData = {
      props: {
        currentName,
        onTabClick: handleTabClick,
        panes,
      },
      ref: 'nav',
    }

    const header = (
      <div class="ph-tabs__header">
        <ph-tab-nav { ...navData }></ph-tab-nav>
      </div>
    )

    const panels = (
      <div class="ph-tabs__content">
        { this.$slots.default }
      </div>
    )

    return (
      <div class={{
        'el-tabs': true,
      }}>
        { [ header, panels ] }
      </div>
    )
  },
}
</script>

<style lang="scss">
.ph-tabs__header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}
</style>
