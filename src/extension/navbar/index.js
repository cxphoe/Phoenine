import Vue from 'vue'
import PhNav from './src/nav'
import PhNavList from './src/nav_list'
import PhNavItem from './src/nav_item'

export default {
  install() {
    Vue.component(PhNav.name, PhNav)
    Vue.component(PhNavList.name, PhNavList)
    Vue.component(PhNavItem.name, PhNavItem)
  }
}
