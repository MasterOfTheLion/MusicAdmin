import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/admin',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'admin',
  //       component: () => import('@/views/admin/index'),
  //       meta: { title: '管理员管理', icon: 'admin' }
  //     }
  //   ]
  // },
  {
    path: '/singer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'singer',
        component: () => import('@/views/singer/index'),
        meta: { title: '歌手管理', icon: 'singer' }
      }
    ]
  },
  {
    path: '/song',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'song',
        component: () => import('@/views/song/index'),
        meta: { title: '歌曲管理', icon: 'song' }
      }
    ]
  },
  {
    path: '/songcomment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'songcomment',
        component: () => import('@/views/songcomment/index'),
        meta: { title: '歌曲评论管理', icon: 'songcomment' }
      }
    ]
  },
  
  {
  path: '/songlist',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'songlist',
      component: () => import('@/views/songlist/index'),
      meta: { title: '歌单管理', icon: 'songlist' }
    }
  ]
},
{
  path: '/songlistcomment',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'songlistcomment',
      component: () => import('@/views/songlistcomment/index'),
      meta: { title: '歌单评论管理', icon: 'songlistcomment' }
    }
  ]
},
{
  path: '/album',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'album',
      component: () => import('@/views/album/index'),
      meta: { title: '专辑管理', icon: 'album' }
    }
  ]
},
{
  path: '/albumcomment',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'albumcomment',
      component: () => import('@/views/albumcomment/index'),
      meta: { title: '专辑评论管理', icon: 'albumcomment' }
    }
  ]
},

{
  path: '/notification',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'notification',
      component: () => import('@/views/notification/index'),
      meta: { title: '通知管理', icon: 'notification' }
    }
  ]
},

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
