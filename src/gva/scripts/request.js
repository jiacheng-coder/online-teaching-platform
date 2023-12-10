import axios  from 'axios';
import md5    from 'js-md5';
import qs     from 'qs';
import config from '~/config';

// 请求基础路径
axios.defaults.baseURL = config.request.apiBaseUrl;

let request = {

    // 请求超时时间
    timeout       : config.request.timeout,
	
	// 初始化头部数据
	__initHeaders : function (headerData, url) {
		// headerData 对象检查
		let headerDataReturn = {};
		headerDataReturn[config.request.tokenName[0]] = config.request.initToken();
		headerDataReturn[config.request.tokenName[1]] = config.request.initUserToken(url);
		if(headerData && headerData instanceof Object){
			for(var k in headerData){
				headerDataReturn[k] = headerData[k];
			}
		}
		return headerDataReturn;
	},
	
    // get 请求
    get      : function(url, success, errorCallback, complete, headerData){
		if(!headerData){headerData = false;}
        let configIN = {
            method  : 'get',
            url     : url,
            timeout : config.request.timeout,
            headers : this.__initHeaders(headerData, url)
        }; 
        if(!success){success = (res)=>{}}
        if(!errorCallback){errorCallback = (res)=>{}}
        if(!complete){complete = ()=>{}}
        axios(configIN).then((response)=>{
            if(typeof(response.data) == 'string'){
                ElMessage.error('服务器忙，请重试 [ 10001 ]');
                errorCallback(response.data);
                return ;
            }
            complete();
			this.__log(response.data);
            success(response.data);
        }).catch((error)=>{
            console.log(error.data);
            complete();
            errorCallback(error);
        });
    },
	
	// 请求基础函数
	__base : function(url, data, success, errorCallback, complete, headerData, method){
		if(!headerData){headerData = false;}
		let headers    = this.__initHeaders(headerData, url);
		headers.sign   = this.__sign(data);
		headers['content-type'] = 'application/x-www-form-urlencoded';
		let configIN = {
		    method  : method,
		    url     : url,
		    data    : qs.stringify(data),
		    timeout : this.timeout,
		    headers : headers
		}; 
		if(!success){success = (res)=>{}}
		if(!errorCallback){errorCallback = (res)=>{}}
		if(!complete){complete = ()=>{}}
		axios(configIN).then((response)=>{
		    if(typeof(response.data) == 'string'){
		        ElMessage.error('服务器忙，请重试 [ 10001 ]');
		        errorCallback(response.data);
		        return ;
		    }
			this.__log(response.data);
		    success(response.data);
		    complete();
		}).catch((error)=>{
		    console.log(error);
		    complete();
		    ElMessage.error('服务器忙，请重试 [ 10002 ]');
		    errorCallback(error);
		});
	},
	
	// post 请求
    post : function(url, data, success, errorCallback, complete, headerData){
		this.__base(url, data, success, errorCallback, complete, headerData, 'post');
    },
	
	// put 请求
	put : function(url, data, success, errorCallback, complete, headerData){
		this.__base(url, data, success, errorCallback, complete, headerData, 'put');
	},
	
	// delete 请求
	delete : function(url, data, success, errorCallback, complete, headerData){
		this.__base(url, data, success, errorCallback, complete, headerData, 'delete');
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
	
	// 模拟请求
	postSimulate : function (url, data, success, errorCallback, complete) {
		if(url == 'test'){
			setTimeout(()=>{
				success({status:true, data:'ok'});
				if(complete){complete();}
			}, 500);
			return ;
		}
		let dataFile = "../../demoData/"+url+".js";
		import(/* @vite-ignore */dataFile).then((data)=>{
			setTimeout(()=>{
				success(data.default);
				if(complete){complete();}
			}, 500);
		});
	}
};
export default request;
