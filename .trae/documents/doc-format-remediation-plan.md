# doc-format 文档整改计划

## 概述

对 `docs/api/` 下 42 个文档进行格式整改，使其符合 doc-format 技能规范。排除 6 个已整改/自动生成的文档：`constants.md`、`camera.md`、`automation.md`、`game.md`、`progression-trees.md`、`units.md`。

## 当前状态分析

通过探索发现，所有待整改文件存在以下共性问题：

| 问题 | 影响文件数 |
|------|-----------|
| 缺少 `doc_type`、`summary`、`primary_scope`、`related_scope` 字段 | 42 |
| 缺少 `source` 字段 | 40 |
| 方法表使用 backtick 而非 `<API>` 触发器 | 15 |
| 缺少底部 `<API>` 内容块 | 42 |
| 缺少快速示例代码块 | 10 |
| 代码块缺少 `// 来源` 注释 | 部分 |
| 代码块缺少 `// 简要描述功能` 注释 | 部分 |

## 整改策略（根据SKILL`doc-format`）

### 每类文档的整改内容

1. **补全 YAML frontmatter**：添加 `doc_type`、`summary`、`primary_scope`、`related_scope`、`source`
2. **添加快捷示例**：从已有代码块中提取或搜索源码补全
3. **转换方法表**：将 `| \`method\` |` 转换为 `| <API>Object.method</API> |`
4. **补全 `<API>` 内容块**：为每个方法添加底部弹窗内容块
5. **搜索源码补全代码示例**：当文档缺少示例时，用 `rg` 搜索 `.ltp` / `.js` 源码
6. **修复代码块格式**：统一 ` ```javascript ` 围栏、添加 `// 来源` 和 `// 简要描述` 注释
7. **运行验证脚本**：`python .agents/skills/doc-format/scripts/check_api_doc_ids.py docs/api/目标.md`

---

## 文件分类与整改计划

### 批次 1：已有 `<API>` 标签，仅需补全 frontmatter（2 个）

这些文件已经使用了 `<API>` 标签和底部内容块，主要缺 YAML 元数据。

| 文件 | doc_type | 主要工作 |
|------|----------|---------|
| `players.md` | object-api | 补全 frontmatter（doc_type/summary/primary_scope/related_scope） |
| `game-info.md` | system-topic | 补全 frontmatter（doc_type/summary/primary_scope/related_scope/source） |

### 批次 2：object-api 有方法表需转换（14 个）

这些文件是对象 API 文档，方法表使用 backtick，需转换为 `<API>` 触发器并补全底部内容块。

| 文件 | 对象 | 方法数 | 额外工作 |
|------|------|--------|---------|
| `cities.md` | Cities | 5 | 修复代码块围栏（缺少闭合 backtick）；补全 quick example |
| `engine.md` | Engine | 13 | 已有详细说明，需转换为 `<API>` 格式 |
| `gameplay-map.md` | GameplayMap | 55 | 方法数最多，需拆分内容块；补全 quick example |
| `configuration.md` | Configuration | 9 | 已有 quick example 和 source |
| `districts.md` | Districts | ~10 | 补全 frontmatter 和代码块 |
| `resources.md` | Resources | ~8 | 补全 frontmatter 和代码块 |
| `religion.md` | Religion | ~8 | 补全 frontmatter 和代码块 |
| `victories.md` | Victories | ~8 | 补全 frontmatter 和代码块 |
| `unlocks.md` | Unlocks | ~5 | 补全 frontmatter 和代码块 |
| `operations-commands.md` | OperationsCommands | ~10 | 补全 frontmatter 和代码块 |
| `world-units.md` | WorldUnits | ~8 | 补全 frontmatter 和代码块 |
| `advanced-start.md` | AdvancedStart | ~8 | 补全 frontmatter 和代码块 |
| `independent-powers.md` | IndependentPowers | ~8 | 补全 frontmatter 和代码块 |
| `notifications.md` | Notifications | ~5 | 补全 frontmatter 和代码块 |

### 批次 3：system-topic 文档（5 个）

这些文件是多对象/子系统文档，需按 system-topic 规范处理。

