# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

这是一个多语言混凝土计算器网络应用程序，使用原生 HTML、CSS（通过 CDN 的 Tailwind）和 JavaScript 构建。它为各种混凝土结构提供计算，包括平板、地基、柱子、楼梯等。该应用程序支持英制和公制单位，并提供英文和中文版本。

## 架构

### 核心结构
- **单页应用程序**: 主要功能在 `index.html` 中，采用模块化组件结构
- **无构建过程**: 使用原生 JavaScript 和通过 CDN 的 Tailwind CSS - 无 npm、webpack 或构建工具
- **本地化**: 内容按 `/en` 和 `/zh` 目录组织，每种语言有单独的 HTML 文件
- **静态网站**: 所有页面都是直接提供的静态 HTML 文件

### 关键文件
- `index.html` - 主应用程序文件（根级别，英文版本）
- `script.js` - 核心 JavaScript 功能（约 43KB）
- `mobile-optimization.css` - 移动端特定样式
- `generate_sitemap.sh` - 从 git 历史记录生成 sitemap.xml 的 bash 脚本
- `content-sync.sh` - 内容同步和一致性检查工具
- `add_minimal_static_content.sh` - 批量添加最小化静态内容的脚本
- `en/` - 英文语言页面
- `zh/` - 中文语言页面

### 计算器类型
应用程序包括多个专用计算器：
- 平板计算器
- 地基/基础计算器  
- 柱/圆柱计算器
- 楼梯计算器
- 袋装计算器
- 钢筋计算器
- 成本计算器

## 开发命令

由于这是一个无构建过程的静态网站，开发工作流程很简单：

```bash
# 在浏览器中打开应用程序
open index.html

# 生成站点地图（根据 git 历史更新 sitemap.xml）
./generate_sitemap.sh

# 内容同步和一致性检查
./content-sync.sh

# 本地测试（使用任何本地服务器）
python -m http.server 8000
# 或者
npx serve .
```

### 内容管理和同步

项目采用**混合静态/动态架构**以确保 SEO 优化和用户体验：

- **最小化静态内容**: 每个页面都包含基本的 header 和 footer 内容，用于 SEO 和禁用 JavaScript 的用户
- **动态内容增强**: JavaScript 加载完整的导航和功能
- **内容同步工具**: 使用 `content-sync.sh` 确保一致性
- **批量处理**: 使用 `add_minimal_static_content.sh` 批量更新静态内容

这种架构平衡了 SEO 需求与代码维护的复杂度。

## 代码结构和模式

### JavaScript 架构
- **模块化设计**: 代码组织成清晰的部分（翻译、工具、DOM 元素、事件处理程序）
- **无框架依赖**: 纯原生 JavaScript
- **翻译系统**: 集中的翻译对象，支持语言切换
- **本地存储**: 用于计算历史记录和用户偏好
- **事件驱动**: 使用事件委托和监听器模式

### 关键 JavaScript 函数
- `getLang()` - 从文档获取当前语言
- `t(key)` - 多语言支持的翻译函数
- 每种形状/类型的计算函数
- 单位转换工具
- 材料估算算法

### HTML 结构
- **语义化 HTML5**: 使用适当的语义元素
- **响应式设计**: 使用 Tailwind CSS 的移动优先方法
- **可访问性**: 适当的 ARIA 标签和键盘导航
- **SEO 优化**: 结构化数据、元标签和规范 URL
- **混合架构**: 最小化静态内容 + 动态增强
  - 静态 header/footer 包含品牌 logo 和语言切换
  - JavaScript 加载完整导航和交互功能
  - `<noscript>` 标签提供禁用 JavaScript 时的提示

### CSS/样式
- **Tailwind CSS**: 通过 CDN 快速开发
- **移动优先**: 具有断点的响应式设计
- **自定义样式**: `mobile-optimization.css` 中的额外 CSS 用于特定需求

## 测试

没有使用正式的测试框架。测试方法：
- 在不同浏览器中进行手动测试
- 在各种屏幕尺寸上进行响应式测试
- 跨语言功能测试
- 计算器准确性验证

## 部署

该网站专为静态托管设计：
1. 所有文件都可以部署到任何静态网络主机
2. 不需要服务器端处理
3. 集成了 Google Analytics 和 AdSense
4. 通过 bash 脚本自动生成站点地图

## 国际化

- **目录结构**: `/en` 为英文，`/zh` 为中文
- **翻译键**: 在 JavaScript `translations` 对象中集中
- **URL 结构**: 特定语言的 URL（例如 `/zh/index.html`）
- **SEO**: 适当的 hreflang 标签和特定语言的元标签

## 分析和 SEO

- **Google Analytics**: 集成 GA4（ID: G-3T1C6ZTJJY）
- **Google AdSense**: 集成变现（ca-pub-7940770394935866）
- **SEO 优化**: 全面的元标签、结构化数据、站点地图
- **生产环境检查**: 分析仅在 `concrete-calculator.pro` 域名上加载

## 常见开发任务

### 添加新的计算器类型
1. 向 `script.js` 中的 `translations` 对象添加翻译键
2. 在 `/en` 和 `/zh` 目录中创建计算器 HTML 结构
3. 向 `script.js` 添加计算逻辑
4. 更新导航和内部链接

### 更新翻译
- 修改 `script.js` 中的 `translations` 对象
- 确保所有语言都有完整的翻译
- 测试语言切换功能

### 添加新语言
1. 创建新的语言目录（例如 `/es`）
2. 复制并翻译所有 HTML 文件
3. 向 JavaScript 添加翻译键
4. 更新语言切换逻辑

## 文件命名约定

- HTML 文件使用 kebab-case（例如 `bag-calculator.html`）
- 将 JavaScript 保留在单个 `script.js` 文件中
- 计算器页面使用描述性名称
- 在所有语言中保持一致的命名

## 内容同步最佳实践

### 静态内容管理
1. **最小化原则**: 静态内容只包含核心元素（品牌 logo、语言切换、基本页脚）
2. **一致性检查**: 使用 `./content-sync.sh` 定期检查内容一致性
3. **批量更新**: 使用 `add_minimal_static_content.sh` 批量处理多个文件
4. **备份策略**: 重要修改前脚本会自动创建 `.backup` 文件

### 开发工作流程
1. 修改动态 header/footer 内容（`en/header.html`, `en/footer.html`）
2. 运行 `./content-sync.sh` 检查一致性
3. 如需批量更新静态内容，使用 `add_minimal_static_content.sh`
4. 更新站点地图：`./generate_sitemap.sh`
5. 测试功能并提交更改

### 避免的问题
- **代码重复**: 最小化静态内容减少重复
- **维护复杂度**: 使用自动化工具确保一致性
- **SEO 降级**: 静态内容确保搜索引擎可以正确索引
- **用户体验**: 禁用 JavaScript 的用户仍能获得基本功能