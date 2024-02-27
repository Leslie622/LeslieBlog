//markdown预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

//githutheme高亮
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

//代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'

//代码行高亮
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'

// 引入所有语言包
import hljs from 'highlight.js'

//markdown预览组件实例
VMdPreview.use(githubTheme, {
  Hljs: hljs
})
VMdPreview.use(createHighlightLinesPlugin())
VMdPreview.use(createLineNumbertPlugin())

export default VMdPreview
