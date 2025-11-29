# Fullstack Account

一个基于 pnpm workspace 的全栈账户管理系统，包含用户注册、登录、邮箱验证等功能。

## 技术栈

### 前端 (Frontend)
- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **UI 组件库**: Ant Design 6
- **样式**: Tailwind CSS 4
- **路由**: React Router 6
- **状态管理**: ahooks
- **HTTP 客户端**: Axios

### 后端 (Backend)
- **框架**: NestJS 10
- **语言**: TypeScript 5
- **数据库**: MySQL 8.0 + TypeORM
- **缓存**: Redis 5
- **认证**: JWT
- **邮件服务**: Nodemailer

### 开发工具
- **包管理**: pnpm 8
- **工作区**: pnpm workspace
- **容器化**: Docker Compose

## 项目结构

```
fullstack_account/
├── apps/
│   ├── frontend/          # 前端应用
│   │   ├── src/
│   │   │   ├── api/       # API 接口
│   │   │   ├── components/# 公共组件
│   │   │   ├── pages/     # 页面组件
│   │   │   └── utils/     # 工具函数
│   │   └── vite.config.ts
│   │
│   └── backend/           # 后端应用
│       ├── src/
│       │   ├── common/    # 公共模块（守卫、拦截器、装饰器等）
│       │   ├── module/    # 业务模块
│       │   │   ├── user/  # 用户模块
│       │   │   ├── email/ # 邮件模块
│       │   │   └── redis/ # Redis 模块
│       │   └── main.ts
│       └── nest-cli.json
│
├── packages/              # 共享包（预留）
├── docker-compose.mysql.yaml  # MySQL Docker 配置
├── pnpm-workspace.yaml    # pnpm 工作区配置
└── package.json
```

## 环境要求

- **Node.js**: >= 20.19.0 或 >= 22.12.0
- **pnpm**: >= 8.0.0
- **Docker**: 用于运行 MySQL 和 Redis（可选）

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd fullstack_account
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动 MySQL（使用 Docker）

```bash
docker-compose -f docker-compose.mysql.yaml up -d
```

或者使用本地 MySQL，确保 MySQL 服务已启动。

### 4. 配置环境变量

#### 后端配置 (`apps/backend/.env`)

创建 `apps/backend/.env` 文件：

```env
# MySQL 配置
MYSQL_SERVER_HOST=localhost
MYSQL_SERVER_PORT=3306
MYSQL_SERVER_USER=root
MYSQL_SERVER_PASSWORD=123456
MYSQL_SERVER_DATABASE=lightfish_db

# JWT 配置
JWT_SECRET=your-secret-key
JWT_ACCESS_TOKEN_EXPIRES_TIME=1d
JWT_REFRESH_TOKEN_EXPIRES_TIME=7d

# Redis 配置
REDIS_SERVER_HOST=localhost
REDIS_SERVER_PORT=6379

# 邮件配置
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# 服务端口
NEST_SERVER_PORT=3001
```

#### 前端配置 (`apps/frontend/.env`)

创建 `apps/frontend/.env` 文件（如果需要）：

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 5. 启动开发服务器

#### 启动所有应用

```bash
pnpm dev
```

#### 分别启动

```bash
# 启动后端
cd apps/backend
pnpm dev

# 启动前端（新终端）
cd apps/frontend
pnpm dev
```

### 6. 访问应用

- **前端**: http://localhost:5173 (Vite 默认端口)
- **后端**: http://localhost:3001

## 开发指南

### 前端开发

```bash
cd apps/frontend

# 开发模式
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint
```

### 后端开发

```bash
cd apps/backend

# 开发模式（热重载）
pnpm dev

# 构建
pnpm build

# 生产模式
pnpm start:prod

# 代码检查
pnpm lint

# 格式化代码
pnpm format
```

## 功能特性

### 已实现功能

- ✅ 用户注册（邮箱验证）
- ✅ 用户登录（JWT 认证）
- ✅ 记住密码
- ✅ 邮箱验证码发送
- ✅ 密码加密存储
- ✅ 统一错误处理
- ✅ 请求拦截器
- ✅ 登录守卫

### 待实现功能

- ⏳ 忘记密码
- ⏳ 用户信息管理
- ⏳ 权限管理
- ⏳ 更多业务模块

## 数据库

### 使用 Docker Compose

```bash
# 启动 MySQL
docker-compose -f docker-compose.mysql.yaml up -d

# 停止 MySQL
docker-compose -f docker-compose.mysql.yaml down

# 查看日志
docker-compose -f docker-compose.mysql.yaml logs -f
```

### 数据库配置

- **数据库名**: lightfish_db
- **端口**: 3306
- **用户名**: root
- **密码**: 123456（docker-compose 中配置）

> ⚠️ 注意：生产环境请修改默认密码！

## API 接口

### 用户相关

- `POST /api/user/register` - 用户注册
- `POST /api/user/login` - 用户登录
- `GET /api/user/info` - 获取用户信息（需要登录）

### 邮件相关

- `POST /api/email/send` - 发送邮件验证码

## 项目脚本

### 根目录脚本

```bash
# 安装所有依赖
pnpm install

# 启动所有应用的开发服务器
pnpm dev

# 构建所有应用
pnpm build

# 运行所有测试
pnpm test

# 代码检查
pnpm lint
```

## 常见问题

### 1. MySQL 连接失败

- 检查 MySQL 服务是否启动
- 确认 `.env` 文件中的数据库配置正确
- 检查 MySQL 用户权限

### 2. 端口冲突

- 修改 `apps/backend/.env` 中的 `NEST_SERVER_PORT`
- 修改 `apps/frontend/vite.config.ts` 中的端口配置

### 3. 依赖安装失败

- 确保 Node.js 版本符合要求
- 清除缓存：`pnpm store prune`
- 删除 `node_modules` 和 `pnpm-lock.yaml` 后重新安装

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用私有许可证，仅供学习和研究使用。

## 联系方式

如有问题或建议，请提交 Issue 或联系项目维护者。

---

**Happy Coding! 🚀**
