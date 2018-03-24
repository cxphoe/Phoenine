import PhCard from './card'
import PhCheckbox from './checkbox'
import PhNav from './navbar'
import PhTabs from './tabs'
import PhTag from './tag'

const eltList = [
  PhCard,
  PhCheckbox,
  PhNav,
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
