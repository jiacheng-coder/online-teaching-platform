<template>
	<ga-page 
	ref="gaPage" 
	@pageInit="pageInit">
		<template
		v-slot:headerLeft>
			<span class="ga-page-h1">系统管理员</span>
		</template>
		<template v-slot:headerRight>
			<el-button
			plain 
			v-if="checkAuthority('Add')" 
			@click="openSubmit">
				<el-icon><Plus /></el-icon>&nbsp;添加管理员
			</el-button>
			<el-button 
			:loading="tableLoading" 
			plain 
			@click="refreshData">
				<el-icon v-if="!tableLoading">
					<refresh-left />
				</el-icon>&nbsp;刷新数据
			</el-button>
		</template>
        <template v-slot:body>
			<div class="ga-data-body">
                <el-table 
                :empty-text="emptyText" 
                :data="tableData"   
                v-loading="tableLoading" 
                style="width: 100%">
                    <el-table-column prop="manager_id" label="ID" />
                    <el-table-column 
					:show-overflow-tooltip="true"
					min-width="100px" 
					prop="manager_username" label="用户名" />
                    <el-table-column 
					:show-overflow-tooltip="true"
					min-width="100px" 
					prop="role_name" label="所属角色" />
                    <el-table-column 
					:show-overflow-tooltip="true"
					min-width="100px" 
					prop="manager_nickname" label="用户昵称" />
                    <el-table-column 
					:show-overflow-tooltip="true"
					min-width="100px" 
					prop="manager_ip" label="登录IP" />
                    <el-table-column 
					:show-overflow-tooltip="true"
					min-width="200px" 
					prop="manager_login_time" label="登录时间" />
                    <el-table-column 
					label="操作功能" 
					width="120" 
					fixed="right">
						<template #default="scope">
							<el-button 
							plain 
							v-if="checkAuthority('Edit')" 
							size="small" 
							@click="handleEdit(scope.$index, scope.row)">
								<el-icon :size="20"><edit /></el-icon>
							</el-button>
							<el-popconfirm 
							confirm-button-text="Yes" 
							cancel-button-text="No" 
							icon-color="red" 
							title="确定删除吗?" 
							v-if="checkAuthority('Delete')" 
							@confirm="handleDelete(scope.$index, scope.row)">
								<template #reference>
									<el-button plain 
									size="small">
										<el-icon :size="20"><delete /></el-icon>
									</el-button>
								</template>
							</el-popconfirm>
						</template>
					</el-table-column>
                </el-table>
            </div>
            <div>
                <submit 
				ref="submitPage" 
				@success="submitSuccess"></submit>
            </div>
        </template>
        <template v-slot:footer>
			<div class="ga-small-padding">
				<el-pagination 
				v-model:currentPage="currentPageNumber"
				:page-sizes="pageSizes" 
				:page-size="pageSize" 
				layout="total, sizes, prev, pager, next, jumper" 
				:total="tableDataTotal" 
				@size-change="pageSizeChange" 
				:hide-on-single-page="false" 
				@current-change="pageCurrentChange"></el-pagination>
			</div>
        </template>
    </ga-page>
</template>
<script>
import submit        from "./Submit.vue";
import request       from '@gvaJS/request';
import commonListJS  from "@gvaJS/commonList.js";
import { Plus, Edit, Delete, Search, RefreshLeft } from '@element-plus/icons-vue';
export default defineComponent({
    mixins:[commonListJS],
    data() {
        return {
            // 数据查询模型名称
            apiModelName : 'managers',
            // 数据主键名称
            primaryKey   : 'manager_id',
        }
    },
    components:{
        Plus, Edit, Delete, submit, Search, RefreshLeft
    },
	mounted : function(){
		// 获取数据总数
		this.getTotal();
	},
    methods: {
		// 获取数据总数
		getTotal : function(){
			// 模拟请求
			request.postSimulate(
				'test', 
				{},
				(res)=>{
					// 假设总数为2
					this.tableDataTotal = 2;
					this.getData();
				}
			);
		},
		// 请求api 获取管理员列表
		getData : function(){
			this.tableLoading = true;
			// 模拟请求
			request.postSimulate(
				'managers',
				{},
				(res)=>{
					this.tableData = res.lists;
				},
				()=>{},
				()=>{this.tableLoading = false;}
			);
		},
		// 删除数据
		handleDelete : function(index, row){
			const loading = ElLoading.service({
				lock: true,
				text: '提交中 ...',
			});
			setTimeout(()=>{
				console.log('索引 : ' + index, '数据 : ', row);
				ElMessage({message:"模拟删除成功，请观察控制台", type:'success'});
				loading.close();
			}, 1000);
		},
		// 编辑数据 [ 弹窗形式 ]
		handleEdit     : function(idx, row){
			this.$refs.submitPage.open('edit', row);
		},
    },
});
</script>