import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import useTokenStore from '@/store/modules/settings'

let routes = []

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
generatedRoutes.forEach(v => {
    routes.push(v?.meta?.layout != false ? setupLayouts([v])[0] : v)
})

console.log('路由: ', routes)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(to => {
    NProgress.done()
    useTokenStore().setTitle(typeof to.meta.title === 'function' ? to.meta.title() : to.meta.title || '')
})

export default router
