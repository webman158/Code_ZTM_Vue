// 该文件是ESLint的配置

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 配置ESlint 比较繁琐、麻烦，有很多的规则，可以使用其他配置文件中的规则
  extends: [
    'plugin:vue/vue3-essential',
    // eslint 中的推荐规则
    'eslint:recommended',
    // prettier 中的推荐规则，可以避免prettier 和 eslint 之间产生冲突
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  // 可以在这使用对特定文件使用特殊规则
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
