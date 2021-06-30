<template>
	<el-breadcrumb class="e-layout-header-breadcrumb" ref="breadcrumb">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index" class="e-layout-header-breadcrumb-item">
				<span v-if="index == breadCrumbList.length - 1">{{ item.meta.title }}</span>
				<a v-else :href="item.fullPath">{{ item.meta.title }}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
<script>
import { reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
	name: 'eHeaderBreadcrumb',
	setup() {
		const route = useRoute()
		const state = reactive({
			breadCrumbList: []
		})
		watch(
			() => route.path,
			() => {
				handleGetBreadCrumbList()
			}
		)
		const handleGetBreadCrumbList = () => {
			state.breadCrumbList = route.matched.filter(item => item.meta && item.meta.title)
		}
		handleGetBreadCrumbList()
		return {
			...toRefs(state)
		}
	}
}
</script>
