import Vue from 'vue'
import PhCard from './src/main'

export default {
  install() {
    Vue.component(PhCard.name, PhCard)
  }
}
