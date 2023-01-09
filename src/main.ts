import { createApp } from 'vue'
import App from '@/App.vue'
// import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/styles/index.scss' // global css
import '@/theme/index.scss'

const app = createApp(App)

// 全局注册el-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
// app.use(router)
app.use(createPinia())
app.mount('#app')

import { g_regCardComponent} from "@/layerType";
g_regCardComponent();

// 关于vue3 + vite + svg的使用 https://www.jb51.net/article/246354.htm
// 动画思路js canvas绘制gif：https://blog.csdn.net/weixin_39394140/article/details/124143375
// 如何把svg图片变成可以引用的url连接当背景图或图片 https://old.xhcss.com/xh/cssstudy/question/399.html