<template>
	<el-container class="e-layout">
		<el-aside class="e-layout-sider e-layout-sider-fix" :class="{ 'e-layout-sider-fix-dark': siderTheme === 'dark' }" :width="menuCollapse ? '64px' : '256px'">
			<e-menu-sider></e-menu-sider>
		</el-aside>
		<el-container class="e-layout-inside" :class="insideClasses">
			<el-header class="e-layout-header" :class="headerClasses" :style="headerStyle" height="64px">
				<e-header-collapse />
				<e-header-breadcrumb ref="breadcrumb" />
				<div class="e-layout-header-right">
					<e-header-user />
				</div>
			</el-header>
			<el-main class="e-layout-content e-layout-content-fix-with-header">
				<div class="e-layout-content-main">
					<router-view v-slot="{ Component }">
						<transition name="fade" mode="out-in" appear>
							<keep-alive>
								<component :is="Component"></component>
							</keep-alive>
						</transition>
					</router-view>
				</div>
			</el-main>
			<el-footer>
				<e-copyright />
			</el-footer>
		</el-container>
	</el-container>
</template>
<script>
import eMenuSider from './menu-sider'
import eHeaderCollapse from './header-collapse'
import eHeaderBreadcrumb from './header-breadcrumb'
import eHeaderUser from './header-user'
import eCopyright from '@/components/copyright'
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
	name: 'layout',
	components: {
		eMenuSider,
		eHeaderCollapse,
		eHeaderBreadcrumb,
		eHeaderUser,
		eCopyright
	},
	setup() {
		const state = reactive({
			headerFix: true,
			siderFix: true
		})
		const store = useStore()
		const menuCollapse = computed(() => store.state.layout.menuCollapse)
		const insideClasses = computed(() => {
			return {
				'e-layout-inside-fix-with-sider': state.siderFix,
				'e-layout-inside-fix-with-sider-collapse': state.siderFix && menuCollapse.value
			}
		})

		const headerClasses = computed(() => {
			return {
				'e-layout-header-fix': state.headerFix,
				'e-layout-header-fix-collapse': state.headerFix && menuCollapse.value
			}
		})

		const headerStyle = computed(() => {
			const menuWidth = menuCollapse.value ? 64 : 256
			return { width: `calc(100% - ${menuWidth}px)` }
		})

		return {
			...toRefs(state),
			siderTheme: computed(() => store.state.layout.siderTheme),
			menuCollapse,
			insideClasses,
			headerClasses,
			headerStyle
		}
	}
}
</script>
