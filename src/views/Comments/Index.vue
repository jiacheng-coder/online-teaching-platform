<template>
	<ga-page 
	size="small" 
    @pageInit="pageInit">
		<template 
		v-slot:headerLeft>
			<span class="ga-page-h1">评论管理</span>
		</template>
		<template 
		v-slot:headerRight>
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
			<div 
			v-loading="tableLoading" >
                <div class="ga-block comment-items" 
				v-for="(item, idx) in tableData" 
				:key="idx">
                	<div class="ga-font-18">
                		#{{item.id}}&nbsp;{{item.mainTitle}}
                	</div>
					<div class="comment-content">
						{{item.content}}
					</div>
					<el-row 
					class="comment-footer" 
					justify="space-between" align="middle">
						<div class="ga-row ga-nowrap ga-align-center">
							<img :src="item.face" class="comment-face" >
							<div class="item">
								{{item.nickname}}
								&nbsp;&nbsp;·&nbsp;&nbsp;
								{{item.date}} 
							</div>
						</div>
						<div class="ga-row ga-nowrap ga-align-center">
							<el-popconfirm
							confirm-button-text="Yes" 
							cancel-button-text="No" 
							icon-color="red" 
							title="确定删除吗?" 
							v-if="checkAuthority('Delete')" 
							@confirm="handleDelete(idx, item)">
								<template #reference>
									<el-button 
									class="ga-font-13" 
									plain 
									size="small">
										<el-icon><delete /></el-icon>&nbsp;删除评论
									</el-button>
								</template>
							</el-popconfirm>
						</div>
					</el-row>
                </div>
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
import commonListJS  from "@gvaJS/commonList";
import request       from '@gvaJS/request';
import { Plus, Edit, Delete, Search, RefreshLeft } from '@element-plus/icons-vue';
export default defineComponent({
    mixins:[commonListJS],
    data() {
        return {
			apiModelName : 'ManagerRoles'
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
				{},
				(res)=>{
					// 假设总数为 100
					this.tableDataTotal = 100;
					this.getData();
				}
			);
		},
		// 获取数据
		getData : function(){
			this.tableLoading = true;
			// 模拟 api 请求
			request.postSimulate(
				'comments',
				{},
				(res)=>{
					this.tableData = res.data;
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
		}
    }
});
</script>
<style scoped>
.comment-items{margin-bottom:25px; padding:20px;}
.comment-content{font-size:15px; line-height:1.8em; margin-top:12px; color:#708090; padding-bottom:12px;}
.comment-footer{padding:13px 0 2px 0; margin-top:5px; border-top:1px dashed #D8D8D8;}
.comment-face{width:32px; height:32px; border-radius:50%;}
.comment-footer .item{font-size:15px; color:#708090; margin-left:12px;}
</style>