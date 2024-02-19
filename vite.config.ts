import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

//导入plugin配置
import createVitePlugins from './vite/plugins'

export default defineConfig(({ mode }) => {
  //环境变量
  const env = loadEnv(mode, process.cwd(), '')

  //vite配置
  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    //配置全局SCSS变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/styles/element/index.scss" as *;
          @use "@/assets/styles/variables.scss" as *;
          `
        }
      }
    },
    server: {
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, '')
        }
      }
    }
  }
})
