<template>
	<!-- <GlobalFooter class="e-copyright" :links="links" :copyright="copyright" /> -->
	<div class="e-global-footer">
		<p class="e-global-footer-copyright">{{ copyright }}</p>
	</div>
</template>
<script>
import { ref } from 'vue'
export default {
	name: 'e-copyright',
	setup() {
		const copyright = ref('欢迎使用element-plus-admin-template后台管理模板')
		return {
			copyright
		}
	}
}
</script>
<style lang="scss">
.e-global-footer {
	padding: 0 16px;
	text-align: center;
}
.e-global-footer-copyright {
	color: #808695;
	font-size: 14px;
	line-height: 60px;
}
</style>
