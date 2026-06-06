---
name: doc-update
description: >
  标准化 Civ7 API 文档的格式与内容更新，并维护文档站点。用于：使用格式刷一键美化排版；
  对现有 API 文档进行语义正确性校验并原地修正（验证）；搜索源码查漏补缺（补全）；使用模板新建文档；
  维护文档网站（维护网站）；以及提供全方位的“全面整改”复合流程。
  触发条件：用户提到"格式刷"、"更新文档"、"查漏补缺"、"补全 API"、"验证 API"、"校验 API"、
  "维护侧边栏"、"同步侧边栏"、"更新主页"、"新建 API 文档"、"全面整改"、"彻底整改"、"大修文档"，或要求对 docs/api/ 下 the .md 文件及 VitePress 网站进行维护。
---

# Doc Update & Website Maintenance

Civ7 API 文档更新、校验、补全及网站维护的统一工作流指南。

* **游戏源码绝对路径**：`D:\Games Design\Civ7_mod\.官方变动`（各模块详见 `docs/_link-source-addr.md`）
* 模板文件：`assets/api-page-template.md`
* 校验脚本：`scripts/check_api_doc_ids.py`
* 网站配置文件：`docs/.vitepress/config.js`
* 网站主页文件：`docs/index.md`

---

## 意图判断决策树

当你接收到用户请求时，优先判断属于哪一种意图，并严格执行对应的工作流。**严禁越界执行非该意图相关的修改**。

| 用户意图描述示例 | 匹配意图标识 | 核心行为约束 |
| :--- | :--- | :--- |
| "刷一下 units.md 的格式"、"整理排版" | `format-brush` (格式刷) | 仅调整排版、补全 YAML 结构、修复标签规范。**绝对禁止增删 API，禁止搜索游戏源码**。 |
| "检查 units.md 中的 API 是否正确"、"校验 API" | `api-verify` (API 验证) | 提取文档 API 在源码中检索，**原地修正写错的 API/参数/调用链，更新文档日期并校验**。 |
| "把 units.md 里漏掉的 API 加一下"、"查漏补缺" | `api-complete` (API 补全) | 对比文档与源码，寻找缺少的 API，**搜寻提取代码示例并增补进文档**。 |
| "新建 gameplay-map 文档"、"创建新的 API 页面" | `doc-create` (新建文档) | 复制模板，检索源码，从零编写生成新 API 页面。 |
| "检查侧边栏"、"更新主页更新日期" | `web-maintain` (维护网站) | 扫描并同步 `config.js` 的 `sidebar`，更新 `index.md` 主页。**禁止修改任何 .md 文档内容**。 |
| "全面整改 units.md"、"大修此 API 页面" | `doc-refactor` (全面整改) | **格式刷 + API 验证 + API 补全的复合超级流程**。 |

---

## 六大意图工作流指南

### 1. 格式刷 (format-brush)
* **步骤**：
  1. 读取目标 `.md` 文件，解析并规范化 YAML 字段（`title`、`doc_type`、`summary`、`primary_scope`、`related_scope`、`source`、`doc_update`）。
  2. 检查并纠正标题格式：H1 必须为 `# 英文名 中文名`。
  3. 确认所有代码块被 ` ```javascript ` 围栏包裹且已闭合，且首两行有 `// 来源` 和 `// 简要描述功能`。
  4. 检查方法总表中的 API 触发器：必须使用 `<API>id</API>`，且 textContent 不能带有反引号。
  5. 检查底部的 `<API>` 弹窗内容块：`<h3>` 必须紧贴在 `<API>` 标签内部第一行或标签之前；内容块顺序为：说明 → 参数表 → 返回值 → 使用示例。
  6. **特别注意**：由于格式刷不会进行源码搜索，若发现某个 API 缺失示例，只需在文档中保留“// 待补充示例”等占位符，**禁止自行去游戏源码中检索**。
  7. 将 YAML 字段 `doc_update` 更新为当前日期（格式 `YYYY-MM-DD`）。

### 2. API 验证 (api-verify)
* **步骤**：
  1. 读取目标文档，提取主方法列表中所有的 `<API>` id。
  2. 遍历这些 API 标识符，在源码目录中利用 `rg` 进行检索。核对以下核心要素：
     * **存在性**：该 API 在源码中是否真实存在？
     * **接收者链**：API 拼写是否完整？（例如：`Units.get` 而不是 `get`，`player.Units.getUnitIds` 而不是 `Units.getUnitIds`）。如果源码中只有 `A.B.method()`，绝不允许在文档中缩写为 `B.method`。
     * **参数一致性**：参数名和个数是否与源码一致。
  3. 对核对出不一致或错误的 API，直接修正（包括修改不规范的调用链或更正参数）。
  4. 将 YAML 字段 `doc_update` 更新为当前日期。
  5. 运行校验脚本：`python .agents/skills/doc-update/scripts/check_api_doc_ids.py docs/api/目标.md`，确认没有引入短写风险或语法错误。

