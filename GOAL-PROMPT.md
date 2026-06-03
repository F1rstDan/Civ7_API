# /goal 长期任务提示词

> 以下内容是当你使用 /goal 更新文明7 API 文档 命令时，AI 应该遵循的完整指令。
> 可以直接复制以下内容作为 goal 的 objective，或作为 AI 的 system prompt。

---

## 任务提示词（直接复制使用）

`
你正在执行一个长期项目：为《文明7》Mod 开发者构建一个可搜索的 API 文档网站。

## 第一步：阅读计划文档

在做任何操作之前，你必须先完整阅读以下两个文档：
1. D:\Games Design\Civ7_mod\Civ7_API\PLAN.md — 初期建设计划（项目目标、技术方案、API Schema、执行步骤）
   - 特别注意 2.6 节：调试面板作为权威 API 用法参考
2. D:\Games Design\Civ7_mod\Civ7_API\UPDATE-WORKFLOW.md — 长期更新流程（游戏更新后如何同步文档）

阅读完成后，根据当前项目状态决定执行哪个阶段。

## 项目状态判断

检查以下文件/目录是否存在来判断进度：
- D:\Games Design\Civ7_mod\Civ7_API\package.json → 阶段一是否完成
- D:\Games Design\Civ7_mod\Civ7_API\docs\.vitepress\config.js → VitePress 是否已配置
- D:\Games Design\Civ7_mod\Civ7_API\docs\data\*.json → 是否已有 API 数据
- D:\Games Design\Civ7_mod\Civ7_API\docs\api\*.md → 是否已有文档页面

根据判断结果，从 PLAN.md 第 6 节「执行计划」中对应的阶段开始执行。

## 已完成进度（截至 2026-06-03）
- ✅ Phase 0-13 全部完成
- ✅ 45 个 API 文档页面已创建，含游戏源码和调试面板的完整 API
- ✅ 侧边栏已按 6 大分类整理（核心引擎、游戏对象、UI 框架、地图系统、常量与枚举、事件参考）
- ✅ 所有文档标题已统一为"英文名称 中文释义"格式
- ⏳ Phase 8（游戏逻辑函数）为未来长期任务

## 执行原则

1. **增量推进**：不要试图一次完成所有 API。每次执行一个大类（如先完成 GameplayMap，再做 Players）。
2. **源文件路径**：所有源码位于 D:\Games Design\Civ7_mod\.官方变动\modules\
3. **全局 API 优先**：按 PLAN.md 第 2.3 节的全局对象表格顺序执行（engine → GameplayMap → GameInfo → Players → Configuration → Camera → Component）
4. **JSON 格式**：严格遵循 PLAN.md 第 4 节的 Schema
5. **不要猜测**：无法推断的参数描述标记为 "待确认"，不要编造
6. **来源追溯**：每个条目必须记录 sourceFiles
7. **调试面板优先**：当 .ltp 中有官方代码时，优先在文档中标注来源
8. **状态标记**：新录入的 API 默认 "status": "inferred"

## 每次执行的输出

每次执行结束时，输出一份简报：
- 本次完成了哪个 API 大类
- 新增了多少个 API 条目
- 哓些条目需要用户游戏内验证（status != verified）
- 下次应从哪里继续

## 完成标准

### 单次 goal 完成条件
当以下任一条件满足时，本次 goal 可以结束：
- 一个完整的 API 大类（如 GameplayMap）已录入 JSON 并生成 Markdown 页面
- 阶段一（项目初始化）已完成，VitePress 站点可正常启动
- 一次增量更新已执行完毕（源文件变动 → JSON 更新 → 页面同步）

### 整个项目完成条件
当 PLAN.md 第 6.2 节「整体项目完成定义」中的所有检查项都已完成时，整个项目算阶段性完成。

## 如果是更新模式

如果用户说「游戏更新了」或提供了新的源文件变动信息：
1. 先阅读 UPDATE-WORKFLOW.md
2. 按更新流程执行差异分析 → 更新 JSON → 同步页面
3. 输出更新简报

## 技术提示

- 使用 g (ripgrep) 搜索源文件，效率远高于其他工具
- VitePress 启动命令：
px vitepress dev docs
- JSON 文件使用 UTF-8 编码
- Markdown 中使用 VitePress 的自定义容器来高亮重要信息
`

---

## 使用方式

### 方式一：作为 goal 的 objective

`
/goal 更新文明7 API 文档

objective: |
  你正在执行一个长期项目：为《文明7》Mod 开发者构建一个可搜索的 API 文档网站。
  
  第一步：阅读 D:\Games Design\Civ7_mod\Civ7_API\PLAN.md 和 D:\Games Design\Civ7_mod\Civ7_API\UPDATE-WORKFLOW.md。
  
  然后根据项目当前状态，从 PLAN.md 第 5 节的对应阶段开始执行。
  
  源文件路径：D:\Games Design\Civ7_mod\.官方变动\
  （包含 modules/ 和调试面板 TunerPanels/ 两个数据源）
  
  每次完成一个 API 大类后输出简报，下次继续下一个大类。
  
  完成标准：PLAN.md 第 6.2 节的所有检查项。
`

### 方式二：作为对话开头

直接对 AI 说：

> 请阅读 D:\Games Design\Civ7_mod\Civ7_API\PLAN.md，然后开始执行阶段一（项目初始化）。源文件在 D:\Games Design\Civ7_mod\.官方变动\modules\。

### 方式三：增量更新

直接对 AI 说：

> 文明7 更新了，请阅读 D:\Games Design\Civ7_mod\Civ7_API\UPDATE-WORKFLOW.md，然后帮我检查 modules/ 下的变动并更新 API 文档。

### 方式四：更新常量与枚举

直接对 AI 说：

> 更新文明7的常量文档。运行 `cd scripts && node update-constants.mjs`，然后检查输出是否正常。
