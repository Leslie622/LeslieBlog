import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createComponents from './components'
import createComperssion from './compression'

export default function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createComperssion())
  return vitePlugins
}
