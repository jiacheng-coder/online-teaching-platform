<template>
	<div 
	id="ga-page" 
	class="ga-flex ga-nowrap" 
	v-if="menus.length > 0">
		<!-- 左侧导航 -->
		<div class="ga-left-menu" 
		:class="[leftMenuStatus ? 'gui-left-in' : 'gui-left-out']">
			<div class="ga-left-menu-logo ga-image-in">
				<img src="../assets/logo.png" />
			</div>
			<div style="padding:0 15px;">
				<el-menu 
				class="ga-noborder" 
				active-text-color="#10B982" 
				background-color="#525C62" 
				text-color="rgb(209, 213, 219)" 
				@select="leftMenuSelect" 
				:default-active="'leftMenu-'+leftActiveIndex[0]+'-'+leftActiveIndex[1]">
					<el-sub-menu 
					v-for="(menu, menuIdx) in menus" 
					:index="'leftMenu-'+menuIdx" 
					:key="'leftMenu-'+menuIdx" 
					v-show="menu.pages.length > 0">
						<template #title>
							<span 
							:class="[menu.icon]"></span>
							<span 
							class="ga-font-16">&nbsp;{{menu.label}}</span>
						</template>
						<el-menu-item 
						class="ga-font-15 el-menu-item-son" 
						v-for="(page, pageIdx) in menu.pages" 
						:key="'leftMenu-'+menuIdx+'-'+pageIdx" 
						:index="'leftMenu-'+menuIdx+'-'+pageIdx">{{page.label}}</el-menu-item>
					</el-sub-menu>
				</el-menu>
			</div>
		</div>
		<!-- 右侧区域 -->
		<div class="ga-right-area">
			<!-- 头部 -->
			<div class="ga-header">
				<div>
					<div 
					class="ga-header-menu" 
					@click="openMenu">
						<el-icon><more-filled /></el-icon>
					</div>
				</div>
				<div id="header-page-tag-wrap">
					<div
					class="header-page-tag" :style="headerTagsStyle">
						<div 
						v-for="(tag, idx) in headerTagsArray" 
						:key="idx" 
						@click.stop="leftMenuSelect(tag.key)" 
						:class="[
							'tag', 
							leftActiveKey == tag.key ? 'active' : '' ,
							tag.key == 'leftMenu-0-0' && idx == 0 ? 'header-page-tag-pr10' : '' 
						]">
							{{tag.label}}
							<div 
							v-if="tag.key != 'leftMenu-0-0' && idx > 0" 
							class="close-btn" 
							@click.stop="closePage(tag.key, idx)">
								<el-icon :size="16"><CircleClose /></el-icon>
							</div>
						</div>
					</div>
				</div>
				<el-row justify="end">
					<el-popover 
					ref="elPopoverForMsg" 
					placement="bottom-end" 
					:width="399" 
					v-if="messageCount > 0" 
					trigger="click">
					    <template #reference>
							<el-badge :value="messageCount">
							    <div 
								class="ga-icon icon-item message-tip">&#xe611;</div>
							</el-badge>
					    </template>
						<template #default>
							<div style="padding:6px;">
								<div 
								class="ga-font-18" 
								style="padding-top:12px;">
									最新消息
								</div>
								<ga-divider height="15px"></ga-divider>
								<ul class="ga-list">
									<li 
									v-for="(msg, idx) in messages" 
									:key="idx">
										<div class="ga-list-face ga-border-radius-large">
											<img :src="msg.faceImg" />
										</div>
										<div class="ga-list-body" style="margin-left:16px;">
											<p class="ga-font-15 ga-lh-15 ga-text">{{msg.type}}</p>
											<p class="ga-font-13 ga-lh-15 ga-text-secondary" style="margin-top:3px;">
												{{msg.message}}
											</p>
										</div>
									</li>
								</ul>
								<div 
								style="color: #2275D7; line-height:35px; margin-top:10px;"
								class="ga-font-15 ga-text-center ga-as-click" 
								@click="gotoMessagesPage">
									查看全部消息
								</div>
							</div>
						</template>
					</el-popover>
					<div style="width:25px; height:10px;"></div>
					<el-popover 
					ref="elPopoverAccount" 
					placement="bottom-end" 
					trigger="click" 
					:width="200">
					    <template #reference>
							<div class="ga-header-account-face">
								<img :src="userFace" />
							</div>
					    </template>
						<template #default>
							<div style="padding-bottom:8px;">
								<el-row 
								align="middle" 
								style="padding-top:10px;">
									<div class="ga-header-account-face">
										<img :src="userFace" />
									</div>
									<div style="margin-left:20px;">
										<p class="ga-font-15">{{username}}</p>
									</div>
								</el-row>
								<ga-divider height="15px"></ga-divider>
								<div 
								class="ga-dropdown-menu" 
								style="padding-top:15px;">
									<div class="item" 
									@click="showChangePwdWindow">
										<span class="ga-icon">&#xe62a;</span>
										修改密码
									</div>
									<div class="item" 
									@click="gotoManagerInfo">
										<span class="ga-icon">&#xe657;</span>
										账户信息
									</div>
									<ga-divider height="15px"></ga-divider>
									<div class="item" 
									style="margin-top:10px;" 
									@click="logoff">
										<span class="ga-icon">&#xe661;</span>
										退出系统
									</div>
								</div>
							</div>
						</template>
					</el-popover>
				</el-row>
			</div>
			<div id="ga-route-page">				
				<router-view v-slot="{Component}">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</router-view>
			</div>
		</div>
		<!-- 修改密码 -->
		<el-dialog 
		v-model="dialogShowFormChangePwd" 
		title="修改密码">
			<el-form>
				<div style="margin-top:28px;">
					<ga-input 
					type="password" 
					placeholder="新的密码" 
					v-model="pwd.newPwd" 
					label="新的密码"></ga-input>
				</div>
				<div style="margin-top:28px;">
					<ga-input 
					type="password" 
					placeholder="确认密码" 
					v-model="pwd.rePwd" 
					label="确认密码"></ga-input>
				</div>
			</el-form>
			<template #footer>
				<el-button type="primary" 
				:loading="changePwdBtnLoading" 
				@click="changePwd">修改密码</el-button>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import { ArrowDown, HomeFilled, User, MoreFilled, CircleClose } from '@element-plus/icons-vue';
