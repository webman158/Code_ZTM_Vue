import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VitePWA() 函数调用，将会生成 清单文件、还会创建一个 Service Worker 并自动注册。
    // Service Worker 是一个可以在后台运行处理任务之外的文件
    VitePWA({
      // 自动更新
      registerType: 'autoUpdate',
      // 开发选项：包含开发服务器的配置
      devOptions: {
        // 默认情况下，不会为开发服务器生成清单文件，只会在生产模式下创建清单文件
        // 如果想要在开发服务器中生成清单文件，可以将其设置为 true。
        enabled: true
      },
      // 自定义清单文件内容 -> pwa插件可以将以下配置添加到清单文件对应的配置中
      manifest: {
        name: 'Music App',
        short_name: 'Music App',
        // 主题颜色
        theme_color: '#ff5e3a',
        icons: [
          {
            src: '/assets/img/pwa-192x192.png',
            // 图标类型
            type: 'imag e/png',
            sizes: '192x192'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache'
            }
          }
        ]
      }
    })
    // visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
