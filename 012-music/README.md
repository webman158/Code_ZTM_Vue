# 012-music

## CI/CD 部署流程 (GitHub Actions + SSH)

本项目 (`012-music`) 配置了自动化部署流程。当代码推送到 `main` 或 `master` 分支时，GitHub Actions 会自动构建项目并将产物部署到指定服务器。

### 1. 工作流说明

配置文件位于 `.github/workflows/deploy.yml`，主要包含以下步骤：

1. **Checkout**: 检出代码。
2. **Setup Environment**: 安装 Node.js 和 pnpm。
3. **Install & Build**: 安装依赖并执行构建 (`pnpm run build`)。
4. **Deploy**: 使用 SSH 将 `012-music/dist` 目录下的构建产物同步到远程服务器。

### 2. 配置 GitHub Secrets

为了让 GitHub Actions 能够访问你的服务器，需要在 GitHub 仓库的 `Settings` -> `Secrets and variables` -> `Actions` 中配置以下 Secrets：

| Secret Name | 说明 | 示例 |
| :--- | :--- | :--- |
| `REMOTE_HOST` | 服务器 IP 地址或域名 | `1.2.3.4` |
| `REMOTE_USER` | SSH 登录用户名 | `root` 或 `ubuntu` |
| `REMOTE_TARGET` | 部署目标路径 (服务器上的绝对路径) | `/var/www/music-app` |
| `SSH_PRIVATE_KEY` | SSH 私钥内容 | `-----BEGIN OPENSSH PRIVATE KEY----- ...` |

### 3. 服务器配置指南

#### 生成 SSH 密钥对

在本地或服务器上生成 SSH 密钥对（如果不使用密码）：

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f github_deploy_key -N ""
```

这将生成 `github_deploy_key` (私钥) 和 `github_deploy_key.pub` (公钥)。

#### 配置服务器信任

将 **公钥** (`github_deploy_key.pub`) 的内容追加到服务器目标用户的 `~/.ssh/authorized_keys` 文件中：

```bash
# 在服务器上执行
cat github_deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

#### 配置 GitHub

将 **私钥** (`github_deploy_key`) 的内容复制并保存到 GitHub 仓库的 `SSH_PRIVATE_KEY` Secret 中。

**注意**：请确保服务器上的目标路径 (`REMOTE_TARGET`) 存在，且 `REMOTE_USER` 对该目录拥有写入权限。

## 记录

### 优化点

1. OK 注册、登录成功不要页面刷新
2. OK 语言切换，做成类似Vue官网的下拉提示效果
3. OK 登录、注册、发表评论提示消息
4. OK 主题切换
5. About，卡片形式 展示项目的内容 + 技术栈 + 难点

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
