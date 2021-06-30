<template>
	<span class="e-layout-header-trigger e-layout-header-trigger-fold" @click="handleToggleMenuSider">
		<i class="el-icon-s-unfold" v-show="menuCollapse"></i>
		<i class="el-icon-s-fold" v-show="!menuCollapse"></i>
	</span>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'eHeaderCollapse',
	setup() {
		const store = useStore()
		const menuCollapse = computed(() => store.state.layout.menuCollapse)

		const handleToggleMenuSider = () => {
			store.commit('layout/updateMenuCollapse', !menuCollapse.value)
		}
		return {
			menuCollapse,
			handleToggleMenuSider
		}
	}
}
</script>
