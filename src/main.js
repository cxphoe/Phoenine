// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import PhUI from './extension'
import './style/element-variables.scss'
import './style/custom.scss'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(PhUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>'
})
