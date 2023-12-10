<template>
    <el-dialog 
	v-model="dialogShow"
    :width="dialogWidth"
    :title="titleName[type] + '用户' + (type == 'edit' ? '  #'+ rowData[primaryKey] :'')">
        <div v-loading="fullPageLoading" 
        :style="{ height:dialogHeight+'px'}" class="ga-submit-window">
            <el-form>
                <el-form-item 
				label="登录账户" 
				:label-width="formLabelWidth">
                    <el-input 
					type="input" 
					autocomplete="off" 
					v-model="formData.manager_username"></el-input>
                </el-form-item>
				<el-form-item 
				label="登录密码" 
				:label-width="formLabelWidth">
                    <el-input 
					type="password" 
					autocomplete="off" 
					v-model="formData.manager_password"></el-input>
                </el-form-item>
				<el-form-item 
				label="所属角色" 
				:label-width="formLabelWidth">
                    <el-select 
					v-model="formData.manager_role_id" 
                    placeholder="请选择"
                    :loading="options_for_manager_role_id.length < 1">
                        <el-option 
                        v-for="(item, index) in options_for_manager_role_id" 
                        :key="item.value" 
						:label="item.label" 
						:value="item.value"></el-option>
                    </el-select>
                </el-form-item>
				<el-form-item 
				label="用户昵称" 
				:label-width="formLabelWidth">
                    <el-input 
					type="input" 
					autocomplete="off" 
					v-model="formData.manager_nickname"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div 
			class="ga-submit-footer" 
			v-if="!fullPageLoading">
                <el-button type="primary" 
                @click="submit" 
                :disabled="buttonLoading" 
                :loading="buttonLoading">{{titleName[type]}}</el-button>
            </div>
        </template>
  </el-dialog>
</template>
<script>
import validater      from "@gvaJS/validate";
import commonSubmit   from "@gvaJS/commonSubmit";
import request        from '@gvaJS/request';
export default{
    mixins : [commonSubmit],
	emits  : ['success'],
    data() {
        return {
            // 窗口标题名称
            titleName    : {add : '添加', edit:'编辑'},
            // API 请求路径
            apiURL : {
                add    : '/managers/add',
                edit   : '/managers/edit',
                detail : '/managers/detail'
            },
			initFormData : {
			    "manager_username" : "",
			    "manager_password" : "",
			    "manager_role_id" : "0",
			    "manager_nickname" : ""
			},
            // 数据主键
            primaryKey : 'manager_id',
            // 附加数据
            options_for_manager_role_id : []
        }
    },
    methods: {
        // 当窗口被打开时执行的附加功能
        onOpen : function(){
			// 编辑数据读取默认值
            if(this.type == 'edit'){
				this.fullPageLoading = true;
				console.log('打开窗口时传递的参数 : ', this.rowData);
				// 模拟 api 请求
				request.postSimulate(
				    'managers',
				    {id:this.rowData.manager_id},
				    (res)=>{
						for(var k in this.initFormData){
							this.formData[k] = res.detail[k];
						}
				        this.formData.manager_password = '';
				    },
				    ()=>{},
					()=>{this.fullPageLoading = false;}
				);
            }
        },
        // 表单提交
        submit:function(){
            let rule = [
                {name:"manager_username", checkType : "string", checkRule:"5,100", errorMsg:"请正确输入用户名"},
                {name:"manager_password", checkType : "string", checkRule:"6,100", errorMsg:"请正确输入登录密码"},
                {name:"manager_role_id", checkType : "notSame", checkRule:"0", errorMsg:"请选择所属角色"},
                {name:"manager_nickname", checkType : "string", checkRule:"1,100", errorMsg:"请正确输入用户昵称"}
            ];
            if(this.type == 'edit'){
				if(this.formData.length < 1){
					rule.splice(1,1);
				}
			}
            var checkRes = validater.check(this.formData, rule);
			if(!checkRes){return this.showError(validater.error);}
			// 其他自定义验证代码
            this.buttonLoading = true;
            var url = this.type == 'add' ? 
            this.apiURL.add : 
            this.apiURL.edit+'/id/'+this.rowData[this.primaryKey];
            // 提交 POST 请求 [ 编辑和添加 url 不同 上面的 url 为一个例子 ]
			// 模拟
			console.log(this.formData);
            request.postSimulate(
                'test',
                this.formData,
                (res)=>{
                    if(res.status){
                        ElNotification({title: '操作成功', message: '提交成功！', type: 'success',});
                        this.$emit('success');
                        this.close();
                    }else{
                        ElNotification({title: '操作失败', message: res.data, type: 'error'});
                        console.log(res);
                        this.buttonLoading = false;
                    }
                },
                (error)=>{
                    this.buttonLoading = false;
                }
            );
        },
		// 获取角色选项
        get_manager_role_id_options : function(){
			// 模拟 api 请求
            request.postSimulate(
                'managerRoles',
                {},
                (res)=>{
                    if(!res.status){return ;}
                    var optionData = [{label:"请选择所属角色", value:"0"}];
                    for(var i = 0; i < res.roles.length; i++){
                        optionData.push({label:res.roles[i].role_name, value:res.roles[i].role_id+''});
                    }
                    this.options_for_manager_role_id = optionData;
                },
                (error)=>{console.log(error);},
                ()=>{}
            );
           
        },
    },
    mounted(){
        this.get_manager_role_id_options();
    }
}
</script>
<style>
</style>