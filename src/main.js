import { createApp }  from 'vue';
import App            from './App.vue';

// 加载样式
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
import 'nprogress/nprogress.css';
import '@gva/gva.scss';
import '~/styles/custom.scss';

// 加载状态管理
import store          from './store/store';
// 加载路由
import route          from './gva/scripts/route';

// 启动应用
const app = createApp(App);
app.use(route);
app.use(store);
app.mount('#app');