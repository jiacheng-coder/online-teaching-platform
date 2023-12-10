import request from './request';
export default({
    data() {
        return {
			formLabelWidth  : '80px',
            // 宽度
            dialogWidth     : '50%',
            // 高度
            dialogHeight    : 200,
            // 延迟对象
            dialogTimer     : null,
            // 控制窗口开关
            dialogShow      : false,
            // 窗口操作类型
            type            : 'add',
            // 按钮 loading
            buttonLoading   : false,
            // loading
            fullPageLoading : false,
            // 编辑时传递过来的数据
            rowData         : [],
			// 表单数据
			formData        : {},
        }
    },
    methods: {
        // 打开窗口
        open:function(type, row){
			if(row){this.rowData = row;}
            this.buttonLoading = false;
            this.type = type ? type : 'add';
            this.dialogShow = true;
			this.initSubmitBody();
			if(this.type == 'add'){
				if(this.initFormData){
					var initFormData = JSON.stringify(this.initFormData);
					this.formData    = JSON.parse(initFormData);
					this.$nextTick(()=>{
						if(this.onOpen){
							this.onOpen();
						}
					});
				}
			}else{
				if(this.onOpen){this.onOpen();}
			}			
        },
		// 关闭窗口
        close : function(){
            this.dialogShow = false;
        },
        // 展示错误
        showError : function(error){
			ElMessage({
			    message : error,
			    type    : 'error',
			});
            return false;
        },
		// 初始化提交窗口
		initSubmitBody : function(){
		    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
		    var winWidth  = document.documentElement.clientWidth || document.body.clientWidth;
		    if(winWidth < 500){
		        this.dialogHeight = winHeight * 0.55;
		        this.dialogWidth  = winWidth * 0.95;
		    }else if(winWidth < 1000){
		        this.dialogHeight = winHeight * 0.6;
		        this.dialogWidth  = winWidth * 0.88;
		    }else if(winWidth < 1500){
		        this.dialogHeight = winHeight * 0.55;
		        this.dialogWidth  = winWidth * 0.65;
		    }else if(winWidth < 2000){
		        this.dialogHeight = winHeight * 0.5;
		        this.dialogWidth  = winWidth * 0.6;
		    }else if(winWidth < 3000){
		        this.dialogHeight = winHeight * 0.5;
		        this.dialogWidth  = winWidth * 0.5;
		    }else{
		        this.dialogHeight = winHeight * 0.5;
		        this.dialogWidth  = winWidth * 0.4;
		    }
		}
    }
});