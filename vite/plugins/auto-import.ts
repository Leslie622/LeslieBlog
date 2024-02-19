import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    resolvers: [ElementPlusResolver()],
    dts: 'src/types/auto-imports.d.ts'
  })
}
