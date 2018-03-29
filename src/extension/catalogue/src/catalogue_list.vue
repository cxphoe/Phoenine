<script>
export default {
  name: 'PhCatalogueList',

  componentName: 'PhCatalogueList',

  data() {
    return {
      open: !this.closable,
    }
  },

  props: {
    tree: Object,
    indent: Number,
    baseLevel: Number,
    closable: Boolean,
  },

  methods: {
    handleClick() {
      this.open = !this.open
    },
  },

  /* eslint indent: 0 */
  render(h) {
    let {
      tree,
      indent,
      baseLevel,
      closable,
      handleClick,
    } = this

    let { data, children } = tree
    let { level, node } = data

    if (children.length === 0) {
      let levelDiff = level - baseLevel - 1
      return (
        <li class="ph-catalogue-item-wrap">
          <div
            class="ph-catalogue-indicator"
            style={{
              width: 8 + levelDiff * indent + 'px',
            }}
          ></div>
          { node }
        </li>
      )
    }

    let childLists = children.map(child => {
      let childLevel = child.data.level
      let childIndent = (childLevel - level) * indent
      return (
        <ph-catalogue-list
          tree={ child }
          indent={ indent }
          baseLevel={ level }
          style={{
            'padding-left': `${childIndent}px`,
          }}
        ></ph-catalogue-list>
      )
    })

    let icon = null
    if (closable) {
      icon = (
        <ph-arrow-icon
          class="ph-catalogue-icon"
          initStatus="right"
          activeStatus="down"
          active={ this.open }
          color="#52aac1"
          on-click={ handleClick }
        ></ph-arrow-icon>
      )
    }

    return (
      <ul class="ph-catalogue-list">
        <div
          class="ph-catalogue-indicator"
          style={{
            width: level > 1 ? '8px' : '',
            top: '12px',
          }}
        ></div>
        <li>
          { [icon, node] }
        </li>
        <ul
          class="ph-subcatalog"
          style={{
            display: this.open ? '' : 'none',
          }}
        >
          { childLists }
        </ul>
      </ul>
    )
  },
}
</script>

<style lang="scss">
.ph-catalogue-list {
  position: relative;
}

.ph-subcatalog {
  margin: 0.35rem 0;
  padding: 0;
  position: relative;

  ul {
    padding: 0;
  }

  &:before {
    content: "";
    height: calc(100% - .8rem);
    position: absolute;
    top: 0;
    border-left: 1px dashed #999;
  }
}

.ph-catalogue-icon {
  cursor: pointer;
  position: absolute;
  left: -1.25rem;
}

.ph-catalogue-indicator {
  border-top: 1px dashed #999;
  position: absolute;
  left: 0;
}

.ph-catalogue-item-wrap {
  padding: .1rem 0;
}
</style>