import request                         from '@gva/scripts/request';
import menusData                       from "../pages";
import config                          from "~/config";
import { nextTick } from 'vue';
const username       = ref(sessionStorage.getItem(config.sessionNames.userName));
const userFace       = computed(()=>{
	return store.state.userFace;
});
const menus            = ref([]);
const messageCount     = ref(0);
const messages         = ref([]);
const elPopoverForMsg  = ref(null);
const elPopoverAccount = ref(null);

// 关闭弹层
const hidePopover = ()=>{
	elPopoverForMsg.value.hide()
	elPopoverAccount.value.hide();
}


// 模拟读取用户未读消息数据
// 模拟消息数量
messageCount.value = 8;
// 模拟消息数据
messages.value     = [
	{
		type    : '系统消息',
		faceImg : 'https://img1.baidu.com/it/u=3885471804,490348796&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
		message : '您刚刚修改了密码...'
	},
	{
		type    : '提醒消息',
		faceImg : 'https://img2.baidu.com/it/u=3537260755,3323089331&fm=253&fmt=auto&app=120&f=JPEG?w=400&h=400',
		message : '欢迎使用 GraceVueAdmin'
   }
];

// 路由
const router         = useRouter();
// 状态管理	
const store          = useStore();

// 左侧菜单状态
const leftMenuStatus = ref(true);
// 左侧菜单
let leftActiveIndex  = ref([0, 0]);
let leftActiveKey    = ref('leftMenu-0-0');
// 顶部页面历史
const headerTags       = reactive({'leftMenu-0-0':"系统首页"});
const headerTagsArray  = ref([{key:'leftMenu-0-0', label:"系统首页"}]);
const headerTagsStyle  = reactive({'marginLeft':'0px'});


