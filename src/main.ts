import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { txCos } from './config/common'

import App from './App.vue'
import router from './router'

//初始化CSS
import 'normalize.css'
//全局CSS
import '@/assets/styles/globals.scss'
//自定义指令
import directives from '@/directives/index'

const app = createApp(App)
//图片前缀
app.config.globalProperties.$ImgPrefix = txCos.imgPrefix

app.use(createPinia())
app.use(router)
app.use(directives)

app.mount('#app')
