import PhButton from './button'
import PhCard from './card'
import PhCatalogue from './catalogue'
import PhCheckbox from './checkbox'
import PhCollapse from './collapse'
import PhIcon from './icon'
import PhNav from './navbar'
import PhSidebar from './sidebar'
import PhTabs from './tabs'
import PhTag from './tag'

const eltList = [
  PhButton,
  PhCard,
  PhCatalogue,
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
