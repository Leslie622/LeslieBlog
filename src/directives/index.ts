/* 自定义指令 */
import type { App, Directive } from 'vue'
import { visible } from './visible'

type direcitvesData = {
  [key: string]: Directive
}

const directives: direcitvesData = {
  visible
}

export default {
  install(app: App) {
    Object.keys(directives).forEach((item) => {
      app.directive(item, directives[item])
    })
  }
}
