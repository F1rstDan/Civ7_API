---
name: doc-update
description: >
  标准化 Civ7 API 文档的格式与内容更新，并维护文档站点。用于：使用格式刷一键美化排版；
  对现有 API 文档进行语义正确性校验（验证）；搜索源码查漏补缺（补全）；使用模板新建文档；
  维护文档网站（维护网站）；以及提供全方位的“全面整改”复合流程。
  触发条件：用户提到"格式刷"、"更新文档"、"查漏补缺"、"补全 API"、"验证 API"、"校验 API"、
  "维护侧边栏"、"同步侧边栏"、"更新主页"、"新建 API 文档"、"全面整改"、"彻底整改"、"大修文档"，或要求对 docs/api/ 下 the .md 文件及 VitePress 网站进行维护。
---

# Doc Update & Website Maintenance

Civ7 API 文档更新、校验、补全及网站维护的统一工作流指南。

* 模板文件：`assets/api-page-template.md`
* 校验脚本：`scripts/check_api_doc_ids.py`
* 网站配置文件：`docs/.vitepress/config.js`
* 网站主页文件：`docs/index.md`

---

## 意图判断决策树

当你接收到用户请求时，优先判断属于哪一种意图，并严格执行对应的工作流。**严禁越界执行非该意图相关的修改**。

| 用户意图描述示例 | 匹配意图标识 | 核心行为约束 |
| :--- | :--- | :--- |
| "刷一下 units.md 的格式"、"整理排版"、"统一 markdown 格式" | `format-brush` (格式刷) | 仅调整排版、补全 YAML 结构、修复标签规范。**绝对禁止增删 API，禁止搜索游戏源码**。 |
| "检查 units.md 中的 API 是否正确"、"校验 API 是否写错" | `api-verify` (API 验证) | 提取文档 API，在源码中检索核对存在性与调用链。**仅输出校验报告，或仅修正写错的 API 方法/参数**。 |
| "把 units.md 里漏掉的 API 加一下"、"查漏补缺" | `api-complete` (API 补全) | 对比文档与源码，寻找缺少的 API，**搜寻提取代码示例并增补进文档**。 |
| "新建 gameplay-map 文档"、"创建新的 API 页面" | `doc-create` (新建文档) | 复制模板，检索源码，从零编写生成新 API 页面。 |
| "检查侧边栏"、"侧边栏是不是包含 units 了"、"更新主页更新日期" | `web-maintain` (维护网站) | 扫描 docs/api/ 下的文件，对比并同步 `config.js` 的 `sidebar`，更新 `index.md` 主页展示。**禁止修改任何 .md 文档内容**。 |
| "全面整改 units.md"、"彻底修复此文档"、"大修此 API 页面" | `doc-refactor` (全面整改) | **格式刷 + API 验证 + API 补全的组合流程**。修复格式、验证现有 API 正确性，并补全遗漏的 API 和代码示例。 |

---

## 六大意图工作流指南

### 1. 格式刷 (format-brush)
**目的**：极速、低开销地美化和规范化文档排版。

* **步骤**：
  1. 读取目标 `.md` 文件，解析 YAML frontmatter。
  2. 规范化或补齐 YAML 字段（`title`、`doc_type`、`summary`、`primary_scope`、`related_scope`、`source`、`doc_update`）。
  3. 检查并纠正标题格式：H1 必须为 `# 英文名 中文名`。
  4. 确认所有代码块被 ` ```javascript ` 围栏包裹且已闭合。
  5. 检查方法总表中的 API 触发器：必须使用 `<API>id</API>`，且 textContent **不能带有反引号**。
  6. 检查底部的 `<API>` 弹窗内容块：
     * `<h3>` 必须紧贴在 `<API>` 标签内部第一行或标签之前。
     * 内容块内部顺序为：说明 → 参数表 → 返回值 → 使用示例。
  7. **特别注意**：由于格式刷不会进行源码搜索，若发现某个 API 缺失示例，只需在文档中保留“// 待补充示例”等占位符，**禁止自行去游戏源码中检索**。
  8. 将 YAML 字段 `doc_update` 更新为当前日期（格式 `YYYY-MM-DD`）。

### 2. API 验证 (api-verify)
**目的**：确保文档中已写入的 API 与游戏实际源码完全一致，消灭错字、写错的调用链或错误的参数。

* **步骤**：
  1. 读取目标文档，提取主方法列表中所有的 `<API>` id。
  2. 遍历这些 API 标识符，在游戏源码目录 `D:\Games Design\Civ7_mod\.官方变动` 中利用 `rg` 进行精确搜索（优先 `-F`）。
  3. **核对核心要素**：
     * **存在性**：该 API 在源码中是否真实存在？
     * **接收者链**：API 拼写是否完整？（例如：`Units.get` 而不是 `get`，`player.Units.getUnitIds` 而不是 `Units.getUnitIds`）。如果源码中只有 `A.B.method()`，绝不允许缩写成 `B.method`。
     * **参数一致性**：参数名和个数是否与源码一致。
  4. 运行校验脚本：
     ```powershell
     python .agents/skills/doc-update/scripts/check_api_doc_ids.py docs/api/目标.md
     ```
  5. **输出结果**：生成一份 API 校验报告。若用户要求自动修复，可在确保源码对应的接收者链无误后，局部修正文档中的 API 拼写和参数，禁止更改文档其它内容。

### 3. API 补全 (api-complete)
**目的**：积极查找源码中对应 Scope 下被文档遗漏的 API 方法，补充完整。

* **步骤**：
  1. 读取目标文档，识别 YAML 中的 `primary_scope`。
  2. 利用 `rg` 在源码中对 `primary_scope` 的所有调用和定义进行全面检索。
     * 搜索注意事项（如 `-L`、`--pcre2`、排除后缀误匹配等）见后文“源码搜索注意事项”。
  3. 将搜索到的 API 列表与文档中当前已有的方法表进行比对，提取出“遗漏的 API”。
  4. 对每一个遗漏的 API，从源码中提取其参数、返回值信息。
  5. 检索源码，提取一个精简（3-8行）、具有代表性的真实用法代码段，作为使用示例。
  6. **写入文档**：
     * 将新方法以 `<API>` 触发器的格式增补进 H2 方法列表中。
     * 在文档的最底部，追加对应的 `<API id="xxx">` 内容块，填充说明、参数、返回值和刚刚提取的代码示例（示例首行需标注来源，如 `// 来源 xxx.js`）。
  7. 将 YAML 字段 `doc_update` 更新为当前日期。
  8. 运行 `check_api_doc_ids.py` 脚本确保没有引入短写风险或语法错误。

