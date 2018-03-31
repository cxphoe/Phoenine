// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import PhUI from './extension'
import './style/element-variables.scss'
import './style/custom.scss'
import App from './App'
import ErrorPage from './components/utils/error_page'
import router from './router'
import { getData } from './utils/data/data'
import { getAsyncReposIntro } from './utils/data/repo'
import ArticleDatabase from './database/article'
import Data from './mixins/data'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(PhUI)

Vue.mixin(Data)

const retrieveData = function (config) {
  let gitUsername = config.gitUsername
  let aBasePath = config.articleBasePath
  if (!['/', '\\'].includes(aBasePath[0])) {
    aBasePath = '/' + aBasePath
  }
  let basePath = ''

  if (gitUsername) {
    basePath = config.basePath = ''

    let imgPaths = config.imgPaths
    for (let key in imgPaths) {
      imgPaths[key] += basePath
    }
  }

  let repoDatabase = getAsyncReposIntro(gitUsername)
  let sourcePath = basePath + aBasePath + '/source.json'
  let articleDatabase = new ArticleDatabase(sourcePath)

  return {
    config,
    repoDatabase,
    articleDatabase,
  }
}

/* eslint-disable no-new */
getData('/config.json', response => {
  let config = response.data
  let data = retrieveData(config)
  new Vue({
    el: '#app',
    router,
    data() {
      return data
    },
    components: {
      App,
    },
    template: '<App/>',
  })
}, (errcode, message) => {
  new Vue({
    el: '#app',
    components: {
      ErrorPage,
    },
    render(h) {
      return (
        <ErrorPage
          status={ errcode }
          statusText={ message }
        />
      )
    },
  })
})
