/**
 * 注册、登录、注销
 * */
import util from '@/libs/util'
import router from '@/router'
import { AccountLogin } from '@api/account'

export default {
	namespaced: true,
	actions: {
		/**
		 * @description 登录
		 * @param {Object} param context
		 * @param {Object} param username {String} 用户账号
		 * @param {Object} param password {String} 密码
		 * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
		 */
		login({ dispatch }, { phone = '', password = '' } = {}) {
			return new Promise((resolve, reject) => {
				// 开始请求登录接口
				AccountLogin({
					phone,
					password
				})
					.then(async res => {
						// 设置 cookie 一定要存 uuid 和 token 两个 cookie
						// 根据需要自定义添加
						util.cookies.set('userid', res.data.id)
						// 设置 vuex 用户信息
						await dispatch('user/set', res.data, { root: true })
						
						router.push('/')
						// 结束
						resolve()
						
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		/**
		 * @description 退出登录
		 * */
		logout({ dispatch }) {
			async function logout() {
				// 删除cookie
				util.cookies.remove('token')
				util.cookies.remove('userid')
				// 清空 vuex 用户信息
				await dispatch('user/set', {}, { root: true })
				// 跳转路由
				router.push({
					name: 'login'
				})
			}
			logout()
		}
	}
}