### 4. 新建文档 (doc-create)
**目的**：为尚未建立文档的全局对象、系统或数据建立标准化页面。

* **步骤**：
  1. 读取模版文件 `assets/api-page-template.md`。
  2. 查阅 `docs/_link-source-addr.md` 确认对应的源码文件路径。
  3. 确定 YAML 元数据信息：定义 `doc_type` 类别（`object`、`system`、`data`、`other` 等）。
  4. 检索源码，获取主 Scope 对应的高频 API，筛选出需要写入主列表的 API（遵守“API 归属判定”规则，防止越界）。
  5. 创建新文件，例如 `docs/api/new-page.md`，使用真实数据填充占位符，添加快速示例。
  6. 为挑选出的 API 方法编写精简的代码示例（3-8行，首行标注出处），生成底部的弹窗内容块。
  7. YAML 字段 `doc_update` 填入当前日期。
  8. 运行 `check_api_doc_ids.py` 脚本，核对有无短写风险。

### 5. 维护网站 (web-maintain)
**目的**：维护 VitePress 站点的整站结构与展示，**绝对不修改具体的 API 文档**。

* **步骤**：
  1. **侧边栏同步校验**：
     * 扫描 `docs/api/` 目录下的所有 `.md` 文件。
     * 读取 `docs/.vitepress/config.js` 并解析其 `sidebar` 数组。
     * 比对发现：
       - 哪些实际存在的文件在 `sidebar` 中缺失了。
       - 哪些在 `sidebar` 中的链接对应的实际文件已经被删除。
     * **更新配置**：将缺失的文件根据其 YAML 中的 `doc_type` 或主题，自动归类并插入至 `sidebar` 合适的分组（如“全局对象”、“游戏系统”、“地图系统”等）中。
  2. **主页更新**：
     * 读取 `docs/index.md`。
     * 更新底部的 `<div style="text-align: center...">文档更新：YYYY-MM-DD</div>` 字段为当前日期。
     * （可选）当有重大的系统 API 重构或重大发布时，根据实际改动微调主页 `features` 列表中的推荐项目与描述。
  3. **无死链校验**：确认侧边栏与主页链接正确，无指向不存在文件的死链。

### 6. 全面整改 (doc-refactor)
**目的**：一站式解决文档的所有排版、正确性以及完整性问题。适合需要对老旧文档进行“大修”的场景。

* **步骤**：
  1. 读取目标 `.md` 文件，解析 YAML frontmatter。
  2. **格式修复**：首先按照“格式刷 (`format-brush`)”工作流，纠正 YAML 元数据、标题格式、代码块围栏、方法表 `<API>` 标签及其紧贴的 `<h3>`。
  3. **语义验证**：提取方法列表里的 API 标识符，在源码中检索，核对接收者链的完整性与参数个数。修复写错的 API 拼写、错误的调用链参数。
  4. **内容补全**：根据 `primary_scope` 全面扫描源码，找出被遗漏的方法与属性。为遗漏的 API 提取 3-8 行的真实代码示例，并将其以及底部的弹窗内容块增补进文档中。
  5. 将 YAML 字段 `doc_update` 更新为当前日期（格式 `YYYY-MM-DD`）。
  6. 运行 `check_api_doc_ids.py` 脚本进行最终核查，确保无任何短写风险与语法错误后，写回文件。

---

## 游戏源码搜索与 API 归属判定规范

