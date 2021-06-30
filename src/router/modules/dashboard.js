import BasicLayout from '@/layouts'

const meta = {
	auth: true
}

const pre = 'dashboard-'

export default {
	path: '/dashboard',
	name: 'dashboard',
	redirect: {
		name: `${pre}index`
	},
	meta,
	component: BasicLayout,
	children: [
		{
			path: 'index',
			name: `${pre}index`,
			meta: {
				...meta,
				title: 'index'
			},
			component: () => import('@/pages/dashboard')
		}
	]
}
