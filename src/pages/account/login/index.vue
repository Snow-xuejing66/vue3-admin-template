<template>
	<div class="e-page-account">
		<div class="e-page-account-container">
			<div class="e-page-account-container-header">
				<div class="e-page-account-container-header-title">VUE ADMIN</div>
			</div>
			<el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="e-page-account-container-login">
				<el-form-item label="账号" prop="username">
					<el-input type="text" v-model.trim="ruleForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="width: 100%" type="primary" @click="handleSubmit">立即登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
	name: 'Login',
	setup() {
		const store = useStore()
		const loginForm = ref(null)
		const state = reactive({
			ruleForm: {
				phone: '',
				password: ''
			},
			checked: true,
			rules: {
				phone: [
					{
						required: 'true',
						message: '账户不能为空',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: 'true',
						message: '密码不能为空',
						trigger: 'blur'
					}
				]
			}
		})
		const handleSubmit = () => {
			store.dispatch('account/login', { ...state.ruleForm })
		}
		const resetForm = () => {
			loginForm.value.resetFields()
		}
		return {
			...toRefs(state),
			loginForm,
			handleSubmit,
			resetForm
		}
	}
}
</script>
