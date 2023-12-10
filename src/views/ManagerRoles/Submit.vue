<template>
    <el-dialog 
    v-model="dialogShow" 
    :width="dialogWidth" 
    :title="titleName[type] + '角色'">
        <div 
        v-loading="fullPageLoading"
        :style="{ height:dialogHeight+'px'}" 
        class="ga-submit-window">
            <el-form>
                <el-form-item label="角色名称" 
				:label-width="formLabelWidth">
                    <el-input 
                    autocomplete="off" 
                    v-model="formData.role_name"></el-input>
                </el-form-item>
                <el-form-item 
                label="权限列表" 
                :label-width="formLabelWidth">
                    <div 
					style="width:100%;" 
                    v-for="(mainMenu, mainMenuIdx) in pageAll" 
                    :key="mainMenuIdx">
                        <div class="ga-font-15 ga-bold">{{mainMenu.label}}</div>
                        <div 
						class="ga-font-15" 
						style="padding-left:20px;"
						v-for="(menu, menuIdx) in mainMenu.pages" 
						:key="menuIdx">
							<el-checkbox 
							v-model="authorities[menu.path.split('/')[1]].Index" 
							:true-label="1" 
							:false-label="0">
								{{menu.label}}</el-checkbox>
							<el-checkbox 
							v-if="menu.addition" 
							v-for="(addition, addIndex) in menu.addition" 
							:key="'addition-'+addIndex" 
							:true-label="1" 
							:false-label="0" 
							v-model="authorities[menu.path.split('/')[1]][addition.path]">
								{{addition.label}}
							</el-checkbox>
						</div>
                    </div>
                </el-form-item>
                <el-form-item 
				label="角色排序" 
				:label-width="formLabelWidth">
                    <el-input 
					autocomplete="off" 
					v-model="formData.role_order"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="ga-submit-footer" v-if="!fullPageLoading">
                <el-button 
				type="primary" 
                @click="submit" 
                :loading="buttonLoading" 
                :disabled="buttonLoading">{{titleName[type]}}</el-button>
            </div>
        </template>
  </el-dialog>
