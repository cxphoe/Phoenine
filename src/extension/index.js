import PhCard from './card'
import PhCheckbox from './checkbox'
import PhNav from './navbar'
import PhTag from './tag'

const eltList = [
  PhCard,
  PhCheckbox,
  PhNav,
  PhTag,
]

export default {
  install() {
    eltList.forEach(elt => {
      elt.install()
    })
  }
}
