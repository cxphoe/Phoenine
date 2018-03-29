<script>
import { getHeaderTrees } from '../../utils/catalogue'
import PhCatalogueList from './catalogue_list'

export default {
  name: 'PhCatalogue',

  componentName: 'PhCatalogue',

  props: {
    indent: {
      type: [Number, String],
      default: 18,
    },
    defaultTitle: {
      type: String,
      default: '--',
    },
    closable: Boolean,
  },

  methods: {
    getHeaders() {
      let defaultSlot = this.$slots.default
      let headers = defaultSlot.filter(node => {
        return node.tag && node.tag.indexOf('PhCatalogueItem') > -1
      }).map(node => {
        let level = node.componentOptions.propsData.level
        level = +level
        if (typeof level !== 'number') {
          level = 1
        }

        return {
          level,
          node,
        }
      })
      return headers
    },
  },

  components: {
    PhCatalogueList,
  },

  /* eslint indent: 0 */
  render(h) {
    let {
      indent,
      defaultTitle,
      closable,
      getHeaders,
    } = this

    indent = +indent
    if (typeof indent !== 'number') {
      indent = 18
    }

    let headers = getHeaders()
    if (!headers || headers.length === 0) {
      return (
        <div
          class="ph-catalogue"
          style="color: red"
        >error: headers not found</div>
      )
    }

    let trees = getHeaderTrees(headers, {
      level: 1,
      node: <span>{ defaultTitle }</span>,
    })
    let lists = trees.map(tree => {
      return (
        <ph-catalogue-list
          tree={ tree }
          indent={ indent }
          closable={ closable }
        ></ph-catalogue-list>
      )
    })

    return (
      <div class="ph-catalogue">
        { lists }
      </div>
    )
  },
}
</script>

<style lang="scss">
.ph-catalogue {
  padding: 1.5rem 2rem;

  & > ul {
    list-style-type: none;
    padding: 0;
    margin: 0.35rem 0;
  }

  li {
    display: flex;
    align-items: center;
    position: relative;
  }
}
</style>
