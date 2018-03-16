import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/page/home'
import Login from '../components/page/login/main'
import ProjectPage from '../components/page/project/index'
import ProjectDatail from '../components/detail/project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/project',
      name: 'ProjectPage',
      component: ProjectPage,
    },
    {
      path: '/project/:name',
      component: ProjectDatail,
    },
  ],
})
