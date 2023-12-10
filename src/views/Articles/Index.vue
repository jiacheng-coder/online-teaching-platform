<template>
    <ga-page 
	@pageInit="pageInit">
		<template
		v-slot:headerLeft>
			<span class="ga-page-h1">文章管理</span>
		</template>
		<template v-slot:headerRight>
			<el-button
			plain 
			v-if="checkAuthority('Add')" 
			@click="openSubmitPage">
				<el-icon><Plus /></el-icon>&nbsp;添加文章
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
				<el-row 
				justify="end">
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
                style="width:100%; margin-top:10px;">
                    <el-table-column min-width="80px" prop="article_id" label="ID" />
                    <el-table-column min-width="100px" prop="cate_name" label="文章分类" />
                    <el-table-column 
                    :show-overflow-tooltip="true" 
                    min-width="200px" 
                    prop="article_title" 
					label="文章标题" />
                    <el-table-column 
					min-width="80px" 
					prop="article_view_number" label="查看次数" />
                    <el-table-column min-width="120px" prop="article_create_date" label="创建时间">
					</el-table-column>
					<el-table-column min-width="70px" label="状态">
						<template #default="scope">
							<el-switch 
							@change="updataStatus(scope.row.article_id, scope.row.article_status)" 
							v-model="scope.row.article_status" 
							active-value="1" 
							inactive-value="2" 
							inline-prompt></el-switch>
						</template>
					</el-table-column>
					<el-table-column min-width="70px" label="精选">
						<template #default="scope">
							<el-switch 
							@change="updataPicked(scope.row.article_id, scope.row.article_picked)" 
							v-model="scope.row.article_picked"
							active-value="1" 
							inactive-value="2" 
							inline-prompt></el-switch>
						</template>
					</el-table-column>
                    <el-table-column 
					label="操作功能" 
					width="120" 
					fixed="right">
                        <template #default="scope">
							<el-row justify="center" align="middle">
								<el-button 
								v-if="checkAuthority('Edit')" 
								plain 
								size="small" 
								@click="handleEdit(scope.row.article_id)">
									<el-icon :size="20"><edit /></el-icon>
								</el-button>
								<el-popconfirm 
								v-if="checkAuthority('Delete')" 
								confirm-button-text="Yes" 
								cancel-button-text="No" 
								icon-color="red" 
								title="确定删除吗?" 
								@confirm="handleDelete(scope.$index, scope.row)">
									<template #reference>
										<el-button 
										plain 
										size="small">
											<el-icon :size="20"><delete /></el-icon>
										</el-button>
									</template>
								</el-popconfirm>
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
import { Plus, Edit, Delete, Search, RefreshLeft } from '@element-plus/icons-vue';
import commonList     from "@gvaJS/commonList";
import request        from "@gvaJS/request";
export default defineComponent({
    mixins:[commonList],
    data() {
        return {
            // 数据查询模型名称
            apiModelName : 'articles',
            // 数据主键名称
            primaryKey   : 'article_id',
            searchKwd   : ''
        }
    },
    components:{
        Plus, Edit, Delete, Search, RefreshLeft
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
        		'articles',
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
        openSubmitPage : function(){
            this.$router.push('/Articles/Add')
        },
		handleEdit : function(id){
			this.$router.push({
				path  : '/Articles/Edit',
				query : {id:id}
			});
		},
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
		updataStatus : function(id, val){
			const loading = ElLoading.service({
				lock: true,
				text: '提交中 ...',
			});
			// 模拟 api 请求
			setTimeout(()=>{
				console.log('id : ' + id, '值 : ', val);
				ElMessage({message:"模拟更新成功，请观察控制台", type:'success'});
				loading.close();
			}, 1000);
		},
		updataPicked : function(id, val){
			const loading = ElLoading.service({
				lock: true,
				text: '提交中 ...',
			});
			// 模拟 api 请求
			setTimeout(()=>{
				console.log('id : ' + id, '值 : ', val);
				ElMessage({message:"模拟更新成功，请观察控制台", type:'success'});
				loading.close();
			}, 1000);
		}
    },
});
</script>