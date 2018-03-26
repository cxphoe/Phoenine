import Vue from 'vue'
import PhSidebar from './src/sidebar'
import PhSidebarDivider from './src/sidebar_divider'
import PhSidebarIcon from './src/sidebar_icon'
import PhSidebarItem from './src/sidebar_item'
import PhSidebarList from './src/sidebar_list'

export default {
  install() {
    Vue.component(PhSidebar.name, PhSidebar)
    Vue.component(PhSidebarDivider.name, PhSidebarDivider)
    Vue.component(PhSidebarIcon.name, PhSidebarIcon)
    Vue.component(PhSidebarItem.name, PhSidebarItem)
    Vue.component(PhSidebarList.name, PhSidebarList)
  }
}
