import Vue from 'vue'
import Router from 'vue-router'
import base from "../views/base";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: resolve => require(['../views/base'], resolve),
      children:[
        {
          path: '/Doclist',
          name: 'Doclist',
          component: resolve => require(['../components/Doclist'], resolve)
        },
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['../views/mainpages/home'], resolve)
        },
        {
          path: '/booklist',
          name: 'booklist',
          component: resolve => require(['../views/bookshelf/booklist'], resolve)
        },
        {
          path: '/classlist',
          name: 'classlist',
          component: resolve => require(['../views/classfic/classlist'], resolve)
        },
        {
          path: '/bookinfo',
          name: 'bookinfo',
          component: resolve => require(['../views/bookshelf/bookinfo'], resolve)
        },
        {
          path: '/userpage',
          name: 'userpage',
          component: resolve => require(['../views/usercfg/userpage'], resolve)
        },
      ],
    },
    {
      path:'/Dochand',
      name: 'Dochand',
      component: resolve => require(['../views/mainpages/Dochand'], resolve)
    },
    {
      path:'/login',
      name: 'login',
      component: resolve => require(['../views/usercfg/login'], resolve)
    },
    {
      path:'/register',
      name: 'register',
      component: resolve => require(['../views/usercfg/register'], resolve)
    },
    {
      path:'/readbook',
      name: 'readbook',
      component: resolve => require(['../views/bookshelf/readbook'], resolve)
    },
    {
      path:'/search',
      name: 'search',
      component: resolve => require(['../views/bookshelf/search'], resolve)
    },
    {
      path:'/myhandlist',
      name: 'myhandlist',
      component: resolve => require(['../views/bookshelf/Myhandlist'], resolve)
    },
    {
      path:'/mykeeplist',
      name: 'mykeeplist',
      component: resolve => require(['../views/bookshelf/Mykeeplist'], resolve)
    },
    {
      path:'/userinfo',
      name: 'userinfo',
      component: resolve => require(['../views/usercfg/userinfo'], resolve)
    },
    {
      path: '/classdetails',
      name: 'classdetails',
      component: resolve => require(['../views/classfic/classdetails'], resolve)
    },
  ]
})
