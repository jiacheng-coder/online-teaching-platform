import axios  from 'axios';
import md5    from 'js-md5';
import qs     from 'qs';
import config from '~/config';


// 请求基础路径
axios.defaults.baseURL = config.request.apiBaseUrl;

let request = {

    // 请求超时时间
    timeout       : config.request.timeout,
	
	// 请求基础函数
	__base : async function(url, data, headerData, method){
		method = method.toLowerCase();
		// 基础 token 
		var tokenObj = await config.request.initTokenSync();
		if(tokenObj.errcode != 0){
			return tokenObj;
		}
		if(!headerData){headerData = false;}
		// 初始化头部数据
		let headers ={}
		headers[config.request.tokenName[0]] = tokenObj.token;
		headers[config.request.tokenName[1]] = config.request.initUserToken(url);
		headers['content-type'] = 'application/x-www-form-urlencoded';
		if(data){
			headers.sign   = this.__sign(data);
		}
		if(headerData && headerData instanceof Object){
			for(var k in headerData){
				headerDataReturn[k] = headerData[k];
			}
		}
		// 读取语言
		var languageType = sessionStorage.getItem("languageType")
		if(languageType == ""){
			languageType = "zh"
		}
		headers["Accept-Language"] = languageType;
		
		let configIN = {
			method  : method,
			url     : url,
			timeout : this.timeout,
			headers : headers
		};
		if(method == "get"){
			if(data && data instanceof Object){
				configIN.params = data;
			}
		}else{
			if(data && data instanceof Object){
				configIN.data = qs.stringify(data);
			}
		}
		return await axios(configIN).then((res)=>{
			this.__log(res.data);
			return res.data;
		}).catch((e)=>{
			console.log(e)
			return {errcode:400400, error : "请求失败"};
		})
	},
	
	// post 请求
    post : async function(url, data, headerData){
		if(!data){data = false;}
		if(!headerData){headerData = false;}
		return await this.__base(url, data, headerData, 'post');
    },
	// get 请求
	get : async function(url, data, headerData){
		if(!data){data = false;}
		if(!headerData){headerData = false;}
		return await this.__base(url, data, headerData, 'get');
	},
	// put 请求
	put : async function(url, data, headerData){
		if(!data){data = false;}
		if(!headerData){headerData = false;}
		return await this.__base(url, data, headerData, 'put');
	},
	// delete 请求
	delete : async function(url, headerData){
		if(!headerData){headerData = false;}
		return await this.__base(url, false, headerData, 'delete');
	}, 
	
	// 数据签名
	__sign : function (data){
		var vals       = [];
		Object.keys(data).sort().map((key) => {vals.push(data[key]);});
		vals.push(config.request.requrestKey);
		return md5.hex(vals.join('-'));
	},
	
	// 控制台日志
	__log : function(log){
		if(config.runMode != 'dev'){return false;}
		console.log(log);
	},
	
};
export default request;