const leftMenuSelect = (key)=>{
	if(key == leftActiveKey){return ;}
    let keys = key.split('-');
    leftActiveIndex.value = [parseInt(keys[1]), parseInt(keys[2])];
    let path = menus.value[leftActiveIndex.value[0]].pages[leftActiveIndex.value[1]].path;
	const windowWidth = document.documentElement.clientWidth;
	if(windowWidth > 768){
		leftMenuStatus.value = true;
	}else{
		leftMenuStatus.value = false;
	}
	setTimeout(async ()=>{
		router.push({path:path});
		leftActiveKey.value = key;
		headerTags[key] = menus.value[leftActiveIndex.value[0]].pages[leftActiveIndex.value[1]].label;
		//
		await nextTick();
		var headerTagDom = document.getElementById("header-page-tag-wrap");
		var headerTagDomWidth = headerTagDom.offsetWidth;
		var headerTagItems = headerTagDom.querySelectorAll(".tag");
		var headerTagsWidth = 0;
		var headerTagsActiveTagX = 0;
		var headerTagsActiveIdx = -1
		var headerTagsActiveDomWidth = 0;
		for(var i = 0; i <  headerTagItems.length; i++){
			headerTagsWidth += headerTagItems[i].offsetWidth;
			if(headerTagsActiveIdx == -1){
				headerTagsActiveTagX = headerTagsWidth; 
				if(headerTagItems[i].classList.contains("active")){
					headerTagsActiveDomWidth = headerTagItems[i].offsetWidth;
					headerTagsActiveIdx = i;
				}
			}
		}
		var xSpace = headerTagsActiveTagX - headerTagDomWidth;
		if(xSpace > 2 && headerTagsWidth > headerTagDomWidth){
			headerTagsStyle.marginLeft = ((xSpace + headerTagsActiveDomWidth ) * -1)+'px';
		}else{
			headerTagsStyle.marginLeft = '0px';
		}
	}, 500);
}


// 观察顶部标签变化
watch(headerTags, (v)=>{
	var headerTagsArr = [];
	for(var k in v){
		headerTagsArr.push({key:k, label : v[k]});
	}
	headerTagsArray.value = headerTagsArr;	
});

// 加载菜单
onMounted(()=>{
	// 根据权限加载菜单代码 
	// 读取本地菜单数据
	let authentications     = JSON.parse(
		sessionStorage.getItem(config.sessionNames.userAuthentications)
	);
	// 获取对应权限的功能菜单
	let currentMenus        = new Array();
	for (let index = 0; index < menusData.length; index++) {
		var currentData     = JSON.stringify(menusData[index]);
		currentData         = JSON.parse(currentData);
		currentMenus[index] = currentData;
		let menusSub = new Array();
		for (let idxIn = 0; idxIn < currentData.pages.length; idxIn++){
			var path   = currentData.pages[idxIn].path.split('/');
			if(authentications[path[1]]){
				if(
				authentications[path[1]][path[2]] 
				&& 
				authentications[path[1]][path[2]] == 1){
					if(!currentData.pages[idxIn].hide){
						menusSub.push(currentData.pages[idxIn]);
					}
				}
			}
		}
		if(menusSub.length > 0){
			currentMenus[index].pages = menusSub;
		}else{
			currentMenus[index].pages = [];
		}
	}
	menus.value = currentMenus;
	headerTagsArray.value = [{key:'leftMenu-0-0', label:currentMenus[0].pages[0].label}];
	// 刷新后左侧菜单选中识别
	setLeftMenuSelected();
	// 头像数据获取
	store.commit('setUserFace', sessionStorage.getItem(config.sessionNames.userFace));
});

// 退出系统
const logoff = ()=>{
	hidePopover();
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
    });
	// 模拟请求后端后注销
    request.postSimulate(
        'test',
		{},
        (res)=>{
            if(res.status){
                router.push('/');
                ElMessage({message: '您已退出 ~', type:'success' });
                setTimeout(()=>{
                    store.commit('setUserToken', 'no');
                    sessionStorage.removeItem(
						config.sessionNames.userTokenName
					);
                    loading.close();
                }, 1000);
            }else{
                ElMessage({message: res.data,  type:'error' });
            }
        },
        (error)=>{
            console.log(error);
        }
    );
}

