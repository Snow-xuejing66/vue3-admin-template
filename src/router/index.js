import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import util from '@libs/util'

import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	NProgress.start()
	// if (to.matched.some(_ => _.meta.auth)) {
	// 	// 判断是否需要登录才能进入
	// 	const token = util.cookies.get('userid')

	// 	if (token && token !== 'undefined') {
	// 		next()
	// 	} else {
	// 		// 没有登录的时候跳转到登录界面
	// 		// 携带上登陆成功之后需要跳转的页面完整路径
	// 		next({
	// 			name: 'login',
	// 			query: {
	// 				redirect: to.fullPath
	// 			}
	// 		})
	// 	}
	// } else {
	next()
	// }
})

router.afterEach(() => {
	NProgress.done()
	// 返回页面顶端
	window.scrollTo(0, 0)
})

export default router
