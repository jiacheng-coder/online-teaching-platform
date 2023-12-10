<template>
	<ga-page size="small">
		<template v-slot:headerLeft>
			<el-button class="ga-page-h1" plain @click="goBack">
				<el-icon>
					<back />
				</el-icon><span>{{ type == 'add' ? '添加文章' : '编辑文章' }}</span>
			</el-button>
		</template>
		<template v-slot:body>
			<el-form class="ga-data-body ga-box-shadow ga-common-border-radius">
				<el-form-item label="文章分类" :label-width="formLabelWidth">
					<el-cascader v-model="formData.article_cate" :options="articleClasses" />
				</el-form-item>
				<el-form-item label="文章标题" :label-width="formLabelWidth">
					<el-input type="input" autocomplete="off" v-model="formData.article_title"></el-input>
				</el-form-item>
				<el-form-item label="文章内容" :label-width="formLabelWidth">
					<ga-wang-editor ref="editor"></ga-wang-editor>
				</el-form-item>
				<el-form-item label="关键字" :label-width="formLabelWidth">
					<el-input type="input" autocomplete="off" v-model="formData.article_keywords"></el-input>
				</el-form-item>
				<el-form-item label="文章描述" :label-width="formLabelWidth">
					<el-input type="textarea" :autosize="{ minRows: 2 }" autocomplete="off"
						v-model="formData.article_description"></el-input>
				</el-form-item>
				<el-form-item label="查看次数" :label-width="formLabelWidth">
					<el-input type="input" autocomplete="off" v-model="formData.article_view_number"></el-input>
				</el-form-item>
				<el-form-item label="文章状态" :label-width="formLabelWidth">
					<el-switch v-model="formData.article_status" active-value="1" inactive-value="2" inline-prompt></el-switch>
				</el-form-item>
				<el-form-item label="是否精选" :label-width="formLabelWidth">
					<el-switch v-model="formData.article_picked" active-value="1" inactive-value="2" inline-prompt></el-switch>
				</el-form-item>
			</el-form>
		</template>
		<template v-slot:footer>
			<el-row class="ga-small-padding" justify="end">
				<el-button type="primary" @click="submit" :loading="loading" :disabled="loading">
					<el-icon>
						<document />
					</el-icon>&nbsp;&nbsp;提交
				</el-button>
			</el-row>
		</template>
	</ga-page>
</template>
<script>
import { Document, ArrowDown, Back } from '@element-plus/icons-vue';
import validater from '@gvaJS/validate';
import request from '@gvaJS/request';
import commonSubmitPage from "@gvaJS/commonSubmitPage";
export default {
	components: { Document, ArrowDown, Back },
	mixins: [commonSubmitPage],
	data() {
		return {
			formLabelWidth: 88,
			initFormData: {
				"article_cate": 0,
				"article_title": "",
				"article_keywords": "",
				"article_description": "",
				"article_content": "",
				"article_status": "1",
				"article_picked": "2",
				"article_view_number": 0
			},
			routeQuery: null,
			// 分类数据 
			// 实际项目可以从 api 接口获取
			articleClasses: [
				{
					value: 0,
					label: "请选择分类"
				},
				{
					value: '1000',
					label: '新闻',
					children: [
						{
							value: 1001,
							label: '要闻',
						},
						{
							value: 1002,
							label: '军事',
						},
						{
							value: 1003,
							label: '科技',
						},
						{
							value: 1004,
							label: '旅行',
						},
					],
				},
				{
					value: '2000',
					label: '产品',
					children: [

					],
				}
			]
		};
	},
	mounted: function () {
		this.routeQuery = this.$route.query;
		// 编辑模式
		if (this.routeQuery.id) {
			this.type = 'edit';
			// 读取文章默认
			// 模拟 api 读取文章详情
			request.postSimulate(
				'articleInfo',
				{ id: this.routeQuery.id },
				(res) => {
					// 初始化表单默认值
					this.__initFromData(res.data);
					// 编辑器默认值
					this.$nextTick(() => {
						this.$refs.editor.setHtml(res.data.article_content);
					})
				},
				(error) => { },
				() => {
					this.loading = false;
				}
			);
		} else {
			this.__initFromData();
			this.type = 'add';
			this.loading = false;
		}
	},
	methods: {
		// 提交
		submit: function () {
			// 编辑器内容获取
			this.formData.article_content = this.$refs.editor.getContent();
			// 数据验证
			// let rule = [
			// 	{name:"article_cate", checkType : "notSame", checkRule:"0", errorMsg:"请选择分类"},
			// 	{name:"article_title", checkType : "string", checkRule:"1,200", errorMsg:"请正确输入文章标题"},
			// 	{name:"article_keywords", checkType : "string", checkRule:"1,200", errorMsg:"请正确输入关键字"},
			// 	{name:"article_description", checkType : "string", checkRule:"1,200", errorMsg:"请正确输入文章描述"},
			// 	{name:"article_view_number", checkType : "int", checkRule:"1,11", errorMsg:"请正确输入文章查看次数"},
			// ];
			// var checkRes = validater.check(this.formData, rule);
			// if(!checkRes){
			// 	ElMessage({
			// 		message: validater.error, 
			// 		type: 'error',
			// 	});
			// 	return ;
			// }
			// 其他自定义验证代码

			this.loading = true;
			// 提交 POST 请求， [ 编辑和添加 url 不同 url 为一个例子 ]
			let url = this.mainType == 'add' ? 'articles/add' : 'articles/edit/id/' + this.routeQuery.id;
			// 模拟
			console.log(this.formData);
			request.postSimulate(
				'test',
				this.formData,
				(res) => {
					if (res.status) {
						ElNotification({ title: '操作成功', message: '提交成功！', type: 'success', });
						setTimeout(() => {
							this.goBack();
						}, 500);
					} else {
						ElNotification({ title: '操作失败', message: res.data, type: 'error' });
						console.log(res);
					}
				},
				(error) => { },
				() => {
					setTimeout(() => {
						this.loading = false;
					}, 500);
				}
			);
		},
		goBack: function () {
			this.$router.push({ path: "/Articles/Index" });
		}
	}
}
</script>
