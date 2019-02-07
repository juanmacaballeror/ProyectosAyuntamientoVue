import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Totales from '@/views/totales/index'
import Actividad from '@/views/actividad/index'
import TransferenciaFicheros from '@/views/transferenciaFicheros/index'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               (i18) the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
debugger
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true  },
  { path: '/intranet', name: 'intranet', component: _import('login/authIntranet'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'totales',
    hidden: true,
    children: [{
      hidden: true,
      path: 'totales',
      component: _import('totales/index'),
      name: 'totales',
      meta: { title: 'Totales', icon: 'dashboard', hidden: true }
    }]
  }
]
debugger
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/totales',
   // component: Layout,
    redirect: 'noredirect',
    name: 'totales',
    component: Totales,
    meta: {
      title: 'totales',
      icon: 'form'/*,
      roles: ['CONSULTAS', 'OPERADOR', 'OPERADOR_OAC', 'FUNCIONARIO_OAC', 'JEFE_OAC', 'GESTOR', 'ADMIN']*/
    }
  },
  {
    path: '/transferenciaFicheros',
    //component: Layout,
    redirect: 'noredirect',
    name: 'transferenciaFicheros',
    component: TransferenciaFicheros,
    meta: {
      title: 'transferenciaFicheros',
      icon: 'form'/*,
      roles: ['CONSULTAS', 'OPERADOR', 'OPERADOR_OAC', 'FUNCIONARIO_OAC', 'JEFE_OAC', 'GESTOR', 'ADMIN']*/
    }
  },
  {
    path: '/actividad',
    //component: Layout,
    redirect: 'noredirect',
    name: 'actividad',
    component: Actividad,
    meta: {
      title: 'actividad',
      icon: 'form'/*,
      roles: ['CONSULTAS', 'OPERADOR', 'OPERADOR_OAC', 'FUNCIONARIO_OAC', 'JEFE_OAC', 'GESTOR', 'ADMIN']*/
    }
  },
  {
    path: '/detalleMovimientoDia',
    component: Layout,
    redirect: 'noredirect',
    name: 'detalleMovimientoDia',
    meta: {
      title: 'detalleMovimientoDia',
      icon: 'form'/*,
      roles: ['CONSULTAS', 'OPERADOR', 'OPERADOR_OAC', 'FUNCIONARIO_OAC', 'JEFE_OAC', 'GESTOR', 'ADMIN']*/
    }
  },
  {
    path: '/consultaMovimientosMatricula',
    component: Layout,
    redirect: 'noredirect',
    name: 'consultaMovimientosMatricula',
    meta: {
      title: 'consultaMovimientosMatricula',
      icon: 'form'/*,
      roles: ['CONSULTAS', 'OPERADOR', 'OPERADOR_OAC', 'FUNCIONARIO_OAC', 'JEFE_OAC', 'GESTOR', 'ADMIN']*/
    }
  },
  {
    path: '/ayuda',
    component: Layout,
    redirect: 'noredirect',
    name: 'ayuda',
    meta: {
      title: 'ayuda',
      icon: 'form'
    },
    children: [
      { path: 'manual', component: _import('ayuda/manual/index'), name: 'manual', meta: { title: 'manual', icon: 'table' }},
      { path: 'acercade', component: _import('ayuda/acercade'), name: 'acercade', meta: { title: 'acercade', icon: 'table' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
