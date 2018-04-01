import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/page/home'
import RepositoryPage from '../components/page/repository/index'
import ArticlePage from '../components/page/article'
import ArticleDetail from '../components/detail/article'
import EditorPage from '../components/page/editor'
import AboutPage from '../components/page/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/repository',
      name: 'repository',
      component: RepositoryPage,
    },
    {
      path: '/article',
      name: 'article',
      component: ArticlePage,
      children: [
        {
          path: ':type',
        },
      ],
    },
    {
      path: '/article/detail/:name',
      name: 'articleDetail',
      component: ArticleDetail,
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  },
})
