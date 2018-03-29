import Vue from 'vue'
import PhCatalogue from './src/catalogue'
import PhCatalogueItem from './src/catalogue_item'

export default {
  install() {
    Vue.component(PhCatalogue.name, PhCatalogue)
    Vue.component(PhCatalogueItem.name, PhCatalogueItem)
  },
}
