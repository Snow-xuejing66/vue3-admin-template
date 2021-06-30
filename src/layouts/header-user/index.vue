<template>
	<span class="e-layout-header-trigger e-layout-header-trigger-min">
		<el-dropdown class="e-layout-header-user" @command="handleClick">
			<span>
				<el-avatar style="vertical-align: middle" size="small" icon="el-icon-user" />
				<span class="e-layout-header-user-name">{{ info.user_info && info.user_info.real_name }}</span>
			</span>
			<template #dropdown>
				<el-dropdownMenu>
					<el-dropdown-item command="personal">
						<i class="el-icon-message"></i>
						<span>{{ '消息通知' }}</span>
					</el-dropdown-item>
					<el-dropdown-item command="setting">
						<i class="el-icon-lock"></i>
						<span>{{ '修改密码' }}</span>
					</el-dropdown-item>
					<el-dropdown-item command="logout">
						<i class="el-icon-finished"></i>
						<span>{{ '退出登录' }}</span>
					</el-dropdown-item>
				</el-dropdownMenu>
			</template>
		</el-dropdown>
	</span>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'eHeaderUser',
	setup() {
		const store = useStore()
		const handleClick = value => {
			if (value == 'logout') {
				store.dispatch('account/logout')
			}
		}
		return {
			info: computed(() => store.state.user.info),
			handleClick
		}
	}
}
</script>
