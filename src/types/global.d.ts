import { ComponentCustomProperties } from 'vue'

//全局变量类型定义
declare module 'vue' {
  interface ComponentCustomProperties {
    $ImgPrefix: string
  }
}
