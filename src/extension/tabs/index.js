import Vue from 'vue'
import PhTabs from './src/tabs'
import PhTabPane from './src/tab_pane'

export default {
  install() {
    Vue.component(PhTabs.name, PhTabs)
    Vue.component(PhTabPane.name, PhTabPane)
  }
}
