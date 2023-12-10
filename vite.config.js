import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 自动加载
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 配置
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@gva/': `${path.resolve(__dirname, 'src/gva/')}/`,
      '@gvaJS/': `${path.resolve(__dirname, 'src/gva/scripts')}/`,
      '@views/': `${path.resolve(__dirname, 'src/views/')}/`,
      '@demoData/': `${path.resolve(__dirname, 'src/demoData/')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/theme.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
          directives: true,
          version: '1.2.0-beta.1',
        }),
      ],
      imports: ['vue', 'vue-router', 'vuex'],
    }),
    Components({
      dirs: ['src/components', 'src/gva/components'],
      resolvers: [
        name => {
          if (name.startsWith('Ga')) {
            return { importName: name }
          }
        },
        ElementPlusResolver({
          importStyle: 'sass',
          directives: true,
          version: '1.2.0-beta.1',
        }),
      ],
    }),
  ],
  server: {
    port: '3000',
    proxy: {
      '/api': {
        target: 'http://localhost:8800/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // 不可以省略rewrite
      },
    },
  },
})
