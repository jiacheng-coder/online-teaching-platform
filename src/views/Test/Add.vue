<template>
	<ga-page>
		<template v-slot:header>
			<div class="ga-detail-body">
				<div style="font-size:1.6rem; color:var(--el-text-color-primary);">
					编辑器演示
				</div>
			</div>
		</template>
		<template v-slot:body>
			<div class="ga-detail-body ga-bg-white ga-padding">
				<ga-wang-editor ref="editor" :defaultHtml="content"></ga-wang-editor>
			</div>
		</template>
		<template v-slot:footer>
			<div style="padding:10px 0; text-align:right;" class="ga-bg-white ga-detail-body">
				<el-button type="primary" @click="submit">获取编辑器内容</el-button>
			</div>
		</template>
	</ga-page>
</template>

<script>
export default {
	data() {
		return {
			content: ''
		}
	},
	methods: {
		submit: function () {
			console.log(this.$refs.editor.getContent());
		}
	}
}
</script>
