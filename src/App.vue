<template>
	<component :is="component" v-if="init"></component>
</template>
<script setup>
import Home           from '@views/Home.vue';
import Login          from '@views/Login.vue';
import config         from "~/config";
const store           = useStore()
const component       = shallowRef(Login);
const init            = ref(false);
onMounted(() => {
    const loading = ElLoading.service({
        lock : true,
        text : 'Loading',
    });
    setTimeout(() => {
        let localUserToken = sessionStorage.getItem(
			config.sessionNames.userTokenName
		);
        if(localUserToken == null){
            component.value = Login;
            store.commit('setUserToken', 'no');
        }else{
            store.commit('setUserToken', localUserToken);
			component.value = Home;
        }
        init.value = true;
        loading.close();
    }, 500);
});

// 观察登录状态变化
watch(store.state, (val)=>{
    component.value = store.state.userToken == 'no' ? Login : Home;
});

</script>
<style>
/* 常用图标 */
@import url("https://at.alicdn.com/t/font_3021584_ro1xtow33f.css");
</style>