| 文件 | 主题 | 主要工作 |
|------|------|---------|
| `diplomacy.md` | 外交系统 | 添加 frontmatter；将方法表转为 `<API>`；补全内容块 |
| `trade.md` | 贸易系统 | 添加 frontmatter；已有代码示例，补全 `<API>` 内容块 |
| `culture.md` | 文化系统 | 添加 frontmatter；补全代码示例和 `<API>` 内容块 |
| `game-effects.md` | 效果系统 | 添加 frontmatter；补全代码示例和 `<API>` 内容块 |
| `diplomacy-deals.md` | 外交交易 | 添加 frontmatter；补全代码示例和 `<API>` 内容块 |

### 批次 4：reference / ui-api / 其他文档（16 个）

这些文件是参考类、UI 类或工具类文档，方法表较少或无方法表，按 reference 规范处理。

| 文件 | doc_type | 主要工作 |
|------|----------|---------|
| `api-stats.md` | reference | 补全 frontmatter；无需方法列表 |
| `events.md` | reference | 补全 frontmatter；事件列表保持表格格式 |
| `component.md` | ui-api | 补全 frontmatter；生命周期表格保持 |
| `world-ui.md` | ui-api | 补全 frontmatter；补全代码示例 |
| `ui-objects.md` | ui-api | 补全 frontmatter；补全代码示例 |
| `globals.md` | reference | 补全 frontmatter；全局对象列表保持 |
| `locale.md` | object-api | 补全 frontmatter；补全方法表和 `<API>` 内容块 |
| `input.md` | object-api | 补全 frontmatter；补全方法表和 `<API>` 内容块 |
| `visibility.md` | object-api | 补全 frontmatter；补全方法表和 `<API>` 内容块 |
| `network.md` | reference | 补全 frontmatter；补全代码示例 |
| `map-builders.md` | system-topic | 补全 frontmatter；补全代码示例 |
| `map-features.md` | object-api | 补全 frontmatter；补全方法表和 `<API>` 内容块 |
| `modding.md` | reference | 补全 frontmatter；补全代码示例 |
| `random-events.md` | object-api | 补全 frontmatter；补全方法表和 `<API>` 内容块 |
| `reflection.md` | reference | 补全 frontmatter；补全代码示例 |
| `social.md` | reference | 补全 frontmatter；补全代码示例 |
| `stories.md` | object-api | 补全 frontmatter；补全方法表和 `<API>` 内容块 |
| `audio-debug.md` | reference | 补全 frontmatter；补全代码示例 |
| `autoplay.md` | reference | 补全 frontmatter；补全代码示例 |
| `advisors.md` | reference | 补全 frontmatter；补全代码示例 |
| `legacies.md` | object-api | 补全 frontmatter；补全方法表和 `<API>` 内容块 |

---

## 整改流程（每个文件）

1. **读取文件完整内容**，根据SKILL`doc-format`执行以下整改。
2. **分析现有结构**：确定 doc_type、primary_scope、related_scope
3. **搜索源码确认 API 归属**：对 primary_scope 用 `rg` 搜索 `.ltp` 和 `.js`，确认完整接收者链
4. **写入 frontmatter**：补全 YAML 元数据
5. **转换方法表**：backtick → `<API>` 触发器
6. **添加 `<API>` 内容块**：为每个方法添加底部弹窗
7. **添加快捷示例**（如缺失）
8. **修复代码块格式**：统一 ` ```javascript `、添加来源注释
9. **运行验证脚本**：`python .agents/skills/doc-format/scripts/check_api_doc_ids.py docs/api/目标.md`
SKILL`doc-format`目录：`.agents\skills\doc-format\SKILL.md`

## 源码搜索规则

API 搜索使用单词边界避免后缀误匹配：
```powershell
# 在 .ltp 面板中搜索
rg -n "(?<![A-Za-z0-9_$])API_NAME\." "D:\Games Design\Civ7_mod\.官方变动\TunerPanels" -g "*.ltp"
# 在 .js 源码中搜索
rg -n "(?<![A-Za-z0-9_$])API_NAME\." "D:\Games Design\Civ7_mod\.官方变动\modules" -g "*.js"
```

## 验证

整改完成后，对所有文件运行：
```powershell
python .agents/skills/doc-format/scripts/check_api_doc_ids.py docs/api/*.md
```

## 工作量估算

- 批次 1（2 个文件）：约 30 分钟
- 批次 2（14 个文件）：约 3-4 小时
- 批次 3（5 个文件）：约 1.5 小时
- 批次 4（21 个文件）：约 3-4 小时
- 总计：约 8-10 小时