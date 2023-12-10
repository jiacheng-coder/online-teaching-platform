import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from 'nprogress';
NProgress.configure({
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
});

// 加载页面配置
import menus  from "~/pages";
import config from "~/config";

// 解析出真实路由 
let routePages = [
	{path : '/', component : ()=> import("/src/views/System/Index.vue")}
];

for (let index = 0; index < menus.length; index++){
    for (let index1 = 0; index1 < menus[index].pages.length; index1++){
        if(menus[index].pages[index1].component){
            routePages.push({
                path:menus[index].pages[index1].path,
                component:menus[index].pages[index1].component
            });
        }
        if(menus[index].pages[index1].addition){
        	var parentPage = menus[index].pages[index1].path.split('/');
        	var additions  = menus[index].pages[index1].addition;
        	for(let idxAd = 0; idxAd < additions.length; idxAd++){
        		if(additions[idxAd].component){
        			routePages.push({
        			    path:'/'+parentPage[1]+'/'+additions[idxAd].path,
        			    component:additions[idxAd].component
        			});
        		}
        	}
        }
    }
}
// 创建路由
const router = createRouter({
    history : createWebHashHistory(),
    routes  : routePages
});

// 路由拦截
router.beforeEach((to, from)=>{
	NProgress.start();
	return config.routeInterception(to, from);
});
router.afterEach(() => {
    NProgress.done()
});

export default router;