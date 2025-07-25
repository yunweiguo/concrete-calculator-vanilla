# Concrete Calculator Project Prompt

## 1. 项目简介 (Project Introduction)

**项目名称:** Concrete Calculator (混凝土计算器)

**核心目标:** 创建一个快速、准确且用户友好的在线混凝土计算器，旨在通过提供精确的材料用量和成本估算，帮助全球的 DIY 爱好者和小型承包商节省时间和金钱。

**核心功能:**
- **多形状计算:** 支持矩形（板/墙）、圆形（柱）等多种形状的混凝土体积计算。
- **材料明细:** 根据混凝土标号，自动估算所需的水泥、沙子和石子的数量。
- **成本估算:** 提供材料和人工的成本明细，帮助用户进行预算规划。
- **单位制切换:** 支持英制（英尺/磅）和公制（米/公斤）之间的无缝切换。
- **国际化 (i18n):** 提供英语、中文两种语言版本，服务全球用户
- **计算历史:** 将用户的计算结果保存在本地浏览器中，方便随时查阅。
- **响应式设计:** 确保在桌面、平板和移动设备上都有一致的优质体验。

**技术栈:**
- **前端:** Vanilla HTML, CSS, JavaScript
- **CSS 框架:** Tailwind CSS (通过 CDN)
- **分析:** Google Analytics

**开发理念:**
- **性能优先:** 追求极快的加载和计算速度，无任何编译步骤。
- **SEO 驱动:** 基于关键词研究，通过“内容中心辐射模型 (Hub and Spoke Model)”创建有价值的内容，以获取自然流量。
- **用户中心:** 持续优化 UI/UX，确保工具的简单、直观和易用性。

## 2. 后续开发迭代计划 (Future Development Plan)

### 第一阶段: 内容中心建设与内部链接 (Completed)

- **[x] 完善主页链接与导航:** 更新 `index.html`，添加了指向新页面的卡片链接，并为全站所有页面（`index.html`, `slab-calculator.html`, `footing-calculator.html`, `bag-calculator.html`, `guides/how-to-calculate-concrete.html`）增加了统一的响应式导航栏和中心化功能脚本，从而构建了强大的内部链接网络并解决了语言同步问题。
- **[x] 增强内部链接:** 在 `index.html` 和 `bag-calculator.html` 的 FAQ 部分添加了上下文相关的内部链接，以增强用户导航和 SEO。**注意: 由于工具限制，`translations.js` 文件需要手动修复语法错误才能使新链接的文本完全生效。**

### 第二阶段: 扩展内容生态系统 (Completed)

- **[x] 创建新页面 `rebar-calculator.html`:**
  - **主题:** 钢筋计算器（Rebar Calculator），支持用户根据混凝土结构尺寸、钢筋间距、直径等参数，快速计算所需钢筋的总长度、根数和理论重量。
  - **功能点:**
    - 支持多种钢筋规格（直径、长度、间距可选）。
    - 自动换算单位（米/英尺、公斤/磅）。
    - 结果可导出/复制。
    - 交互式输入校验。
  - **多语言支持:** 英文（`en/rebar-calculator.html`）、中文（`zh/rebar-calculator.html`）。

- **[x] 创建新的专业计算器:**
  - **[x] 混凝土圆柱/圆管 (Column/Sonotube) 计算器。**
    - 支持输入直径、高度、数量，自动计算体积和材料需求。
    - 多语言支持。
  - **[x] 混凝土台阶 (Stairs) 计算器。**
    - 支持多级台阶参数输入，自动分段计算体积。
    - 多语言支持。

- **[x] 内容型页面扩展：**
  - **FAQ 页面:** 汇总常见问题，提升SEO和用户体验。
  - **案例/用户故事:** 展示真实用户的使用案例，增强信任。
  - **术语表/知识库:** 解释混凝土相关专业术语。
  - **多语言同步:** 保证所有内容型页面中英文版本同步。

- **[x] 应用结构化数据 (Schema Markup):**
  - 为指南页面添加 `HowTo` schema。
  - 为问答部分添加 `FAQPage` schema。
  - 适配所有新内容页面，提升搜索引擎富媒体摘要（Rich Snippets）概率。

### 第三阶段: 功能增强与用户体验优化 (In Progress)

- **[x] "分享" 功能:**
  - 在结果区增加“分享”按钮，支持一键复制链接、分享到主流社交平台（如微信、WhatsApp、Facebook、Twitter等）。
  - 可选：生成带参数的短链，便于分享具体计算结果。

- **[ ] 价格本地化:**
  - 允许用户输入本地材料单价（如每袋水泥、沙、石子价格），自动计算总成本。
  - 支持保存常用价格，提升复用体验。

- **[ ] UI/UX 审查与优化:**
  - 全面梳理页面布局、配色、按钮、输入框等交互细节。
  - 收集用户反馈，持续迭代。
  - 增强移动端体验，优化触控区域和响应速度。