// 修改密码功能
let changePwdBtnLoading     = ref(false);
let dialogShowFormChangePwd = ref(false);
let pwd = reactive({newPwd : '', rePwd : ''});
const showChangePwdWindow   = ()=>{
	hidePopover();
	dialogShowFormChangePwd.value = true;
}
let changePwd = ()=>{
    if(pwd.newPwd.length < 6){
        ElMessage({message: '密码至少6个字符', type:'error' });
        return ;
    }
    if(pwd.newPwd != pwd.rePwd){
        ElMessage({message: '两次密码输入不一致', type:'error' });
        return ;
    }
    changePwdBtnLoading.value = true;
	// api 请求示例 [ 模拟，真实情况亦是如此 ]
    request.postSimulate(
        'test',
        {password:pwd.newPwd},
        (res)=>{
            if(res.status){
                ElNotification({title: '成功', message: '密码修改成功', type: 'success',});
                dialogShowFormChangePwd.value = false;
            }else{
                ElNotification({title: '失败', message: '服务器忙，请重试 ~', type: 'error'});
                changePwdBtnLoading.value = false;
            }
        },
        (error)=>{
            changePwdBtnLoading.value = false;
        }
    );
}

/* 刷新后默认选中对应导航 */
const setLeftMenuSelected = ()=>{
	for(let index = 0; index < menusData.length; index++) {
		var currentData     = JSON.stringify(menusData[index]);
		currentData         = JSON.parse(currentData);
		for (let idxIn = 0; idxIn < currentData.pages.length; idxIn++){
			var path   = currentData.pages[idxIn].path.split('/');
			if(router.currentRoute.value.fullPath == currentData.pages[idxIn].path){
				var k = 'leftMenu-'+index+'-'+idxIn ;
				leftActiveIndex.value = [index, idxIn];
				headerTagsArray.value = [{key:k, label : currentData.pages[idxIn].label}];
				leftActiveKey.value = k;
				headerTags[k] = currentData.pages[idxIn].label;
				return true;
			}
		}
	}
}

/* 关闭导航 */
const closePage = (key, idx)=>{
	if(key != leftActiveKey.value){
		delete(headerTags[key]);
	}else{
		var len = headerTagsArray.value.length - 1;
		var k = "";
		if(idx >= len){
			if(len == 0){
				k = 'leftMenu-0-0';
			}else{
				k = headerTagsArray.value[idx - 1].key;
			}
		}else{
			if(len == 0){
				k = 'leftMenu-0-0';
			}else{
				k = headerTagsArray.value[idx + 1].key;
			}
		}
		leftMenuSelect(k);
		delete(headerTags[key]);
	}
}

/* 左侧导航 */
const openMenu = ()=>{
	leftMenuStatus.value = true;
}
let timer = null;
window.onresize = ()=>{
	if(timer != null){clearTimeout(timer);}
	timer = setTimeout(()=>{
		let winWidth = document.documentElement.clientWidth;
		if(winWidth > 768){
			leftMenuStatus.value = true;
		}else{
			leftMenuStatus.value = false;
		}
	}, 200);
};


/* 跳转 */
const gotoMessagesPage = ()=>{
	hidePopover();
	router.push('/Messages/Index');
}
const gotoManagerInfo  = ()=>{
	hidePopover();
	router.push('/Account/Index');
}
</script>
<style scoped>
.el-menu{border:none !important;}
.el-menu-icon{font-size:18px; padding-right:3px;}
.el-menu-item-son{padding-left:20px !important; margin:0 20px; border-radius:6px; font-weight:500;}
.ga-header{background:#FFFFFF;}
#header-page-tag-wrap{width:100%; flex:1; overflow:hidden; margin-right:10px;}
.header-page-tag{display:flex; flex-direction:row; flex-wrap:nowrap; align-items:center; flex:1; overflow: hidden; transition:all 0.5s;}
.header-page-tag-pr10{padding:0 10px !important;}
.header-page-tag > .tag{line-height:36px; flex-shrink:0; font-size:14.6px; padding:0 10px; padding-right:30px; background:#f5f5f5; border-radius:3px; margin:0 5px; cursor: pointer; position:relative;}
.header-page-tag .active{background:var(--el-color-primary) !important; color:#FFFFFF !important;}
.header-page-tag > .tag > .close-btn{position:absolute; z-index:1; top:10px; right:6px; width:20px; height:20px; text-align:center; line-height:20px; display:block;}
</style>