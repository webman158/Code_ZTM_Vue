/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 设置主题：修改字体，颜色等
  theme: {
    extend: {
      zIndex: {
        99999: '99999'
      }
    }
  },
  darkMode: 'class',
  // 拓展tailwind 的插件
  plugins: []
}

// 需要修改Eslint配置
// module.exports = {
//   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   theme: {
//     extend: {}
//   },
//   plugins: []
// }
