export default({
    data() {
        return {
			// 表单标签宽度
			formLabelWidth  : '80px',
			// 窗口操作类型
			type            : 'add',
			// 按钮 loading
			loading         : true,
			// 表单数据
			formData        : {},
        }
    },
    methods: {
        // 展示错误
        showError : function(error){
			ElMessage({
			    message : error,
			    type    : 'error',
			});
            return false;
        },
		// 返回上一页
		goBack : function(){
			this.$router.go(-1);
		},
		// 提交成功并返回上一页
		submitSuccess : function(){
			setTimeout(()=>{
				this.goBack();
			}, 1000);
		},
		// 初始化表单数据默认值
		__initFromData : function (data) {
			if(data){
				if(this.initFormData){
					for(var k in this.initFormData){
						this.formData[k] = data[k];
					}
				}
			}else{
				if(this.initFormData){
					var initFormData = JSON.stringify(this.initFormData);
					this.formData    = JSON.parse(initFormData);
				}
			}
		}
    }
});