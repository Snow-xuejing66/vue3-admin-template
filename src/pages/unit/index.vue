<template>
	<div class="g-content-body">
		<el-row>
			<el-col>
				<el-form :inline="true" :model="formData" class="demo-form-inline">
					<el-form-item label="项目阶段：">
						<el-select clearable size="medium" v-model="formData.project_stage" placeholder="请选择项目阶段">
							<el-option v-for="item in project_stages" :key="item.project_stage_code" :label="item.project_stage_name" :value="item.project_stage_code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="项目名称：">
						<el-input clearable size="medium" v-model="formData.project_name" placeholder="请输入项目名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="medium" type="primary" @click="handleSearch">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="medium" type="primary" @click="handleSearch">新增</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-table v-loading="loading" border stripe empty-text="暂无数据" :data="data1">
					<el-table-column align="center" type="selection"></el-table-column>
					<el-table-column align="center" prop="name" label="项目名称" width="200"></el-table-column>
					<el-table-column align="center" prop="unit_count" label="单位数"></el-table-column>
					<el-table-column align="center" prop="device_all_count" label="总设备数"></el-table-column>
					<el-table-column align="center" prop="liable_person_name" label="负责人"></el-table-column>
					<el-table-column align="center" prop="liable_person_tel" label="负责人电话"></el-table-column>
					<el-table-column align="center" prop="project_stage_info" label="项目阶段">
						<template #default="scope">
							<span>{{ scope.row.project_stage_info.project_stage_name }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="created_at" label="创建时间" width="180"></el-table-column>
					<el-table-column align="center" prop="action" label="操作">
						<template #default="scope">
							<div class="g-action">
								<span class="g-text-primary g-point" @click="handleDetail(scope.row)">详情</span>
								<span class="g-text-primary g-point" @click="handleDelete(scope.row)">修改</span>
								<span class="g-text-primary g-point" @click="handleDelete(scope.row)">删除</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row class="el-mt-16">
			<el-col class="el-text-center">
				<el-pagination background :current-page="page" layout="prev, pager, next" :total="count" @current-change="handlePageChange"></el-pagination>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import { project_list_api, project_stage_api } from '@api/project'
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
export default {
	name: 'project',
	setup() {
		const router = useRouter()
		const state = reactive({
			loading: true,
			project_stages: [],
			formData: {
				project_stage: '',
				project_name: ''
			},
			data1: [],
			count: 0,
			page: 1,
			pageSize: 10
		})
		//  获取项目阶段列表
		const handleGetProjectStages = () => {
			project_stage_api().then(res => {
				state.project_stages = res.data
			})
		}
		const handleGetProjectList = () => {
			state.loading = true
			project_list_api({
				...state.formData,
				page: state.page,
				pageSize: state.pageSize
			}).then(res => {
				state.data1 = res.data ? res.data.data : []
				state.count = res.data.count
				state.loading = false
			})
		}
		const handleSearch = () => {
			handleGetProjectList()
		}
		onBeforeMount(() => {
			handleGetProjectStages()
			handleGetProjectList()
		})
		// action
		const handleDetail = row => {
			router.push({
				path: '/project/detail',
				query: {
					project_id: row.id,
					code: row.region_code
				}
			})
		}
		// page change
		const handlePageChange = value => {
			state.page = value
			handleGetProjectList()
		}
		return {
			...toRefs(state),
			handleSearch,
			handleDetail,
			handlePageChange
		}
	}
}
</script>
