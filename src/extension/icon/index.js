import Vue from 'vue'
import PhArrowIcon from './src/arrow'
import PhMenuIcon from './src/menu'

export default {
  install() {
    Vue.component(PhArrowIcon.name, PhArrowIcon)
    Vue.component(PhMenuIcon.name, PhMenuIcon)
  },
}
