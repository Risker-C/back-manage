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
  addBook: () => import('../views/book/addBook'),
  uploadImg: () => import('../components/uploadImg'),
  editBook: () => import('../views/book/editBook'),
  editMessage: () => import('../views/managers/editMessage'),
  editPassword: () => import('../views/managers/editPassword'),
  managerList: () => import('../views/managers/managerList'),
  imgManage: () => import('../views/sowingMap/imgManage'),
  addMessage: () => import('../views/managers/addMessage'),
  persistedstate: () => import('../components/persistedstate'),
  addImg: () => import('../views/sowingMap/addImg')
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
        },
        {
          path: 'uploadImg',
          name: 'uploadImg',
          component: components.uploadImg
        },
        {
          path: 'editBook:id',
          name: 'editBook',
          component: components.editBook
        },
        {
          path: 'editMessage',
          name: 'editMessage',
          component: components.editMessage
        },
        {
          path: 'editPassword',
          name: 'editPassword',
          component: components.editPassword
        },
        {
          path: 'managerList',
          name: 'managerList',
          component: components.managerList
        },
        {
          path: 'imgManage',
          name: 'imgManage',
          component: components.imgManage
        },
        {
          path: 'addMessage',
          name: 'addMessage',
          component: components.addMessage
        },
        {
          path: 'persistedstate',
          name: 'persistedstate',
          component: components.persistedstate
        },
        {
          path: 'addImg',
          name: 'addImg',
          component: components.addImg
        }
      ]
    }
  ]
})
