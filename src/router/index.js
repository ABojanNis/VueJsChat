// Lib imports
import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import paths from './paths'

function route (path, view, name, meta, children = null) {
  let data = {
    name: name || view,
    path,
    meta,
    component: (resovle) => import(
      `@/views/${view}.vue`
    ).then(resovle)
  }

  if (children) {
    data.children = routes(children)
  }

  return data
}

function routes (paths) {
  return paths.map(path => route(path.path, path.view, path.name, path.meta, path.children))
}

Vue.use(VueRouter)

// Create a new router
const router = new VueRouter({
  mode: 'history',
  routes: routes(paths).concat([
    { path: '*', redirect: '/' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

export default router
