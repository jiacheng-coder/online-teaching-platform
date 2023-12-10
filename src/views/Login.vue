<template>
    <el-row 
	justify="center" 
	align="middle" 
	style="height:100vh; background:rgb(249, 250, 252);">
        <div id="login-body">
			<form>
				<div id="logo">
					<img src="../assets/logo-login.png" />
				</div>
				<div style="margin-top:10px;">
					<ga-input 
					label="登录账号" 
					placeholder="登录账号" 
					:error="error.username" 
					v-model="formData.username"></ga-input>
				</div>
				<div style="margin-top:28px;">
					<ga-input 
					type="password" 
					placeholder="登录密码" 
					:error="error.password" 
					v-model="formData.password" 
					label="登录密码" 
					@keyupEnter="submit"></ga-input>
				</div>
				<div style="padding-top:15px;">
					<el-alert 
					:show-icon="true" 
					:closable="false" 
					:center="true" 
					v-if="msg.type != ''"
					:title="msg.message" 
					:type="msg.type"></el-alert>
				</div>
				<div style="margin-top:15px;">
					<el-button 
					style="width:100%;"
					type="primary" 
					size="large" 
					:loading="loadingStatue" 
					@click="submit">登 录</el-button>
				</div>
			</form>
			<div 
			class="ga-text-center ga-text" 
			style="margin-top:28px; color:var(--el-text-color-placeholder);">
				&copy; 2022 GraceVueAdmin
			</div>
		</div>
    </el-row>
</template>
<script setup>
import { Key, User }  from "@element-plus/icons-vue";
import request        from "@gva/scripts/request";
import validater      from "@gva/scripts/validate";
import config         from "~/config";
let formData          = reactive({username : 'admin', password : 'admin'});
const loadingStatue   = ref(false);
const store           = useStore();
const msg             = reactive({title : '', type : ''});
const error           = reactive({username : false, password : false});
// 错误信息展示函数
const showMessage     = (msgObj)=>{
	msg.message = msgObj.message;
	msg.type    = msgObj.type;
	if(msgObj.name){
		error[msgObj.name] = true;
		setTimeout(()=>{
			error[msgObj.name] = false;
		}, 1000);
	}
	setTimeout(()=>{msg.type = '';}, 3000);
}
// 登录函数
const submit          = ()=>{
	// 表单检查
    let rule = [
        {name:"username", checkType : "string", checkRule:"5,100", errorMsg:"请正确填写登录账户"},
        {name:"password", checkType : "string", checkRule:"5,100", errorMsg:"请正确填写登录密码"},
    ];
    var checkRes = validater.check(formData, rule);
	if(!checkRes){
        showMessage({message: validater.error, type:'error', name:validater.itemName});
        return;
    }
    loadingStatue.value = true;
	// 模拟登陆请求
	// 返回值见 : /src/demoData/login.js
    request.postSimulate(
        'login',
        formData,
        (res)=>{
            if(res.status){
                showMessage({message: '登录成功', type:'success' });
                setTimeout(()=>{
                    let userToken = res.data.token;
                    store.commit('setUserToken', userToken);
					// 存储用户令牌 具体逻辑请与您的后端沟通根据实际需要完成
                    sessionStorage.setItem(
						config.sessionNames.userTokenName, 
						userToken
					);
					// 存储用户昵称
                    sessionStorage.setItem(
						config.sessionNames.userName, 
						res.data.manager_nickname
					);
					// 存储权限 来自用户对应角色的权限数据 json 形式
                    sessionStorage.setItem(
						config.sessionNames.userAuthentications, 
						res.data.authentications
					);
					// 存储用户头像
					sessionStorage.setItem(
						config.sessionNames.userFace, 
						res.data.manager_face
					);
                }, 1000);
            }else{
                showMessage({message: res.data,  type:'error' });
                loadingStatue.value = false;
            }
        },
        (error)=>{
            loadingStatue.value = false;
            console.log(error);
        }
    );
};
</script>
<style scoped>
</style>
