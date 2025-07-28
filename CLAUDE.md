# CLAUDE.md
与我交流时，除了必要的专业术语，请全程使用中文，包括注释。

此文件为Claude Code (claude.ai/code) 在处理此代码库时提供指导。

## 项目概述

XGWeb 是一个基于现代开发工具构建的 Vue 3 Web 应用模板。它是受 Vitesse 启发的简化版本，功能较少。该项目专注于创建一个快速的Web应用启动页，具有搜索功能和网站快捷方式。

## 开发命令

### 核心命令
- `pnpm run dev` - 启动开发服务器，运行在 http://localhost:3333 (自动打开)
- `pnpm run build` - 生产环境构建 (先运行 vue-tsc 类型检查，然后 vite build)
- `pnpm run preview` - 本地预览生产构建

### 包管理
- 使用 `pnpm@10.13.1` 作为包管理器
- 安装依赖: `pnpm i`

## 架构概述

### 技术栈
- **框架**: Vue 3 with Composition API + TypeScript
- **构建工具**: Vite 6
- **路由**: 基于文件的路由，通过 `unplugin-vue-router` (页面位于 `src/pages/`)
- **状态管理**: Pinia 用于全局状态
- **样式**: 
  - UnoCSS 原子化CSS，包含 preset-uno、preset-attributify、preset-icons
  - Tailwind CSS 4 (通过 @tailwindcss/vite)
  - CSS 工具类通过 `clsx` 和 `tailwind-merge`
- **UI组件**: 基于 shadcn-vue 架构的自定义组件库
- **图标**: 通过 UnoCSS preset-icons 使用 Iconify 图标
- **自动导入**: 
  - Vue APIs、VueRouter、VueUse composables 自动导入
  - `src/components/` 中的组件自动导入
  - `src/composables/` 和 `src/stores/` 中的 composables 自动导入

### 项目结构

```
src/
├── components/          # 自动导入的 Vue 组件
│   └── ui/             # 可复用的 UI 组件 (Button, Drawer, Sheet, Input)
├── composables/        # Vue composables (自动导入)
│   └── dark.ts         # 使用 VueUse 的暗色模式功能
├── lib/                # 工具函数
│   └── utils.ts        # cn() 工具用于类名合并
├── pages/              # 基于文件的路由
│   ├── index.vue       # 主页，包含搜索和网站快捷方式
│   ├── about/          # 关于页面目录
│   └── [...all].vue    # 404 捕获所有路由
├── stores/             # Pinia 状态管理 (自动导入)
└── main.ts             # 应用入口点
```

### 主要功能和模式

1. **基于文件的路由**: 页面从 `src/pages/` 结构自动生成
2. **组件自动加载**: 组件自动导入和注册
3. **暗色模式**: 通过 VueUse 实现，使用 `isDark` 和 `toggleDark` composables
4. **本地存储**: 使用 VueUse 的 `useLocalStorage` 进行设置持久化
5. **类型安全**: 完整的 TypeScript 支持，自动生成类型定义

### 配置文件

- `vite.config.ts` - 主要构建配置，包含插件
- `uno.config.ts` - UnoCSS 配置，包含自定义快捷类 (`btn`, `icon-btn`)
- `components.json` - shadcn-vue 组件配置 (New York 风格)
- 路径别名: `~` 和 `@` 都指向 `src/`

### UI 组件系统

项目使用受 shadcn-vue 启发的自定义 UI 组件库:
- 组件位于 `src/components/ui/`
- 每个组件都有自己的目录，包含 Vue 文件和 index.ts
- 使用 class-variance-authority 进行组件变体管理
- 与 reka-ui 集成，提供无头组件 (Drawer, Sheet)

### 状态管理模式

- Pinia stores 用于全局状态 (`src/stores/`)
- VueUse composables 用于响应式工具
- 本地存储集成用于持久化设置
- `stores/index.ts` 中提供了示例 store 结构

### 样式方法

- UnoCSS 用于工具类，包含自定义快捷类
- Tailwind CSS 4 集成
- CSS 变量用于主题支持
- 通过 CSS 类和 VueUse 实现暗色模式
- 通过 vite-plugin-webfont-dl 加载字体 (Google Fonts: Caveat)

### 开发注意事项

- 使用基于文件的路由，自动生成路由
- 组件、composables 和 stores 自动导入
- 类型定义自动生成
- 主页面 (`pages/index.vue`) 包含复杂的首页，带有搜索功能和网站快捷方式 (大部分功能目前被注释掉)
- 开发服务器运行在端口 3333，启用自动打开

### 项目特色功能

当前主页包含以下功能模块:
- **搜索框**: 支持多个搜索引擎 (Google, Bing, 百度, 搜狗, Yandex)
- **网站快捷方式**: 预配置的常用网站链接 (GitHub, YouTube, 哔哩哔哩等)
- **设置系统**: 通过本地存储持久化用户偏好
- **暗色模式切换**: 集成在导航栏中
- **响应式布局**: 适配不同屏幕尺寸

### 开发建议

- 新增页面直接在 `src/pages/` 创建 `.vue` 文件
- 新增组件放在 `src/components/` 下会自动导入
- 使用 UnoCSS 原子类进行样式编写
- 遵循现有的组件结构和命名约定
- 利用 TypeScript 进行类型安全开发

## 最近功能修改记录

### 2025-07-28 UI 组件优化
1. **Sheet 组件自定义** (`src/components/ui/sheet/SheetContent.vue:46-50`)
   - 注释掉默认的右上角关闭按钮（X按钮）
   - 用户现在只能通过遮罩层或其他方式关闭 Sheet

2. **Input 组件样式优化** (`src/components/ui/input/Input.vue:26`)
   - 边框加粗：`border` → `border-2`
   - 边框颜色更深：`border-input` → `border-light-900 dark:border-dark-100`
   - 移除聚焦时的边框闪烁效果：删除 `transition-colors` 和 `focus-visible:ring-*` 样式

3. **DropdownMenu 搜索引擎切换功能** (`src/pages/index.vue:17-32`)
   - 修正了 DropdownMenu 的正确使用方式
   - 移除了 DropdownMenuRadioGroup 和 DropdownMenuRadioItem（避免原点显示）
   - 改用 DropdownMenuItem 配合点击事件实现搜索引擎切换
   - 添加了当前选中项的背景高亮效果 (`bg-accent`)
   - 搜索引擎选项包含图标和名称，点击即可切换

### shadcn-vue 组件定制经验

- **组件源码透明**：所有 UI 组件都是源码形式，可以直接修改样式和行为
- **无运行时依赖**：不像传统 UI 库，修改后不会被覆盖
- **AI 友好**：源码清晰，便于 AI 理解和给出准确修改建议
- **定制灵活**：可以根据项目需求任意修改组件实现