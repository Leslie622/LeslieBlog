import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    resolvers: [
      ElementPlusResolver({
        importStyle: 'sass'
      })
    ],
    dts: 'src/types/auto-imports.d.ts'
  })
}
