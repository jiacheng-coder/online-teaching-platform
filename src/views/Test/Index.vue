<template>
	<ga-page>
		<template v-slot:headerLeft>
			<div style="font-size:1.8em; color:var(--el-text-color-primary);">
				左侧标题
			</div>
		</template>
		<template v-slot:headerRight>
			<div style="font-size:1.2em;" class="ga-color-gray">
				<el-icon>
					<aim />
				</el-icon>
				左侧功能
			</div>
		</template>
		<template v-slot:body>
			<div class="system-banner">
				<el-row align="middle">
					<div style="width:180px;">
						<img style="width:100%;"
							src="https://staticfilesali.oss-accelerate.aliyuncs.com/static/images/2021/banner.png" />
					</div>
					<div style="margin-left:30px;">
						<p style="font-size:1.66em; color:#FFFFFF;">
							欢迎使用 Grace Vue Admin
						</p>
						<p style="font-size:15px; line-height:2em; color:#FFFFFF; margin-top:12px;">
							Grace Vue Admin 是一款基于 vue3 及 Element Plus 的后台开发脚手架
						</p>
						<div style="margin-top:15px;">
							<a href="https://www.lesscode.work/sections/622800946ba41.html" target="_blank"
								style="color:#FFFFFF; background-color:rgb(16, 185, 129);" class="ga-link-button ga-icon">访问官网 </a>
						</div>
					</div>
				</el-row>
			</div>
			<div style="margin-top:35px;">
				其他内容 ...
			</div>
		</template>
		<template v-slot:footer>
			<div style="font-size:1.2rem; text-align:center; padding:10px 0;" class="ga-color-gray">
				底部布局...
			</div>
		</template>
	</ga-page>
</template>

<script setup>
import { Aim } from '@element-plus/icons-vue';
</script>

<style scoped>
.system-banner {
	border-radius: 8px;
	box-shadow: rgb(100 116 139 / 6%) 0px 1px 1px;
	background-image: none;
	overflow: hidden;
	-webkit-box-align: center;
	align-items: center;
	background-color: #5058E5;
	padding: 25px;
	margin-top: 10px;
}
</style>
