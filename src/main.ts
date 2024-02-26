import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { txCos } from './config/common'

import App from './App.vue'
import router from './router'

//element黑暗模式
import 'element-plus/theme-chalk/dark/css-vars.css'
//初始化CSS
import 'normalize.css'
//全局CSS
import '@/assets/styles/globals.scss'
//自定义指令
import directives from '@/directives/index'

//markdown渲染组件
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs
import hljs from 'highlight.js'

VMdPreview.use(githubTheme, {
  Hljs: hljs
})

const app = createApp(App)
//图片前缀
app.config.globalProperties.$ImgPrefix = txCos.imgPrefix

app.use(createPinia())
app.use(router)
app.use(directives)
app.use(VMdPreview)

app.mount('#app')
