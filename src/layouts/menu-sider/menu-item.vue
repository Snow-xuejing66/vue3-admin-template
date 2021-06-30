<template>
	<el-menu-item :index="menu.path" v-if="menu.children === undefined || !menu.children.length">
		<i :class="menu.icon" v-if="menu.icon" />
		<i :class="menu.custom" v-else-if="menu.custom" />
		<img :src="menu.img" v-else-if="menu.img" />
		<template #title>
			<span>{{ menu.title }}</span>
		</template>
	</el-menu-item>
	<el-submenu ref="subMenu" :index="menu.path" v-else popper-append-to-body popper-class="menu-popper-custom">
		<template #title>
			<i :class="menu.icon" v-if="menu.icon" />
			<i :class="menu.custom" v-else-if="menu.custom" />
			<img :src="menu.img" v-else-if="menu.img" />
			<span>{{ menu.title }}</span>
		</template>
		<e-menu-side-item v-for="item in menu.children" :key="item.path" :menu="item" />
	</el-submenu>
</template>
<script>
export default {
	name: 'eMenuSideItem',
	props: {
		menu: {
			type: Object,
			default: () => {
				return {}
			}
		}
	}
}
</script>
