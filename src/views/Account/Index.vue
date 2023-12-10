<template>
	<ga-page size="small">
		<template 
		v-slot:headerLeft>
			<el-button plain class="ga-page-h1" @click="goBack">
				<el-icon><back /></el-icon>
		        <span>账户信息</span>
			</el-button>
		</template>
		<template v-slot:body>
			<ga-cropper 
			ref="gaFaceCropper" 
			:img="faceImg" 
			@onSave="saveImg"></ga-cropper>
			<div 
			class="ga-data-body" 
			v-loading="fullPageLoading">
				<el-row 
				align="middle">
					<div style="padding-right:12px;">
						<el-avatar 
						:size="60" 
						:src="detailData.manager_face" />
					</div>
					<div 
					style="margin-top:-5px;">
						<el-row 
						align="middle">
							<span 
							class="ga-text ga-font-22">{{detailData.manager_nickname}}</span>
							<div style="width:20px;"></div>
							<el-upload 
							ref="uploadRef" 
							class="ga-text-secondary ga-font-14" 
							action="#" 
							:show-file-list="false" 
							:limit="1" 
							accept="image/*" 
							:on-change="faceChange" 
							:auto-upload="false">
							    <template #trigger>
									<span class="ga-as-click ga-font-13">修改头像</span>
							    </template>
							    <span></span>
							  </el-upload>
						</el-row>
						<div class="ga-text-secondary ga-font-14" style="margin-top:8px;">
							{{detailData.manager_username}}
							<el-tag class="ml-2" type="info" style="margin-left:12px;">uid : {{detailData.manager_id}}</el-tag>
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
							{{detailData.manager_username}}
						</td>
					</tr>
					<tr>
						<td class="ga-table-label">会员角色</td>
						<td>
							<div>
								{{detailData.role_name}}
							</div>
						</td>
					</tr>
					<tr>
						<td class="ga-table-label">登录时间</td>
						<td>{{detailData.login_time}}</td>
					</tr>
					<tr>
						<td class="ga-table-label">登录地址</td>
						<td>{{detailData.manager_ip}}</td>
					</tr>
					<tr>
						<td class="ga-table-label">接收消息</td>
						<td>
							<el-switch v-model="receiveMessages" />
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
import config         from '~/config';

const faceImg          = ref(null);
const fullPageLoading  = ref(true);
const router           = useRouter();
const detailData       = ref({});
const gaFaceCropper    = ref(null);
const uploadRef        = ref();
const store            = useStore();
const receiveMessages  = ref(true);

const goBack           = function(){
	router.push({path:"/System/Index"});
}

// 加载
onMounted(()=>{
	// 模拟 api 请求加载用户信息
	request.postSimulate(
		'account',
		{},
		(res)=>{
			detailData.value = res.data;
			faceImg.value    = res.data.manager_face;
		},
		(error) => {
			console.log(error);
		},
		()=>{
			fullPageLoading.value = false;
		}
	);
});

const faceChange = (uploadFile, uploadFiles) => {
	let reader     = new FileReader();
	reader.readAsDataURL(uploadFile.raw);
	reader.onload  = ()=>{
		faceImg.value = reader.result;
		gaFaceCropper.value.open();
		uploadRef.value.clearFiles();
	}
}

// 保存头像
const saveImg = (data)=>{
	console.log(data);
	const loadingInstance = ElLoading.service({ fullscreen: true });
	// 提交给后端保存
	// 模拟 api 
	request.postSimulate(
		'test',
		{face:data},
		(res)=>{
			/*
			后端返回新的头像地址，此处保存、更新
			store.commit('setUserFace', res.data);
			sessionStorage.setItem(
				config.sessionNames.userFace, 
				res.data
			);
			*/
			ElMessage({
				message: '头像更换成功', 
				type: 'success',
			});
		},
		(error)=>{console.log(error);},
		()=>{loadingInstance.close();}
	);
}
</script>
<style scoped>
</style>