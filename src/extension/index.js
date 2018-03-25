import PhCard from './card'
import PhCheckbox from './checkbox'
import PhCollapse from './collapse'
import PhIcon from './icon'
import PhNav from './navbar'
import PhSidebar from './sidebar'
import PhTabs from './tabs'
import PhTag from './tag'

const eltList = [
  PhCard,
  PhCheckbox,
  PhCollapse,
  PhIcon,
  PhNav,
  PhSidebar,
  PhTabs,
  PhTag,
]

export default {
  install() {
    eltList.forEach(elt => {
      elt.install()
    })
  }
}
