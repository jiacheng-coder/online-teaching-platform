<template>
	<ga-page size="small">
		<template
		v-slot:headerLeft>
			<div class="ga-page-h1">
				我的消息
			</div>
		</template>
		<template v-slot:body>
			<div 
			class="ga-bg-white ga-padding" 
			style="margin-top:5px;">
				<el-tabs 
				class="ga-detail-body ga-bg-white" 
				v-model="tabIndex" 
				@tab-click="tabClick">
				    <el-tab-pane 
					v-for="(tab, idx) in tabs" 
					:name="tab" 
					:label="tab"></el-tab-pane>
				</el-tabs>
				<!-- 数据列表 -->
				<div>
					<el-row 
					justify="space-between">
						<div v-if="selectedData.length > 0">
							<el-button
							style="padding-left:0;" 
							plain 
							type="primary"
							@click="batchDelete">批量删除</el-button>
							<el-button 
							v-if="tabIndex != '已读消息'"
							style="margin-left:12px;" 
							plain 
							type="success"
							@click="readed">标为已读</el-button>
						</div>
					</el-row>
					<el-table 
					empty-text="暂无消息" 
					:data="messages" 
					v-loading="tableLoading" 
					@selection-change="handleSelectionChange" 
					style="width:100%; margin-top:10px;">
						<el-table-column 
						type="selection" 
						width="50px" />
						<el-table-column 
						:show-overflow-tooltip="true" 
						width="80px">
							<template #default="scope">
								<img :src="scope.row.faceImg" class="u-face" />
							</template>
						</el-table-column>
						<el-table-column width="100px" :show-overflow-tooltip="true" prop="type" label="消息类型" />
						<el-table-column prop="message" label="消息内容" />
					</el-table>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<div class="ga-small-padding">
				<el-pagination 
				v-model:currentPage="pageNumber"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageCount" 
				@size-change="pageChange" 
				:hide-on-single-page="false" 
				@current-change="pageChange"></el-pagination>
			</div>
		</template>
	</ga-page>
</template>
<script>
import request from "@gvaJS/request";
export default{
	data() {
		return {
			// 选项标签
			tabs       : ['全部消息','未读消息', '已读消息'],
			tabIndex   : '全部消息',
			// 页码
			pageNumber : 1,
			// 数据总数
			pageCount  : -1,
			// 每页展示数
			pageSize   : 10,
			// 消息数据
			messages   : [],
			// 选中数据
			selectedData : [],
			//
			tableLoading : true
		}
	},
	methods:{
		// 获取数据
		getData : function(){
			this.tableLoading = true;
			// 切换分类时清空数据
			this.messages = [];
			// 模拟 api 请求
			// 如 : 请求 url http://www.**.com/messages/?type=类型&page=页码
			var url = 'http://www.**.com/messages/?type='+this.tabIndex+'&page='+this.pageNumber+'&pageSize='+this.pageSize;	
			request.postSimulate(
				'messages',
				{},
				(res)=>{
					this.pageCount    = res.count;
					this.messages     = res.messageList;
					this.tableLoading = false;
				}
			)
		},
		// 选中
		handleSelectionChange : function(e){
			this.selectedData = e;
		},
		// 切换选项
		tabClick : function (e) {
			this.tabIndex = this.tabs[e.index];
		},
		// 每页展示数量切换
		pageChange : function (pageSize){
			console.log(pageSize);
			this.pageSize = pageSize;
			this.getData();
		},
		// 批量删除方法
		batchDelete : function(){
			ElMessage({message:'请观察控制台', type:'success'});
			console.log('选中的数据 : ' , this.selectedData);
		},
		// 标记已读
		readed : function(){
			ElMessage({message:'请观察控制台', type:'success'});
			console.log('选中的数据 : ' , this.selectedData);
		},
	},
	mounted:function(){
		this.getData();
	},
	watch:{
		// 切换选项时重新读取数据
		tabIndex:function(){
			this.pageNumber = 1;
			this.getData();
		}
	}
}
</script>
<style scoped>
.u-face{width:38px; height:38px; border-radius:50%;}
</style>