### 3. API 补全 (api-complete)
* **步骤**：
  1. 读取目标文档，识别 YAML 中的 `primary_scope`。
  2. 利用 `rg` 在源码中对该 Scope 进行全面检索，对比方法表，提取出文档遗漏的 API 方法。
  3. 检索源码，提取一个精简（3-8行）、具有代表性的真实用法代码段作为使用示例（首行注明出处）。
  4. **写入文档**：将新方法以 `<API>` 触发器的格式增补进 H2 方法列表中，并在文档最底部追加对应的 `<API id="xxx"><h3>xxx()</h3>` 内容块，包含说明、参数、返回值和示例。
  5. 将 YAML 字段 `doc_update` 更新为当前日期。
  6. 运行 `check_api_doc_ids.py` 脚本确保无语法错误。

### 4. 新建文档 (doc-create)
* **步骤**：
  1. 读取模版文件 `assets/api-page-template.md`。
  2. 确定 YAML 元数据信息，在源码中获取主 Scope 对应的方法。
  3. 创建新文件并填充占位符，添加快速示例、方法表及弹窗内容块。
  4. YAML 字段 `doc_update` 填入当前日期，并运行 `check_api_doc_ids.py` 脚本校验。

### 5. 维护网站 (web-maintain)
* **步骤**：
  1. **侧边栏同步校验**：比对 `docs/api/` 下的 `.md` 文件与 `config.js` 的 `sidebar`，将缺失的文件插入合适分组，移除废弃的链接。
  2. **主页更新**：读取 `docs/index.md`，更新底部的“文档更新：YYYY-MM-DD”日期为当前日期。
  3. **无死链校验**：确认侧边栏与主页链接正确，无死链。

### 6. 全面整改 (doc-refactor)
* **步骤**：
  1. 读取目标 `.md` 文件，解析 YAML frontmatter。
  2. **格式修复**：按照“格式刷”工作流，纠正排版、代码块和 `<API>` 结构。
  3. **语义验证**：提取 API，在源码中检索，核对存在性、接收者链的完整性与参数个数并原地纠错。
  4. **内容补全**：全面扫描源码，找出被遗漏的方法与属性，提取代码示例并补齐。
  5. 将 YAML 中的 `doc_update` 更新为当前日期。
  6. 运行 `check_api_doc_ids.py` 脚本进行核查，确保无误后写回。

---

## 规范定义与源码检索规范

### 1. doc_type 规则与拆分判定
- `object` (全局对象)：主方法列表仅收录 `primary_scope`；实例或子系统方法须写完整归属（如 `player.Units.get`）。
- `system` (跨对象系统)：允许多个 `primary_scope`。
- `data` (常量/数据表) 与 `other` (UI/音频/调试等非游戏本体)：**不强制要求方法列表和 `<API>` 覆盖率**。
- *拆分原则*：若对象过于复杂（方法 > 8 个且包含独立子系统），应拆分为“主页面+独立子系统页”展示。

### 2. 源码搜索规范与避坑守则 (Windows 路径)
- **符号链接**：源码目录 `modules` 和 `TunerPanels` 是符号链接，搜索根目录时**必须在 `rg` 中添加 `-L`（`--follow`）参数**，或者直接搜索其子目录（推荐）。
- **避坑提示**：PowerShell 执行时**不要追加 `2>$null`**；遇到空匹配时，应使用 `Read` 工具抽查已知文件，确保搜索工具工作正常。
- **正则技巧**：使用 `rg -n -L --pcre2` 进行正则匹配，使用单词边界 `(?<![A-Za-z0-9_$])` 避免后缀误匹配。

* **典型搜索命令示例**：
  ```powershell
  # 1. 精确检索直接接收者 (避免被 GameInfo 或其他前缀后缀干扰)
  rg -n -L --pcre2 "(?<![\w$.\])(?<![A-Za-z0-9_$])Units\.lookup\s*\(" "D:\Games Design\Civ7_mod\.官方变动"
  
  # 2. 检索实例或子系统的实际调用链 (如 player.Units.getUnitIds)
  rg -n -L "(player|pPlayer)\.Units\.getUnitIds\s*\(" "D:\Games Design\Civ7_mod\.官方变动"
  ```

---

## 检查清单（全链路自查）

无论执行哪项流程，在完成工作前必须依照下表核对：

- [ ] **置顶规则**：若 YAML 中的 `doc_type` 为 `generated`，**跳过所有格式与 API 修改和校验流程**（仅验证 YAML 头完整性），除非用户明确指示。
- [ ] 文档包含完整的 YAML 元数据（`title`、`doc_type`、`primary_scope` 等）。
- [ ] 页面 H1 格式为 `# 英文名 中文名`。
- [ ] 所有代码块标记为 ` ```javascript ` 并已正确闭合，首两行包含来源和功能注释。
- [ ] 方法表里的触发器统一为 `<API>id</API>`，无反引号。
- [ ] 主方法表中的 API 属于 `primary_scope`，而 `related_scope` 仅作为外围提及。
- [ ] 页面底部的弹窗内容块中，`<h3>` 标题与 `<API>` 标签无空行紧贴。
- [ ] 页面更新后，YAML 中的 `doc_update` 已更新为当前日期。
- [ ] 运行脚本未报短写风险错误：`python .agents/skills/doc-update/scripts/check_api_doc_ids.py docs/api/文件.md`。
- [ ] 若为 `web-maintain` 意图：侧边栏无死链、无缺失链接，主页日期已刷新，且没有修改任何 API 页面内容。
- [ ] 若为 `doc-refactor` 意图：已依次正确完成了格式修正、API 验证和遗漏 API 补全这三大功能。
