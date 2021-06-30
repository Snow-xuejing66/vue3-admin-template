<template>
	<div class="e-layout-sider-logo">
		<transition name="fade-quick">
			<a href="/">
				<img src="@/assets/images/logo-small.png" v-if="menuCollapse" />
				<img src="@/assets/images/logo.png" v-else-if="siderTheme === 'light'" />
				<img src="@/assets/images/logo-dark.png" v-else />
			</a>
		</transition>
	</div>
	<el-menu
		ref="menu"
		router
		class="e-layout-menu-sider e-scrollbar-hide"
		:collapse="menuCollapse"
		default-active=""
		:unique-opened="menuAccordion"
		active-text-color="#fff"
		:background-color="siderTheme === 'dark' ? '#191a23' : '#fff'"
		:text-color="siderTheme === 'dark' ? 'hsla(0, 0%, 100%, .7)' : '#191a23'"
		:collapse-transition="false"
	>
		<e-menu-side-item v-for="item in filterSider" :menu="item" :key="item.path"></e-menu-side-item>
	</el-menu>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import eMenuSideItem from './menu-item'
export default {
	name: 'eMenuSide',
	components: {
		eMenuSideItem
	},
	setup() {
		const store = useStore()
		const menuCollapse = computed(() => store.state.layout.menuCollapse)
		const filterSider = computed(() => store.getters['menu/filterSider'])
		return {
			filterSider,
			menuCollapse,
			siderTheme: computed(() => store.state.layout.siderTheme),
			menuAccordion: computed(() => store.state.layout.menuAccordion)
		}
	}
}
</script>
