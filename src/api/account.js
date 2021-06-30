import request from '@/plugins/request'

export function AccountLogin(data) {
	return request({
		url: '/api/login',
		method: 'post',
		data
	})
}
