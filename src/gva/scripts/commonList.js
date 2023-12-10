import config  from "~/config";
export default({
    data() {
        return {
			// 单元格高度
			tdHeight            : 55,
            // 为空文本
            emptyText           : '数据加载中 ...',
            // 表格数据
            tableData           : [],
            tableLoading        : true,
            // 数据总数
            tableDataTotal      : -1,
            // 每页展示数量列表
            pageSizes           : [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 50, 100, 200, 300, 500],
            // 每页展示数量
            pageSize            : 0,
            // 当前页码
            currentPageNumber   : 1,
			// 权限数据
			authorities         : null,
			// 核心模型名称
			apiModelName        : '',
			/* api 请求地址, 如 { 
                add    : '/managerRoles/add',
                edit   : '/managerRoles/edit',
                detail : '/managerRoles/detail'
            }*/
			apiURL              : '',
			// 数据主键
			primaryKey          : '',
			// 搜索关键字
			searchKwd           : ''
        }
    },
	watch:{
		pageSize : function(val, oVal){
			this.getData();
		}
	},
    methods: {
		// 获取数据总数
		getTotal       : function(){},
		// 获取数据
		getData        : function(){},
		// 每页展示数量切换
        pageSizeChange : function(pgSize){
            this.pageSize = pgSize;
        },
		// 页码切换
        pageCurrentChange :function (currentPage){
            this.currentPageNumber = currentPage;
            this.getData();
        },
		// 打开添加或编辑弹窗
        openSubmit :function(){
            this.$refs.submitPage.open('add');
        },
		// 打开添加或编辑窗口 [ 页面模式 ]
		openSubmitPage : function(){
			this.$router.push({ 
				path: '/'+this.ucFirst(this.apiModelName)+'/Add'
			});
		},
        // 根据页面高度计算每页合理的展示数
        pageInit : function(height){
            var pageSize = height / this.tdHeight;
            pageSize = parseInt(pageSize);
            if(pageSize < 10){pageSize = 10;}
            this.pageSize = pageSize;
        },
		// 时间戳转日期
		toDate : function(timeStamp){
			timeStamp = parseInt(timeStamp);
			var date = new Date();
			if(timeStamp < 90000000000 ){
				date.setTime(timeStamp * 1000);
			}else{
				date.setTime(timeStamp );
			}
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? ('0' + minute) : minute;
			second = second < 10 ? ('0' + second) : second;
			return y + '-' + m + '-' + d + ' '+ h +':' + minute + ':' + second;
		},
		// 权限检查
		checkAuthority : function(method){
			if(this.authorities == null){
				this.authorities = JSON.parse(
					sessionStorage.getItem(
						config.sessionNames.userAuthentications
					)
				);
			}
			var modelName = this.apiModelName;
			modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
			if(!this.authorities[modelName]){return false;}
			method = method.charAt(0).toUpperCase() + method.slice(1);
			if(
				!this.authorities[modelName][method]
				 || 
				this.authorities[modelName][method] != 1
			){return false;}
			return true;
		},
		// 刷新数据
		refreshData : function(){
			this.getData();
		},
		// 弹窗提交数据成功
		submitSuccess : function(){
			this.currentPageNumber = 1;
			this.getTotal();
		} 
    }
});