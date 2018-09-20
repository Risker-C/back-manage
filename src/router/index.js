import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var components = {
  user: () => import('../views/user/index'),
  login: () => import('../views/login/login'),
  layout: () => import('../views/Layout/index'),
  welcome: () => import('../views/Layout/first'),
  bookList: () => import('../views/book/index'),
  addBook: () => import('../views/book/addBook'),
  editBook: () => import('../views/book/editBook'),
  categoryList: () => import('../views/category/index'),
  addCategory: () => import('../views/category/addCategory'),
  editCategory: () => import('../views/category/editCategory'),
  categoryBooks: () => import('../views/category/categoryBooks.vue'),
  addMessage: () => import('../views/managers/addMessage'),
  managerList: () => import('../views/managers/managerList'),
  editMessage: () => import('../views/managers/editMessage'),
  editPassword: () => import('../views/managers/editPassword'),
  addImg: () => import('../views/sowingMap/addImg'),
  editImg: () => import('../views/sowingMap/addImg'),
  imgManage: () => import('../views/sowingMap/imgManage'),
  uploadImg: () => import('../components/uploadImg'),
  persistedstate: () => import('../components/persistedstate'),
  routeChange: () => import('../components/routeChange/index'),
  useParams: () => import('../components/routeChange/useParams'),
  useQuery: () => import('../components/routeChange/useQuery')
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
          path: 'editBook',
          name: 'editBook',
          component: components.editBook
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
          path: 'editCategory',
          name: 'editCategory',
          component: components.editCategory
        },
        {
          path: 'categoryBooks',
          name: 'categoryBooks',
          component: components.categoryBooks
        },
        {
          path: 'uploadImg',
          name: 'uploadImg',
          component: components.uploadImg
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
          path: 'addMessage',
          name: 'addMessage',
          component: components.addMessage
        },
        {
          path: 'imgManage',
          name: 'imgManage',
          component: components.imgManage
        },
        {
          path: 'addImg',
          name: 'addImg',
          component: components.addImg
        },
        {
          path: 'editImg',
          name: 'editImg',
          component: components.editImg
        },
        {
          path: 'persistedstate',
          name: 'persistedstate',
          component: components.persistedstate
        },
        {
          path: 'routeChange',
          name: 'routeChange',
          redirect: 'routeChange/nothing',
          component: components.routeChange,
          children: [
            {
              path: 'nothing',
              name: 'nothing',
              component: {
                template: '<h3>点击链接或者按钮，开始测试</h3>'
              }
            },
            {
              path: 'useParams/:id',
              name: 'useParams',
              component: components.useParams
            },
            {
              path: 'useQuery',
              name: 'useQuery',
              component: components.useQuery
            }
          ]
        }
      ]
    }
  ]
})
