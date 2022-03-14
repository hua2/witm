import { createApp } from "vue";
import App from "./App.vue";
import router from './router'
import store from './store';


// 引入全局样式
import '@/assets/css/index.scss'

// 移动端适配
import 'amfe-flexible'

// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant'

createApp(App).use(vantPlugins).use(router).use(store).mount('#app')
