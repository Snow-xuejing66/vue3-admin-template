// import store from '@/store'
import axios from 'axios'
import util from '@/libs/util'
import { generateHS256Token } from 'jwt-hs256'

import { ElMessage } from 'element-plus'

window.APP_KEY = '5HgA778A'
window.APP_SECRET = 'deb5754c9bf841244210a3144b2a4e7d'
window.exp = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60
window.iat = Math.floor(new Date().getTime() / 1000)

// 创建一个错误
function errorCreate(msg) {
	const err = new Error(msg)
	errorLog(err)
	throw err
}

// 记录和显示错误
function errorLog(err) {
	ElMessage({
		center: true,
		message: err.message,
		type: 'error'
	})
}

// 创建一个 axios 实例
const service = axios.create({
	baseURL: '/',
	timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
	config => {
		let Authorization
		let role_id = ''
		// 在请求发送之前做一些处理
		if (config.url == '/v1/user/user_login/user_login') {
			window.exp = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60
			window.iat = Math.floor(new Date().getTime() / 1000)
			Authorization = generateHS256Token(
				{
					iss: window.APP_KEY,
					exp: window.exp,
					iat: window.iat
				},
				window.APP_SECRET
			)
		} else {
			let user_id = util.cookies.get('userid')
			role_id = util.cookies.get('role_id')
			Authorization = generateHS256Token(
				{
					iss: window.APP_KEY,
					exp: window.exp,
					iat: window.iat,
					user_id: user_id
				},
				window.APP_SECRET
			)
			// 所有接口请求统一都加上role_id参数
			if (config.data == undefined) {
				config.data = {}
			}
			config.data['role_id'] = role_id
		}
		config.headers['Authorization'] = 'Bearer ' + Authorization
		config.headers['x-api-version-key'] = '20210311'
		return config
	},
	error => {
		// 发送失败
		console.log(error)
		Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	response => {
		// dataAxios 是 axios 返回数据中的 data
		const dataAxios = response.data
		// 这个状态码是和后端约定的
		const { code } = dataAxios
		// 根据 code 进行判断
		if (code === undefined) {
			// 如果没有 code 代表这不是项目后端开发的接口
			return dataAxios
		} else {
			// 有 code 代表这是一个后端接口 可以进行进一步的判断
			switch (code) {
				case 0:
					// [ 示例 ] code === 0 代表没有错误
					return dataAxios.data
				case 'xxx':
					// [ 示例 ] 其它和后台约定的 code
					errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
					break
				default:
					// 不是正确的 code
					errorCreate(`${dataAxios.msg}: ${response.config.url}`)
					break
			}
		}
	},
	error => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '请求错误'
					break
				case 401:
					error.message = '未授权，请登录'
					break
				case 403:
					error.message = '拒绝访问'
					break
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`
					break
				case 408:
					error.message = '请求超时'
					break
				case 500:
					error.message = '服务器内部错误'
					break
				case 501:
					error.message = '服务未实现'
					break
				case 502:
					error.message = '网关错误'
					break
				case 503:
					error.message = '服务不可用'
					break
				case 504:
					error.message = '网关超时'
					break
				case 505:
					error.message = 'HTTP版本不受支持'
					break
				default:
					break
			}
		}
		errorLog(error)
		return Promise.reject(error)
	}
)

export default service
