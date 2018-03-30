// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import PhUI from './extension'
import axios from 'axios'
import './style/element-variables.scss'
import './style/custom.scss'
import App from './App'
import router from './router'
import { processConfig } from './utils/data'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(PhUI)

/* eslint-disable no-new */
axios.get('/config.json')
  .then(response => {
    let config = response.data
    processConfig(config)
    new Vue({
      el: '#app',
      router,
      data() {
        return {
          config,
        }
      },
      components: {
        App,
      },
      render(h) {
        return (
          <App/>
        )
      },
    })
  }).catch(response => {
    console.log(response.message)
  })