</template>
<script>
import menusData    from "~/pages";
import validater    from "@gvaJS/validate";
import request      from '@gvaJS/request';
import commonSubmit from '@gvaJS/commonSubmit';
export default{
	mixins:[commonSubmit],
	emits : ['success'],
    data() {
        return {
            // 宽度
            dialogWidth : '50%',
            // 高度
            dialogHeight : 200,
            // 延迟对象
            dialogTimer  : null,
            // 控制窗口开关
            dialogShow   : false,
            // 窗口标题名称
            titleName    : {add : '添加', edit:'编辑'},
            // 窗口操作类型
            type         : 'add',
            // API 请求路径
            apiURL       : {
                add    : '/managerRoles/add',
                edit   : '/managerRoles/edit',
                detail : '/managerRoles/detail'
            },
            // 表单数据
            formData     : {
                'role_name':'',
                'role_order':1,
                'role_content':''
            },
            // 数据主键
            primaryKey   : 'role_id',
            // 编辑时传递过来的数据
            rowData       : [],
            // 按钮 loading
            buttonLoading : false,
            // 自定义页面数据 
            pageAll       : [],
			authorities   : {},
            // 选中的数据
            checkedData   : ['/'],
            // loading
            fullPageLoading : false,
            // button 禁用
            buttonDisabled  : false
        }
    },
    methods: {
        // 打开 | 关闭 窗口
        open:function(type, row){
			this.pageAll       = [];
            this.buttonLoading = false;
            this.type          = type ? type : 'add';
            this.dialogShow    = true;
			this.authorities   = {};
			// 添加模式
            if(this.type == 'add'){
                this.initForAdd();
				this.$nextTick(()=>{
					this.pageAll = menusData;
				});
                this.formData = {
                    'role_name'    : '',
                    'role_order'   : 1,
					'role_content' : ''
                }
            }
			// 编辑权限
			else{
                this.fullPageLoading = true;
                this.buttonDisabled  = true;
                this.rowData         = row;
				// 请求 api 获取编辑默认值
				// 例如地址 : 
                var url              = this.apiURL.detail + '/id/' +row[this.primaryKey];
				// 模拟 api 请求获取编辑默认值，格式见 demoData/managerRoles.js detail
                request.postSimulate(
                    'managerRoles',
					{data:'empty'},
                    (res)=>{
						console.log(res);
                        if(!res.status){
                            this.showError('读取服务器数据失败');
                            return ;
                        }
						var authorities  = JSON.parse(res.detail.role_content);
						var menuObjext   = {}; 
						// 对比一下路由，补齐新增页面
						for (let index = 0; index < menusData.length; index++) {
							for (let index1 = 0; index1 < menusData[index].pages.length; index1++) {
								if(menusData[index].pages[index1].path && menusData[index].pages[index1].path != '/'){
									var pathArray = menusData[index].pages[index1].path.split('/');
									menuObjext[pathArray[1]] = {};
									if(!authorities[pathArray[1]]){
										authorities[pathArray[1]] = {'Index':0};
										menuObjext[pathArray[1]]  = {'Index':0};
									}
									if(menusData[index].pages[index1].addition){
										for(var addIndex = 0; addIndex < menusData[index].pages[index1].addition.length; addIndex++){
											if(!authorities[pathArray[1]][menusData[index].pages[index1].path]){
												authorities[pathArray[1]][menusData[index].pages[index1].path] = 0;
											}
											menuObjext[pathArray[1]][menusData[index].pages[index1].path]  = 0;
										}
									}
								}
							}
						}
						// 删除无效数据
						for(let k in authorities){
							if(!menuObjext[k]){
								delete(authorities[k]);
							}
						}
                        this.authorities = authorities;
                        this.$nextTick(()=>{
							this.pageAll = menusData;
						});
                        for(var k in this.formData){
                            this.formData[k] = res.detail[k];
                        }
                        this.buttonDisabled  = false;
                    },
                    (error)=>{
                        console.log(error);
                    },
                    ()=>{this.fullPageLoading = false;}
                );
            }
			this.initSubmitBody();
        },
        close : function(){
            setTimeout(()=>{
                this.dialogShow = false;
            },1000);
        },
        // 展示错误
        showError : function(error){
			ElMessage({
			    message : error,
			    type    : 'error',
			});
            return false;
        },
        // 表单提交
        submit:function(){
            let rule = [
                {name:"role_name", checkType : "string", checkRule:"1,100", errorMsg:"请填写角色名称"},
                {name:"role_order", checkType : "string", checkRule:"1,5", errorMsg:"请正确填写排序"},
            ];
            var checkRes               = validater.check(this.formData, rule);
			if(!checkRes){return this.showError(validater.error);}
            this.formData.role_content = JSON.stringify(this.authorities);
            this.buttonLoading         = true;
			// 组合 url
            var url = this.type == 'add' ? 
					this.apiURL.add : 
					this.apiURL.edit+'/id/'+this.rowData[this.primaryKey];
			// 添加和编辑请求地址不同
			// 模拟请求
			console.log(this.formData);
            request.postSimulate(
                'test',
                this.formData,
                (res)=>{
                    if(res.status){
						if(this.type == 'add'){
							ElMessage({message: '模拟添加成功，详见源码 ~', type: 'success'});
						}else{
							ElMessage({message: '模拟编辑成功，详见源码 ~', type: 'success'});
						}
                        this.$emit('success');
                        this.close();
                    }else{
                        this.buttonLoading = false;
                        this.showError(res.data);
                        console.log(res);
                    }
                },
                (error)=>{
                    this.showError('服务器忙，请重试');
                    this.buttonLoading = false;
                }
            );
        },
        // 转换基础相关 path
        transformPath : function(path, sonPath, checked){
            var pathArray = path.split('/');
            if(checked){
                return '/'+pathArray[1]+'/'+sonPath;
            }
            return 'no:/'+pathArray[1]+'/'+sonPath;
        },
        initForAdd : function(){
            for (let index = 0; index < menusData.length; index++) {
                for (let index1 = 0; index1 < menusData[index].pages.length; index1++) {
                    if(menusData[index].pages[index1].path && menusData[index].pages[index1].path != '/'){
                    	var pathArray = menusData[index].pages[index1].path.split('/');
                    	this.authorities[pathArray[1]] = {'Index':1};
                    	if(menusData[index].pages[index1].addition){
                    		for(var addIndex = 0; addIndex < menusData[index].pages[index1].addition.length; addIndex++){
                    			this.authorities[pathArray[1]][menusData[index].pages[index1].addition[addIndex].path] = 1;
                    		}
                    	}
                    } 
                }
            }
        }
    }
}
</script>