<template>
    <ga-page>
		<template 
		v-slot:headerLeft>
			<div class="ga-page-h1">
				{{timeHello}} ~
			</div>
		</template>
        <template 
		v-slot:body>
			<div class="system-banner">
				<el-row align="middle">
					<div style="width:180px;">
						<img style="width:100%;" src="/src/assets/indexBanner.png" />
					</div>
					<div style="margin-left:30px;">
						<p style="font-size:1.5em; color:#FFFFFF;">
							欢迎使用 Grace Vue Admin
						</p>
						<p 
						style="font-size:15px; line-height:1.5em; color:#FFFFFF; margin-top:8px;">
							Grace Vue Admin 是一款基于 vue3 及 Element Plus 的后台开发脚手架
						</p>
						<div style="margin-top:15px;">
							<a href="https://www.lesscode.work/sections/622800946ba41.html" 
							target="_blank" 
							style="color:#FFFFFF; background-color:rgb(16, 185, 129);" 
							class="ga-link-button ga-icon">访问官网 &#xea66;</a>
						</div>
					</div>
				</el-row>
			</div>
			<div style="margin-top:35px;">
				<el-row 
				:gutter="40" 
				justify="space-between">
					<!-- 图表展示 -->
					<el-col 
					class="ga-block" 
					style="padding:15px;"
					:sm="24" :md="12">
						<el-row 
						id="chat1" 
						style="width:100%; height:300px;"></el-row>
						<ga-divider height="10px"></ga-divider>
						<div 
						class="ga-font-15 ga-text-center" 
						style="margin-top:18px; margin-bottom:10px;">
							Apachr Echarts 使用展示&nbsp;&nbsp;
							<a 
							class="ga-link" 
							style="color:rgb(16, 185, 129);"
							target="_blank" 
							href="https://www.lesscode.work/sections/62392e784a473.html">
								点击这里查看使用说明
							</a>
						</div>
					</el-col>
					<!-- 消息列表 -->
					<el-col :sm="24" :md="12">
						<div 
						class="hidden-md-and-up" 
						style="width:100%; height:30px;"></div>
						<div 
						class="ga-block" 
						style="padding:20px; width:100%;">
							<el-row justify="space-between">
								<div class="ga-font-18 ga-text">最新消息</div>
								<div 
								@click="gotoMessagePage" 
								class="ga-font-14 ga-text-secondary ga-icon ga-as-click">
									查看全部 &#xea66;
								</div>
							</el-row>
							<el-table
							empty-text="暂无消息" 
							:data="messages" 
							style="width:100%; margin-top:10px;">
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
					</el-col>
				</el-row>
			</div>
        </template>
		<template
		v-slot:footer>
			<div class="ga-color-gray ga-font-13 ga-text-center" 
			style="padding:12px;">
				copyRight &copy; 2022 www.***.com
			</div>
		</template>
    </ga-page>
</template>
<script setup>
import tool         from "@gvaJS/tool";
import indexChart   from '@demoData/indexChart';
import request      from "@gvaJS/request";
// 欢迎信息
const timeHello  = ref(tool.timeHello());
// 消息数据
const messages   = ref([]);
// 路由对象
const router     = useRouter();
// 图表对象
let myChart      = null;
// 挂载
onMounted(()=>{
	// 绘制图表
	setTimeout(()=>{
		myChart = indexChart.showCharts(myChart);
	}, 500);
	// 模拟消息数据读取
	request.postSimulate(
		'messages',
		{},
		(res)=>{
			messages.value = res.indexMessages
		}
	);
});
// 卸载
onUnmounted(()=>{
	myChart.clear();
});

// 跳转到消息中心
const gotoMessagePage = ()=>{
	router.push('/Messages/Index');
}
</script>
<style scoped>
.system-banner{
    border-radius:8px;
    box-shadow:rgb(100 116 139 / 6%) 0px 1px 1px;
    background-image: none;
    overflow: hidden;
    -webkit-box-align: center;
    align-items: center;
    background-color:#5058E5;
    padding:20px;
}
.u-face{width:35px; height:35px; border-radius:50%;}
</style>