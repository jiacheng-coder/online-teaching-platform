<template>
    <ga-page 
    ref="gaPage" 
	@pageInit="pageInit">
		<template
		v-slot:headerLeft>
			<span class="ga-page-h1">会员列表</span>
		</template>
        <template v-slot:headerRight>
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
				<el-row justify="space-between">
					<div>&nbsp;</div>
					<el-col :sm="24" :md="10" :lg="6">
						<el-input 
						style="width:100%;"
						:clearable="true" 
						v-model="searchKwd" 
						placeholder="搜索" 
						@change="search">
							<template #prefix>
								<el-icon 
								class="el-input__icon"><search /></el-icon>
							</template>
						</el-input>
					</el-col>
				</el-row>
                <el-table 
                :empty-text="emptyText" 
                :data="tableData" 
                v-loading="tableLoading" 
                style="width:100%; margin-top:6px;">
                    <el-table-column min-width="80px" :show-overflow-tooltip="true" prop="u_id" label="ID" />
					<el-table-column :show-overflow-tooltip="true" min-width="50px" prop="u_face" label="头像">
						<template #default="scope">
							<img :src="scope.row.u_face" class="u-face" />
						</template>
					</el-table-column>
                    <el-table-column :show-overflow-tooltip="true" min-width="128px" prop="u_nickname" label="用户昵称" />
                    <el-table-column :show-overflow-tooltip="true" min-width="80px" prop="u_status" label="用户状态" />
                    <el-table-column :show-overflow-tooltip="true" min-width="80px" prop="u_integral" label="会员积分" />
					<el-table-column :show-overflow-tooltip="true" min-width="158px" prop="u_regtime" label="注册时间">
						<template #default="scope">
							<span>{{toDate(scope.row.u_regtime)}}</span>
						</template>
					</el-table-column>
					<el-table-column :show-overflow-tooltip="true" min-width="128px" prop="u_ip" label="登录IP" />
					<el-table-column
					label="操作功能" 
					width="120" fixed="right">
						<template #default="scope">
							<el-row justify="center" align="middle">
								<el-button 
								plain 
								size="small" 
								v-if="checkAuthority('Detail')" 
								style="font-size:14px;"
								@click="detail(scope.$index, scope.row)">
									详情 <el-icon><right /></el-icon>
								</el-button>
							</el-row>
						</template>
					</el-table-column>
                </el-table>
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
import commonList    from "@gvaJS/commonList";
import request       from '@gvaJS/request';
import { Plus, Edit, Delete, Search, RefreshLeft, Right } from '@element-plus/icons-vue';
export default defineComponent({
    mixins:[commonList],
    data() {
        return {
			apiModelName : 'Members',
			tdHeight     : 72,
            searchKwd    : ''
        }
    },
    components:{
        Plus, Edit, Delete, Search, RefreshLeft, Right
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
				{kwd:this.searchKwd},
				(res)=>{
					// 假设总数为 1000
					this.tableDataTotal = 1000;
					this.getData();
				}
			);
		},
		// 请求api 获取管理员列表
		getData : function(){
			this.tableLoading = true;
			// 模拟请求
			request.postSimulate(
				'members',
				{kwd:this.searchKwd},
				(res)=>{
					this.tableData = res.data;
				},
				()=>{},
				()=>{this.tableLoading = false;}
			);
		},
        search : function(kwd){
			console.log("搜索关键字 : " + kwd);
			this.searchKwd = kwd;
			// 可以在 this.getotal 和 getData 中利用 this.searchKwd 连接 api 接口
			// 动态查询实现搜索
			this.getTotal();
		},
		detail : function (index, row) {
			console.log(index, row);
			this.$router.push({
				path:'/Members/Detail',
				query:{id:row.u_id}
			});
		}
    },
});
</script>
<style scoped>
.u-face{width:32px; border-radius:50%;}
</style>