- **[ ] 网站性能审计与优化:**
  - 图像压缩与格式升级（如 WebP）。
  - 浏览器缓存策略优化。
  - 精简和合并 JS/CSS，减少请求数。
  - 懒加载非核心资源。

- **[ ] 全面可访问性 (A11y) 审查:**
  - 检查 heading 结构、ARIA 标签、色彩对比度。
  - 为所有图片添加描述性 `alt` 文本。
  - 保证键盘导航和屏幕阅读器友好。

- **[ ] 计算历史与本地存储优化:**
  - 优化本地历史记录的展示与管理。
  - 支持导出/清空历史。

- **[ ] 结构组件化:**
  - 抽离 footer、FAQ、常用弹窗等为独立组件，便于维护和复用。

### 第四阶段: 代码管理与部署

- **[ ] 自动化与测试:**
  - 编写核心 JS 逻辑的单元测试。
  - 自动化 E2E 测试覆盖主要用户路径。
  - 持续集成（CI）：自动化构建、测试、部署流程。

- **[ ] 监控与告警:**
  - 集成基础的前端监控（如 Sentry、Google Analytics 事件追踪）。
  - 关键功能异常自动告警。

- **[ ] 自动化站点地图生成:**
  - 脚本自动基于 Git 历史生成 `sitemap.xml`，自动更新 `lastmod`。

- **[ ] 生产环境部署与回滚:**
  - 自动化部署到生产环境。
  - 支持一键回滚。

### 第五阶段: 数据分析与增长

- **[ ] 埋点与数据分析:**
  - 细化 Google Analytics 事件，分析用户行为、转化路径。
  - 跟踪各计算器、内容页面的访问和使用频率。

- **[ ] A/B 测试与持续优化:**
  - 针对页面布局、文案、功能等进行 A/B 测试，优化转化率。

- **[ ] SEO 持续优化:**
  - 定期关键词排名监控，调整内容策略。
  - 持续完善结构化数据和内部链接。

- **[ ] 用户反馈收集与迭代:**
  - 增加用户反馈入口，定期整理和评估。
  - 快速响应高频需求和痛点。

---

### 新增页面时需要同步修改的部分：

当您需要新增一个计算器页面（例如 `new-calculator.html`）时，除了创建新的 HTML 文件和实现其特定逻辑外，还需要在以下几个关键部分进行同步修改，以确保网站的完整性和一致性：

1.  **创建新的 HTML 文件：**
    *   在 `en/` 目录下创建 `new-calculator.html`。
    *   如果支持多语言，在 `zh/` 目录下创建 `new-calculator.html`。
    *   确保新页面的 `head` 部分包含正确的 SEO Meta Tags（`title`, `description`, `canonical`, `hreflang`, `og:` 和 `twitter:` 标签），并动态加载 `header.html` 和 `footer.html`。

2.  **更新 `sitemap.xml`：**
    *   手动或通过脚本（如果已自动化）将新页面的 URL 添加到 `sitemap.xml` 中，以便搜索引擎抓取。

3.  **更新 `robots.txt`：**
    *   如果新页面需要被搜索引擎索引，请确保 `robots.txt` 文件允许其抓取。

4.  **更新导航菜单 (`header.html`)：**
    *   修改 `en/header.html` 和 `zh/header.html` 文件，在计算器下拉菜单 (`#calculators-menu`) 中添加新计算器的链接。

5.  **更新首页 (`index.html`)：**
    *   修改 `index.html` 和 `zh/index.html` 文件，在“Explore Our Specialized Calculators”部分添加新计算器的卡片链接。

6.  **更新指南页面 (`how-to-calculate-concrete.html`)：**
    *   如果新计算器与“How to Calculate Concrete”指南相关，请在 `en/guides/how-to-calculate-concrete.html` 和 `zh/guides/how-to-calculate-concrete.html` 中添加指向新计算器的链接。

7.  **更新公式页面 (`concrete-calculator-formula.html`)：**
    *   如果新计算器引入了新的计算公式，请在 `en/concrete-calculator-formula.html` 和 `zh/concrete-calculator-formula.html` 中添加这些公式的解释。

8.  **更新核心 JavaScript (`script.js`)：**
    *   如果新页面是计算器，可能需要在 `script.js` 中添加新的 DOM 元素引用。
    *   实现新计算器的核心计算逻辑。
    *   更新 `displayResults` 函数，使其能够调用新计算器的显示逻辑。
    *   在 `translations` 对象中添加新页面所需的翻译键值对。

9.  **更新 `generate_sitemap.sh` (如果存在)：**
    *   如果站点地图是自动生成的，请确保 `generate_sitemap.sh` 脚本能够正确识别并包含新的 HTML 文件。

这些步骤将确保新页面不仅功能完善，而且能够无缝集成到现有网站结构中，并对用户和搜索引擎都可见。