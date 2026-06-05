---
name: doc-format
description: >
  标准化 Civ7 API 文档的排版格式。用于：新建 docs/api/*.md 文档时套用统一模板；
  审查/整改存量文档使其符合 API 弹窗标签规范和结构规范；为大型对象（如 Players、Cities）
  决定是否拆分子系统页；当文档缺少代码示例或来源标注(源文件引用)时，自动搜索游戏源码（.js / .ltp）补全。
  触发条件：用户提到"规范文档"、"整理格式"、"新建 API 文档"、"文档模板"、
  "拆分子系统"、"文档格式审查"，或要求对 docs/api/ 下的 .md 文件做排版。
---

# Doc Format

Civ7 API 文档统一排版规范。模板文件在 `assets/api-page-template.md`。API 归属校验脚本在 `scripts/check_api_doc_ids.py`。

## 工作流

根据用户意图选择对应流程：

| 意图 | 流程 |
|------|------|
| 新建文档 | 复制模板 → 查找来源 → 搜索代码示例 → 填充内容 |
| 审查存量文档 | 读取目标文件 → 按检查清单逐项对照 → 校验 API 归属 → 缺少示例时搜索补全 → 输出问题报告 |
| 整改存量文档 | 读取目标文件 → 按检查清单修复 → 校验 API 归属 → 搜索补全缺失示例 → 写回文件 |

## YAML 元数据

每个 `docs/api/*.md` 都应在 frontmatter 中声明文档范围。先读 YAML，再决定方法表和 `<API>` 的校验策略。

```yaml
---
title: Units 单位
doc_type: object-api
summary: 单位全局对象，负责单位获取、创建、位置、状态和属性修改。
primary_scope:
  - Units
related_scope:
  - GameInfo.Units
  - player.Units
source:
  - TunerPanels/Units.ltp
  - modules/base-standard/scripts/age-transition-post-load.js
---
```

字段含义：
- `title`：页面标题，必填。
- `doc_type`：文档类型，必填。常用值：`object-api`、`system-topic`、`reference`、`ui-api`。
- `summary`：一句话说明本页内容边界，后续更新时用来判断是否跑题。
- `primary_scope`：本页主覆盖 API 范围，通常需要进入主方法列表并覆盖 `<API>` 弹窗。
- `related_scope`：允许提及的相关 API 范围，通常放在 GameInfo 关联表、相关对象、子系统或示例中，默认不要求 `<API>` 弹窗。
- `source`：统一记录来源文件，可包含 `.ltp`、`.js`、`.xml` 或其他来源路径。

`doc_type` 策略：
- `object-api`：单一对象页，如 `Units`、`Camera`、`Game`。主方法列表只放 `primary_scope`；`related_scope` 可以在后文提及，但不能混入主方法列表。
- `system-topic`：系统专题页，如科技文化树、贸易、文化。允许多个 `primary_scope`，主方法列表可按 H3 分组收录这些 scope。
- `reference`：常量、事件、全局说明、统计类文档。不要强制方法列表和 `<API>` 覆盖率，重点检查结构、来源和示例。
- `ui-api`：UI 层对象、组件、世界 UI 等。允许对象、类、实例方法混合，但必须在标题或表格中标明所属层级。
- `generated-reference`：由脚本自动生成的参考文档（如 `constants.md`）。默认跳过审查和整改，除非用户明确指名该文件。不可手动编辑，应通过生成脚本更新。

## 来源与代码示例查找

### 来源目录

游戏源码位于 `D:\Games Design\Civ7_mod\.官方变动`，详细目录结构见 `docs/_link-source-addr.md`。

两类来源文件：
- **`.js` 文件**（`modules/` 下）：游戏逻辑实现，包含 API 调用模式和用法
- **`.ltp` 文件**（`TunerPanels/` 下）：Firaxis 调试面板定义，内嵌官方 JS 代码片段，是确认 API 用法的权威参考

### 搜索代码示例

当目标文档缺少代码示例时，主动搜索源码补全：

```powershell
# API 搜索通用规则：始终用单词边界避免后缀误匹配
# 例如搜 "Camera" 会误匹配 "ForegroundCamera"、"BackgroundCamera"
# 用 (?<![A-Za-z0-9_$]) 确保 API_NAME 前面不是标识符字符

# 在 .ltp 面板中搜索目标 API（优先，权威性最高）
rg -n "(?<![A-Za-z0-9_$])API_NAME\." "D:\Games Design\Civ7_mod\.官方变动\TunerPanels" -g "*.ltp"

# 在 .js 源码中搜索目标 API
rg -n "(?<![A-Za-z0-9_$])API_NAME\." "D:\Games Design\Civ7_mod\.官方变动\modules" -g "*.js"

# 搜索子系统用法（如 player.Treasury）
rg -n "(?<=\.)Treasury\." "D:\Games Design\Civ7_mod\.官方变动\TunerPanels" -g "*.ltp"
```

**后缀误匹配警示**：名称短的 API 容易被更长标识符的后缀命中。例如搜索 `Camera` 时，`ForegroundCamera`、`BackgroundCamera` 等也会被匹配。始终在搜索 API 名称时使用单词边界 (`(?<![A-Za-z0-9_$])`)，并在写入方法列表前确认完整接收者链（`ForegroundCamera.reset` 不等于 `Camera.reset`）。

### API 归属判定（必须）

先根据 YAML 的 `doc_type`、`primary_scope`、`related_scope` 判断本页允许覆盖的 API 范围。问题不是禁止相关 API 出现，而是避免把相关 API 误放进主方法列表，导致读者误以为短写可调用。

**判定规则**：
- 主方法列表只收录 `primary_scope`。例如 `units.md` 的主方法列表只放 `Units.get`、`Units.restoreMovement` 等；`GameInfo.Units.lookup` 和 `player.Units.getUnitIds` 可放在 GameInfo 关联表、相关对象、子系统或示例中。
- `system-topic` 可以有多个 `primary_scope`。例如 `progression-trees.md` 可同时收录 `Game.ProgressionTrees` 与 `GameInfo.ProgressionTrees`，但 `<API>` id 应尽量使用完整链条。
- `related_scope` 默认不进入主方法列表，也不要求 `<API>` 弹窗；除非该页明确把它升级为 `primary_scope`。
- 实例对象或子系统要写完整归属，如 `unit.Experience.getAllPromotions`、`player.Units.getUnitIds`，不要缩短成 `Experience.getAllPromotions` 或 `Units.getUnitIds`。
- `GameInfo.<Table>.lookup/find/forEach` 属于 `GameInfo` 表接口，不属于 `<Table>` 全局对象；例如 `GameInfo.Units.lookup` 不应写成 `Units.lookup`。
- 如果源码只出现 `A.B.method(...)`，没有出现独立的 `B.method(...)`，不得把它记录为 `B.method`。
- 如果不能从源码确认完整接收者链，标注为“未验证前提”，不要写入方法列表。

**搜索顺序**：
```powershell
# 1. 搜索精确直接接收者，避免匹配 GameInfo.Units.lookup / ForegroundCamera.method 等误命中的情况
rg -n "(?<![\w$.\])(?<![A-Za-z0-9_$])Units\.lookup\s*\(" "D:\Games Design\Civ7_mod\.官方变动" -g "*.ltp" -g "*.js"

# 2. 搜索同名方法的所有链条，确认是否只存在更长接收者
rg -n "(\w+\.)+Units\.lookup\s*\(" "D:\Games Design\Civ7_mod\.官方变动" -g "*.ltp" -g "*.js"

# 3. 对实例/子系统 API，搜索实际变量链和属性链
rg -n "(player|pPlayer)\.Units\.getUnitIds\s*\(" "D:\Games Design\Civ7_mod\.官方变动" -g "*.ltp" -g "*.js"
```

**后缀误匹配防范**：如果 API 名称是其他标识符的后缀（如 `Camera` 被 `ForegroundCamera` 包含），必须用单词边界 `(?<![A-Za-z0-9_$])` 排除。从源码确认后只收录真正的直接调用者。

**写入前检查**：
- 主方法列表中的 `<API>` 必须落在 `primary_scope`，并能对应源码中的同一完整接收者链。
- 快速示例和弹窗示例可以引用 `related_scope`，但不能因此把相关 API 加入主方法列表。
- `related_scope` 使用反引号普通文本即可；只有需要弹窗解释、且本页确实覆盖该 API 时才使用 `<API>`。
- 对 `Game.ProgressionTrees.getNode` 这类多段链条，优先使用完整 `<API>` id；短 id 只在能确定没有歧义时使用。

**代码示例编写原则**：
- 精简为主，突出 API 核心作用，省略无关上下文
- 每个示例 3-8 行，展示调用方式和返回值即可
- 首行写 `// 来源 文件名.ltp` 或 `// 来源 文件名.js` 标注出处
- 如果从多个来源拼接，标注主要来源即可

## 文档结构（必须按顺序）

```
1. frontmatter（title、doc_type、summary、primary_scope、related_scope、source）
2. H1 标题
3. 一句话定位
4. 快速示例
5. H2 方法列表（表格 + <API> 触发器）
6. H2 子对象/子系统（可选）
7. H2 常用枚举（可选）
8. H2 GameInfo 关联表（可选）
9. H2 相关全局对象（可选）
10. <API> 弹窗内容块（全部放页面最底部）
```

## 格式规范

### 命名
- 文件名：小写英文 + 连字符，如 `gameplay-map.md`
- frontmatter：至少包含 `title`、`doc_type`、`summary`、`primary_scope`、`related_scope`、`source`
- H1：`# 英文名 中文名`

### 代码块
- 统一 ` ```javascript ` 围栏，必须闭合
- 代码块内首行写 `// 来源 xxx.ltp` 或 `// 来源 xxx/xxx.js`
- 代码块内第二行，一句话简要说明代码功能 `// 简要描述功能`

### 弹窗标签

**触发器**（方法总表中）：
```markdown
| <API>Camera.lookAtPlot</API> | iX, iY | `void` | 说明 |
```
- `<API>` 内**不加反引号**，textContent 即为 id
- id 格式：优先使用完整接收者链，如 `Game.ProgressionTrees.getNode`、`GameInfo.Units.lookup`

**内容块**（页面最底部）：
````markdown
<API id="Camera.lookAtPlot"><h3>Camera.lookAtPlot(iX, iY)</h3>

**说明**: 一句话说明。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 xxx/xxx.js
// 简要描述功能
Camera.lookAtPlot(10, 20);
```

</API>
````

内容块内部顺序：说明 → 参数表（无参数则写 `**参数**: 无`） → 返回值 → 使用示例（可选） → 来源（标注 .ltp 或 .js 出处）

**`<h3>` 标题说明**：
- `<h3>` 必须紧贴 `<API>` 标签，或放在内部第一行
- 该 `<h3>` 在 VitePress 中随 `display:none` 自动隐藏，在 GitHub / VS Code 等通用 MD 浏览器中正常显示
- 弹窗标题自动从中提取，无需 `title` 属性；弹窗正文不会重复出现标题
- 若确需覆盖弹窗标题（如 id 与显示名不同），仍可显式传入 `title` prop


## 大型对象拆分策略

当对象包含大量子系统时，采用 **主文件 + 独立子系统页**：

**主文件保留**：入口 API、子系统总览表、高频子系统摘要、链接

**独立子系统页适用**：API 超过 8 个方法、有独立枚举/GameInfo 表、被多个上游引用

**不拆分**：API 少于 5 个方法、仅服务于父对象

## 检查清单

审查或整改时逐项对照：

- [ ] 有 frontmatter（title 字段）
- [ ] 有 `doc_type`、`summary`、`primary_scope`、`related_scope`、`source`
- [ ] H1 格式正确（# 英文 中文）
- [ ] 有一句话定位
- [ ] 有快速示例代码块
- [ ] 方法表使用 `<API>` 触发器（非 backtick）
- [ ] `<API>` 内无反引号
- [ ] 主方法列表中的每个 `<API>` 都落在 `primary_scope`
- [ ] `related_scope` 可在正文、示例、相关章节出现，但未混入主方法列表
- [ ] 未把 `GameInfo.X.method`、`player.X.method` 等误写为 `X.method`
- [ ] 所有代码块标注 ` ```javascript `
- [ ] 所有代码块已闭合
- [ ] 代码块内有 `// 来源 xxx.ltp` 或 `// 来源 xxx/xxx.js` 注释
- [ ] 代码块内有 `// 简要描述功能` 注释
- [ ] 有代码示例（若缺失，搜索 .ltp / .js 源码补全）
- [ ] `<API>` 内容块放在页面最底部
- [ ] 内容块包含：说明、参数表、返回值、来源
- [ ] 大型文件（>350 行）是否需要拆分
- [ ] 运行脚本检查短写风险：`python .agents/skills/doc-format/scripts/check_api_doc_ids.py docs/api/目标.md`

## 新建文档流程

1. 读取 `assets/api-page-template.md`
2. 查阅 `docs/_link-source-addr.md` 确认来源目录
3. 确定 `doc_type`、`summary`、`primary_scope`、`related_scope`、`source`
4. 用 `rg` 在 TunerPanels（.ltp）和 modules（.js）中搜索目标 API 的用法，并按“API 归属判定”确认完整接收者链
5. 复制模板为目标文件名
6. 替换占位符，用搜索到的真实代码填充示例（精简到 3-8 行，突出核心 API）
7. 按实际 API 填充方法表和内容块
8. 运行脚本检查短写风险；脚本有警告时，回到源码确认归属后再输出

## 审查/整改流程

1. 读取目标文件
2. 先读 YAML，确认 `doc_type`、`primary_scope`、`related_scope`
3. 如果 `doc_type` 为 `generated-reference`：确认是自动生成文件，跳过后续所有检查；用户指名时才进入手动审查
4. 逐项对照检查清单
5. 校验主方法列表是否只包含 `primary_scope`；发现 `related_scope` 混入时，移到 GameInfo、相关对象或子系统章节
6. 如果缺少代码示例：用 `rg` 搜索源码（优先 .ltp，其次 .js），补充精简示例
7. 如果 YAML `source` 字段缺失或不完整：搜索确认后补全
8. 运行脚本检查短写风险：`python .agents/skills/doc-format/scripts/check_api_doc_ids.py docs/api/目标.md`
9. 输出问题列表（审查）或直接修复（整改）
10. 整改时保持现有内容不变，只调整结构和格式

## 全链路验证

输出前按以下链路自查，并把无法确认的部分标为“未验证前提”：

输入：用户目标文件和目标对象是否明确。
处理流程：模板、来源搜索、API 归属判定、示例提取是否都执行。
状态变化：新增/删除/移动的 `<API>` 触发器是否同步到底部内容块。
输出：方法数量、标题、源码引用、弹窗 id 是否一致。
上下游影响：被移出方法表的相关 API 是否仍在合适章节保留，链接和 `<API>` 触发器是否不再误导弹窗系统。
- [ ] 有 frontmatter（title、doc_type、summary 字段）
- [ ] `doc_type` 为 `generated-reference` 时仅验证 YAML 完整性，跳过方法列表和 `<API>` 校验
