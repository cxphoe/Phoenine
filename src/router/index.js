import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/page/home'
import Login from '../components/page/login/main'
import RepositoryPage from '../components/page/repository/index'
import ArticlePage from '../components/page/article'

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
      path: '/login',
      name: 'login',
      component: Login,
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
          component: ArticlePage,
        },
      ],
    },
  ],
})
