<template>
	<ga-page size="small">
		<template 
		v-slot:headerLeft>
			<el-button plain class="ga-page-h1" @click="goBack">
				<el-icon><back /></el-icon>
		        <span>会员详情</span>
			</el-button>
		</template>
		<template v-slot:body>
			<div 
			class="ga-data-body" 
			v-loading="fullPageLoading">
				<el-row 
				align="middle">
					<div style="padding-right:12px;">
						<el-avatar 
						:size="60" 
						:src="detailData.u_face" />
					</div>
					<div 
					style="margin-top:-5px;">
						<el-row 
						align="middle">
							<span 
							class="ga-text ga-font-22">{{detailData.u_nickname}}</span>
						</el-row>
						<div class="ga-text-secondary ga-font-14" style="margin-top:8px;">
							{{detailData.manager_username}}
							<el-tag class="ml-2" type="info" style="margin-left:12px;">uid : {{detailData.u_id}}</el-tag>
						</div>
					</div>
				</el-row>
			</div>
			<div 
			style="margin-top:35px; padding:20px 0;"
			class="ga-bg-white ga-box-shadow ga-common-border-radius ga-detail-body">
				<table class="ga-table" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="100" class="ga-table-label">会员账户</td>
						<td>
							{{detailData.u_username}}
						</td>
					</tr>
					<tr>
						<td width="100" class="ga-table-label">注册邮箱</td>
						<td>
							{{detailData.u_email}}
						</td>
					</tr>
					<tr>
						<td class="ga-table-label">会员级别</td>
						<td>
							<div>
								<div style="margin-top:8px;">
									<el-rate :model-value="detailData.u_level" disabled size="small" />
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="ga-table-label">会员积分</td>
						<td>
							<div>
								{{detailData.u_integral}}
							</div>
						</td>
					</tr>
					<tr>
						<td class="ga-table-label">注册时间</td>
						<td>{{detailData.u_regtime}}</td>
					</tr>
					<tr>
						<td class="ga-table-label">登录时间</td>
						<td>{{detailData.u_logintime}}</td>
					</tr>
					<tr>
						<td class="ga-table-label">登录地址</td>
						<td>{{detailData.u_ip}}</td>
					</tr>
					<tr>
						<td class="ga-table-label">会员状态</td>
						<td>
							<el-switch 
							active-value="1" 
							inactive-value="0" 
							v-model="detailData.u_status" />
						</td>
					</tr>
					<tr>
						<td class="ga-table-label">客户标签</td>
						<td>
							<el-tag class="tags">好客户</el-tag>
							<el-tag class="tags" type="success">电子产品</el-tag>
							<el-tag class="tags" type="danger">需要跟进</el-tag>
							<el-tag class="tags" type="warning">青年才俊</el-tag>
						</td>
					</tr>
				</table>
			</div>
		</template>
	</ga-page>
</template>
<script setup>
import { Back, Edit } from '@element-plus/icons-vue';
import { useRouter }  from "vue-router";
import request        from '@gvaJS/request';

const faceImg          = ref(null);
const fullPageLoading  = ref(true);
const router           = useRouter();
const detailData       = ref({});
const gaFaceCropper    = ref(null);
const receiveMessages  = ref(true);

const goBack           = function(){
	router.push({path:"/Members/Index"});
}

// 加载
onMounted(()=>{
	// 模拟 api 请求加载用户信息
	request.postSimulate(
		'members',
		{},
		(res)=>{
			detailData.value = res.detail;
		},
		(error) => {
			console.log(error);
		},
		()=>{
			fullPageLoading.value = false;
		}
	);
});
</script>
<style scoped>
.tags{margin:3px 8px 3px 0;}
</style>