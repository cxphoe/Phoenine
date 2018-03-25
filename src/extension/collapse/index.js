import Vue from 'vue'
import PhCollapse from './src/collapse'
import PhCollapseItem from './src/collapse_item'

export default {
  install() {
    Vue.component(PhCollapse.name, PhCollapse)
    Vue.component(PhCollapseItem.name, PhCollapseItem)
  }
}
