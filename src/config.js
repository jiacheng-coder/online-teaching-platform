import md5    from 'js-md5';
let config = {
	
	// 系统版本 
	gvaVersion              : '1.0.1',
	
	// 运行模式
	// dev    : 开发模式 [ 开启控制台日志 ]
	// build  : 生成模式 [ 关闭控制台日志 ]
	runMode                 : 'dev',
	
	// 用户登录相关
	sessionNames            : {
		userTokenName       : 'GVAUserToken',
		userName            : 'GVAUserName',
		userFace            : 'GVAUserFace',
		userAuthentications : 'GVAuthentications'
	},
	
	// 请求相关配置
	request                 : {
		// 请求超时时间，默认 30秒
		timeout                 : 30000,
		// 令牌名称
		tokenName               : [
			'token',     // 基础请求令牌名称
			'userToken'  // 用户令牌名称
		],
		// api 请求基础秘钥
		requrestKey             : '******',
		// api 请求基础 url，不能使用 / 结尾
		apiBaseUrl              : 'http://localhost',
		// 图片上传接口
		imageUploadApiUrl       : 'http://localhost/managementApi/uploadFiles/image',
		// 初始化基础 token 函数
		initToken               : function(){
			let timestamp = Date.parse(new Date()).toString();
			timestamp = timestamp + '';
			timestamp = timestamp.substring(0, timestamp.length - 5);
			return md5.hex(timestamp + this.requrestKey);
		},
		// 初始化基础 token 函数同步模式
		initTokenSync           : async function(){
			let timestamp = Date.parse(new Date()).toString();
			timestamp = timestamp + '';
			timestamp = timestamp.substring(0, timestamp.length - 5);
			return {errcode:0, token:md5.hex(timestamp + this.requrestKey)};
		},
		// 初始化用户 token 函数
		initUserToken    : (url)=>{
		    var urlArray = url.split('/');
		    if(urlArray[1] == 'login'){return 'no';}
		    var userToken = sessionStorage.getItem(config.sessionNames.userTokenName);
		    if(userToken == null || userToken == ''){
		        ElMessage.error('会话数据过期，请重新登录。');
		        return '';
		    }
		    return userToken;
		}
	},
	
	
	// 路由拦截状态 off 关闭 on 开启
	routeInterceptionStatus : 'on',
	
	// 路由拦截方法
	routeInterception       : function(to, from){
		if(to.fullPath == '/'){return true;}
		if(this.routeInterceptionStatus == 'off'){
			return true;
		}
		// 以下为路由检查权限及拦截代码
		if(sessionStorage.getItem(config.sessionNames.userTokenName) == null){
		    return false;
		}
		const authentications = JSON.parse(sessionStorage.getItem(
			config.sessionNames.userAuthentications
		));
		if(authentications == null){return false;}
		var pathArray = to.path.split('/');
		if(!authentications[pathArray[1]]){return false;}
		if(!authentications[pathArray[1]][pathArray[2]]){
		    return false;
		}
		return true;
	}
	
}

export default config;
