import Vue from 'vue'
import PhCheckbox from './src/singleton'
import PhCheckboxGroup from './src/group'

export default {
  install() {
    Vue.component(PhCheckbox.name, PhCheckbox)
    Vue.component(PhCheckboxGroup.name, PhCheckboxGroup)
  }
}
