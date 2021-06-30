import { cloneDeep } from 'lodash'
import menuSider from '@/menu/sider'
/**
 * @description 判断列表1中是否包含了列表2中的某一项
 * 因为用户权限 access 为数组，includes 方法无法直接得出结论
 * */
function includeArray(list1, list2) {
	let status = false
	list2.forEach(item => {
		if (list1.includes(item)) status = true
	})
	return status
}
// 根据 menu 配置的权限，过滤菜单
function filterMenu(menuList, access, lastList) {
	menuList.forEach(menu => {
		let menuAccess = menu.auth
		if (!menuAccess || includeArray(menuAccess, access)) {
			let newMenu = {}
			for (let i in menu) {
				if (i !== 'children') newMenu[i] = cloneDeep(menu[i])
			}
			if (menu.children && menu.children.length) newMenu.children = []
			lastList.push(newMenu)
			menu.children && filterMenu(menu.children, access, newMenu.children)
		}
	})
	return lastList
}

export default {
	namespaced: true,
	state: {
		activePath: ''
	},
	getters: {
		/**
		 * @description 根据 user 里登录用户权限，对侧边菜单进行鉴权过滤
		 */
		filterSider(state, getters, rootState) {
			const userInfo = rootState.user.info
			// @权限
			const access = userInfo.role_info.role_ids
			if (access && access.length) {
				return filterMenu(menuSider, access, [])
			} else {
				return filterMenu(menuSider, [], [])
			}
		}
	},
	mutations: {
		/**
		 * @description 设置侧边菜单
		 * @param {Object} state vuex state
		 * @param {Array} menuSider menuSider
		 * */
		// setMenuSider(state, menuSider) {
		// 	state.menuSider = menuSider
		// },
		// setActivePath(state, activePath) {
		// 	state.activePath = activePath
		// }
	}
}