### 1. 源码目录与符号链接
游戏源码位于 `D:\Games Design\Civ7_mod\.官方变动`，详细目录见 `docs/_link-source-addr.md`。

> [!WARNING]
> **符号链接（必读）：**
> `modules` 和 `TunerPanels` 在根目录下是**符号链接**，`rg` 和 IDE 默认不追踪它们。
> - 在根目录下搜索时，**必须加 `-L`（`--follow`）参数**。
> - 或者，直接搜特定的子目录，如 `D:\Games Design\Civ7_mod\.官方变动\modules` 或 `D:\Games Design\Civ7_mod\.官方变动\TunerPanels`。

### 2. 搜索命令推荐
* **固定字符串搜索（优先，速度快）**：
  ```powershell
  rg -n -F "Units.get" "D:\Games Design\Civ7_mod\.官方变动\modules" -g "*.js"
  ```
* **正则搜索（用于规避后缀误匹配，需使用 `--pcre2`）**：
  ```powershell
  rg -n -L --pcre2 "(?<![A-Za-z0-9_$])Units\." "D:\Games Design\Civ7_mod\.官方变动" -g "*.js" -g "*.ltp"
  ```

### 3. API 归属判定规则
* **主方法列表只收录 `primary_scope`**。例如 `units.md` 主列表仅收录 `Units.*`。而相关联的 `GameInfo.Units.*` 或 `player.Units.*` 应移入 GameInfo 关联表、相关对象或子系统章节。
* **写完整归属**：实例对象或子系统必须写出完整链条，如 `unit.Experience.getAllPromotions`，禁止写成 `Experience.getAllPromotions`。
* **拒绝缩写猜测**：若源码中只存在 `A.B.method()`，禁止在文档中写为 `B.method`。

---

## 流程排序表（由简到繁）

| 排序 | 意图标识 | 意图名称 | 复杂度 | 核心职责 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `web-maintain` | **维护网站** | ★☆☆☆☆ | 检查侧边栏收录、更新主页日期/展示，**不修改任何文档内容**。 |
| 2 | `format-brush` | **格式刷** | ★★☆☆☆ | 仅修复 Markdown 排版、YAML、`<API>` 标签样式，**禁止进行源码检索和 API 增删**。 |
| 3 | `api-verify` | **API 验证** | ★★★☆☆ | 读取文档提取 API，在源码中检索核对是否存在及调用链正确性，**仅输出报告或局部更正错误调用**。 |
| 4 | `doc-create` | **新建文档** | ★★★☆☆ | 复制 `api-page-template.md` 模板，从零检索源码生成新 API 页面。 |
| 5 | `api-complete` | **API 补全** | ★★★★☆ | 深度对比文档与源码，积极搜寻可能遗漏的方法、参数及示例，并**向文档增补内容**。 |
| 6 | `doc-refactor` | **全面整改** | ★★★★★ | **格式刷 + API 验证 + API 补全的复合超级工作流**，自动重构并补齐整篇文档。 |

---

## YAML 元数据规范

```yaml
---
title: Units 单位
doc_type: object
summary: 单位全局对象，负责单位获取、创建、位置、状态和属性修改。
primary_scope:
  - Units
related_scope:
  - GameInfo.Units
  - player.Units
source:
  - TunerPanels/Units.ltp
doc_update: 2026-06-06
---
```
* `doc_type` 常用值：`object`（全局对象）、`system`（跨对象系统）、`data`（静态数据/常量/事件）、`other`（非游戏本体如 UI/音频）、`generated`（自动生成，不进行格式与 API 校验）。

---

## 检查清单（全链路自查）

无论执行哪项流程，在完成工作前必须依照下表核对：

- [ ] 文档包含完整的 YAML 元数据（`title`、`doc_type`、`primary_scope` 等）。
- [ ] 页面 H1 格式为 `# 英文名 中文名`。
- [ ] 所有代码块标记为 ` ```javascript ` 并已正确闭合。
- [ ] 示例代码首行有 `// 来源 xxx` 注释，第二行有 `// 简要描述功能`。
- [ ] 方法表里的触发器统一为 `<API>id</API>`，**无反引号**。
- [ ] `<API>` 触发器的 textContent 对应的 id 无缩写歧义。
- [ ] 主方法表中的 API 属于 `primary_scope`，而 `related_scope` 仅作为外围提及。
- [ ] 页面底部的弹窗内容块中，`<h3>` 标题与 `<API>` 标签无空行紧贴。
- [ ] 页面更新后，YAML 中的 `doc_update` 已更新为当前日期。
- [ ] 运行脚本未报短写风险错误：`python .agents/skills/doc-update/scripts/check_api_doc_ids.py docs/api/文件.md`。
- [ ] 若为 `web-maintain` 意图：侧边栏无缺失或多余链接，主页日期已刷新，且没有修改任何 API 页面内容。
- [ ] 若为 `doc-refactor` 意图：已依次正确完成了格式修正、API 验证和遗漏 API 补全这三大功能。
