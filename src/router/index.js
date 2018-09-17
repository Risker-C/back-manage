import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var components = {
  login: () => import('../views/login/login'),
  layout: () => import('../views/Layout/index'),
  welcome: () => import('../views/Layout/first'),
  user: () => import('../views/user/index'),
  categoryList: () => import('../views/category/index'),
  addCategory: () => import('../views/category/addCategory'),
  bookList: () => import('../views/book/index'),
  addBook: () => import('../views/book/addBook')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: components.login
    },
    {
      path: '/layout',
      name: 'layout',
      redirect: '/layout/welcome',
      component: components.layout,
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: components.welcome,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: components.user
        },
        {
          path: 'categoryList',
          name: 'categoryList',
          component: components.categoryList
        },
        {
          path: 'addCategory',
          name: 'addCategory',
          component: components.addCategory
        },
        {
          path: 'bookList',
          name: 'bookList',
          component: components.bookList
        },
        {
          path: 'addBook',
          name: 'addBook',
          component: components.addBook
        }
      ]
    }
  ]
})
