# Civ7 API 文档建设计划（深度版）

> 本文档是整个项目的**核心指导文件**。任何 AI 在执行本项目任务前，必须先完整阅读本文档。

## 1. 项目目标

将文明7游戏文件中所有可用的 API 整理为一个**可搜索、可跳转、美观的 Web 文档站**，每个 API 条目包含**详细说明、完整代码示例、源文件引用**，方便 Mod 开发者查阅。

### 1.1 目标受众
文明7 Mod 开发者（JS 脚本层面）。

### 1.2 核心要求
- 每个 API 条目包含：详细说明（段落级）、参数（名称/类型/逐个说明）、返回值、边界情况、完整代码示例（含上下文）、源文件引用、关联 API
- 支持全文搜索、侧边栏分类导航、代码高亮
- 支持长期增量更新（游戏版本变动后能快速同步）

---

## 2. 源文件分析（已探查结论）

### 2.1 源文件位置
```
D:\Games Design\Civ7_mod\.官方变动\modules\
├── core/                    # 核心框架（UI组件、工具库、输入系统）~200+ JS
├── base-standard/           # 主游戏逻辑（地图、脚本、UI界面）~780 JS
├── age-antiquity/           # 古典时代模块
├── age-exploration/         # 探索时代模块
└── age-modern/              # 现代时代模块
```

### 2.2 源文件路径规范
**文档中所有源文件路径统一从 `modules/` 开始**，不包含上级目录。
例如：`modules/base-standard/maps/map-utilities.js`

### 2.3 代码特征（关键限制）
- **全部是打包/编译后的 JS 输出**，不是带注释的源码
- **几乎没有 JSDoc 注释**，无法直接从注释提取参数说明
- **没有 `.d.ts` 类型定义文件**，`.d.js` 文件仅含 sourcemap 注释
- 使用 ES Module 格式（`import/export`），现代 JS 语法
- 文件类型：`.js`（主逻辑）、`.html.js`（HTML模板）、`.scss.js`（CSS-in-JS）、`.json.js`（JSON数据）

### 2.4 核心全局 API 数据规模

这些对象在代码中**直接使用，从不通过 import 引入**，是引擎注入到 JS 运行环境的：

| 全局对象 | 不同方法/属性数 | 总调用点数 | 优先级 |
|---------|--------------|----------|-------|
| `GameplayMap` | 60 个方法 | 723 处 | P0 |
| `GameInfo` | 152 个数据表 | 1,450 处 | P2（核心表 P0） |
| `Players` | 19 个方法 | 982 处 | P0 |
| `Configuration` | 10 个方法 | 529 处 | P0 |
| `Camera` | 30 个方法 | 181 处 | P3 |
| `engine` | 16 个方法/事件 | 1,642 处 | P1 |
| `Component` | 基类 ~10 方法 | 大量子类 | P3 |

### 2.5 已知事件名（从 `engine.on()` 调用提取）

```
GameStarted, AffinityLevelChanged, CapitalCityChanged, CityAddedToMap,
CityGovernmentLevelChanged, CityGrowthModeChanged, CityInitialized,
CityNameChanged, CityPopulationChanged, CityProductionChanged,
CityProductionUpdated, CityProductionQueueChanged, CityReligionChanged,
CityRemovedFromMap, CitySelectionChanged, CityStateBonusChosen,
CityYieldChanged, CityYieldGranted, ConqueredSettlementIntegrated,
DiplomacyEventStarted, DiplomacyEventEnded, DiplomacyRelationshipChanged,
DistrictAddedToMap, DistrictRemovedFromMap, FoodQueueChanged,
LocalPlayerChanged, NotificationAdded, PlotVisibilityChanged,
ResourceAssigned, ResourceUnassigned, RuralReligionChanged,
UrbanReligionChanged
```

---

## 3. 技术方案

### 3.1 技术栈
- **文档站框架**：VitePress（Vue 驱动的静态站点生成器）
- **数据层**：JSON 文件（每个 API 大类一个 JSON）
- **构建工具**：Node.js + Vite
- **部署**：本地 `npx vitepress dev docs` 开发服务器

### 3.2 项目目录结构
```
Civ7_API/
├── PLAN.md
├── UPDATE-WORKFLOW.md
├── GOAL-PROMPT.md
├── package.json
├── scripts/
│   ├── extract-constants.mjs
│   ├── generate-constants-md.mjs
│   ├── update-constants.mjs
│   └── README.md
├── docs/
│   ├── .vitepress/
│   │   └── config.js
│   ├── index.md
│   ├── api/
│   │   ├── engine.md
│   │   ├── gameplay-map.md
│   │   ├── game-info.md
│   │   ├── players.md
│   │   ├── configuration.md
│   │   ├── camera.md
│   │   ├── component.md
│   │   ├── ui-components.md
│   │   ├── utilities.md
│   │   └── events.md
│   │   ├── constants.md
│   │   └── ... (30+ 个 API 文档页面)
│   └── data/
│       ├── constants.json
│       └── ... (其他 API JSON)
│       ├── engine.json
│       ├── gameplay-map.json
│       ├── game-info.json
│       ├── players.json
│       ├── configuration.json
│       ├── camera.json
│       ├── component.json
│       ├── ui-components.json
│       ├── utilities.json
│       └── events.json
```

---

## 4. API 条目 JSON Schema（深度版）

每个 API 条目遵循以下结构：

```json
{
  "name": "GameplayMap.getPlotDistance",
  "category": "GameplayMap",
  "type": "method",
  "description": "计算两个六角格坐标之间的距离。",
  "detailedNotes": "此距离使用六角格特有的距离算法...",
  "params": [
    { "name": "x1", "type": "int", "description": "起点的X坐标（列）", "required": true },
    { "name": "y1", "type": "int", "description": "起点的Y坐标（行）", "required": true },
    { "name": "x2", "type": "int", "description": "终点的X坐标（列）", "required": true },
    { "name": "y2", "type": "int", "description": "终点的Y坐标（行）", "required": true }
  ],
  "returns": { "type": "int", "description": "两个地块之间的六角格距离" },
  "edgeCases": "当地图启用环绕时，距离计算会考虑跨越地图边界的最短路径。",
  "examples": [
    {
      "title": "检查两个城市的距离",
      "code": "const iDist = GameplayMap.getPlotDistance(...);",
      "sourceFile": "modules/base-standard/maps/map-utilities.js",
      "sourceLine": 47
    }
  ],
  "relatedAPIs": ["GameplayMap.getAdjacentPlotLocation", "GameplayMap.getDirectionToPlot"],
  "sourceFiles": [
    { "file": "modules/base-standard/maps/map-utilities.js", "line": 47, "role": "usage_example" }
  ],
  "status": "inferred",
  "verifiedBy": "",
  "gameVersion": "1.0.0"
}
```

### 4.1 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | API 完整名称 |
| `category` | string | 是 | 所属大类 |
| `type` | string | 是 | 条目类型，见 4.2 |
| `description` | string | 是 | 一句话简介 |
| `detailedNotes` | string | 否 | 详细技术说明（段落级） |
| `params` | array | 否 | 参数列表 |
| `returns` | object | 否 | 返回值说明 |
| `edgeCases` | string | 否 | 边界情况和特殊行为 |
| `examples` | array | 否 | 代码示例，含 title/code/sourceFile/sourceLine |
| `relatedAPIs` | string[] | 否 | 关联 API 列表 |
| `sourceFiles` | array | 是 | 源文件引用，path 从 modules/ 开始 |
| `status` | string | 是 | 验证状态，见 4.3 |
| `verifiedBy` | string | 否 | 验证方式/人 |
| `gameVersion` | string | 否 | 对应游戏版本 |

### 4.2 type 字段取值

| 值 | 含义 |
|---|------|
| `method` | 对象方法 |
| `property` | 对象属性 |
| `event` | 引擎事件 |
| `function` | 独立函数 |
| `class` | 类定义 |
| `constant` | 常量/枚举 |
| `table` | GameInfo 数据表 |

### 4.3 status 字段取值

| 值 | 含义 |
|---|------|
| `verified` | 已在游戏内测试确认 |
| `inferred` | AI 从代码使用模式推断 |
| `unverified` | 信息来源不确定 |
| `deprecated` | 已弃用 |

---

## 5. 数据采集方法：三遍扫描法

由于源文件是打包后的代码且几乎没有注释，采用「三遍扫描法」从使用模式中反推 API 语义。

### 第一遍：签名与调用模式提取（自动化）

对每个 API 方法：
1. 用 `rg` 搜索该方法在所有文件中的调用点
2. 提取参数传递模式（参数数量、变量名暗示的类型）
3. 提取返回值使用模式
4. 输出：参数数量、大致类型、返回值类型

```powershell
# 搜索某个方法的所有调用点（含上下文）
rg -n "GameplayMap\.getPlotDistance" "D:\Games Design\Civ7_mod\.官方变动\modules" -C 3
```

### 第二遍：上下文深度阅读（半自动）

对每个 API 方法，选取 3-5 个最具代表性的调用点：
1. 读取调用点所在文件的上下文（前后 20-30 行）
2. 理解该方法在什么场景下被调用
3. 理解调用前后的逻辑流
4. 输出：使用场景描述、边界条件、注意事项

### 第三遍：示例提取与描述撰写（AI 生成 + 人工校验）

1. 从第二遍的上下文中，提取最清晰的使用片段作为示例
2. 简化示例代码，去掉无关逻辑，保留核心用法
3. 综合前两遍的信息，撰写中文说明
4. 标注 `status: "inferred"`

---

## 6. 执行计划（分阶段，按优先级）

### Phase 0：项目初始化 ✅ 已完成
搭建 VitePress 项目骨架，配置好导航和搜索。
1. ✅ `npm init -y` + `npm add -D vitepress`
2. ✅ 创建 `docs/.vitepress/config.js`（含侧边栏、搜索、导航）
3. ✅ 创建 `docs/index.md` 和 31 个 `docs/api/*.md` 页面
4. ✅ 创建 6+ 个 `docs/data/*.json` 数据文件
5. ✅ `npx vitepress dev docs` 可正常启动，搜索可用
6. ✅ GitHub Pages 部署配置（`.github/workflows/deploy.yml`）
7. ✅ 批处理启动脚本（`!启动文明7文档站.bat`）
8. ✅ 常量自动提取脚本（`scripts/extract-constants.mjs` 等）

### Phase 1：GameplayMap（60 个方法）— P0 ✅ 已完成深度格式
Mod 开发最常用的地图操作 API。
- ✅ 深度 JSON 已完成（19 个核心方法，含 detailedNotes、examples、sourceFiles）
- ✅ Markdown 页面已有完整方法表格（55 个方法）
- 坐标/距离：`getPlotDistance`, `getAdjacentPlotLocation`, `getDirectionToPlot` 等
- 地块属性：`getBiomeType`, `getTerrainType`, `getFeatureType`, `getElevation` 等
- 地图尺寸：`getMapSize`, `getGridWidth`, `getGridHeight`
- 地形判断：`isWater`, `isCoastalLand`, `isRiver`, `isMountain`, `isVolcano` 等

### Phase 2：Players（19 个方法）— P0 ✅ 已完成深度格式
`get`, `getAlive`, `getAliveIds`, `getEverAlive`, `isHuman`, `isAI` 等

### Phase 3：Configuration（10 个方法）— P0 ✅ 已完成深度格式
`getGame`, `getGameValue`, `getMap`, `getMapValue`, `getPlayer` 等

### Phase 4：engine 事件系统（16 个方法 + 30+ 事件）— P1 ✅ 已完成深度格式
`on`, `off`, `call`, `trigger`, `whenReady` 等，事件列表见 2.5 节

### Phase 5：Camera（30 个方法）— P3 ✅ 已完成深度格式
`lookAt`, `lookAtPlot`, `setPreventMouseCameraMovement` 等

### Phase 6：GameInfo 核心数据表 — P0 核心表 + P1 扩展表
核心表：`Maps`, `Civilizations`, `Leaders`, `Units`, `Buildings`, `Technologies`, `Civics`, `Resources`, `Terrains`, `Features`, `Biomes`, `Districts`, `Improvements`, `Governments`, `Religions`, `Yields`, `Victories`

### Phase 7：UI 组件 + 工具函数库 — P3
`core/ui/components/` 下的 `fxs-*` 组件 + `core/ui/utilities/` 工具函数

### Phase 8：游戏逻辑函数 — P4
`base-standard/maps/` + `base-standard/scripts/` + 各 age 模块

### Phase 9：常量与枚举自动提取 — 已完成
通过自动化脚本从游戏源码中提取所有常量字符串、代码枚举和 GameInfo 数据表。

**自动化工具链**（位于 `scripts/` 目录）：

| 脚本 | 功能 |
|------|------|
| `extract-constants.mjs` | 从 rg 输出 + JS 源码提取字符串常量、枚举、GameInfo 表 → JSON |
| `generate-constants-md.mjs` | 从 JSON 生成分类 Markdown 文档（13 个主题板块） |
| `update-constants.mjs` | 一键执行完整流程（rg → extract → generate → build） |

**数据规模**：16,046 个字符串常量、200 个分类、12 个代码枚举、151 个 GameInfo 数据表。

**更新命令**：`cd scripts && node update-constants.mjs`

详细原理和用法见 `scripts/README.md`。

---

## 7. 质量标准

### 7.1 单个 API 条目质量要求

**最低标准**（所有条目必须满足）：
- [ ] `name` 正确
- [ ] `category` 正确
- [ ] `type` 正确
- [ ] `description` 至少一句话
- [ ] `sourceFiles` 至少一个

**推荐标准**（目标）：
- [ ] `detailedNotes` 有段落级说明
- [ ] `params` 每个参数有描述
- [ ] `returns` 有描述
- [ ] `examples` 至少一个完整示例
- [ ] `relatedAPIs` 列出关联 API

### 7.2 单个大类完成标准

- [ ] 所有可搜索到的方法/属性都已录入 JSON
- [ ] 每个条目满足最低标准
- [ ] 至少 50% 的条目满足推荐标准
- [ ] Markdown 页面能正确渲染所有条目

### 7.3 整体项目完成标准

- [x] Phase 0 完成（VitePress 站点搭建）
- [x] Phase 1 完成（GameplayMap 深度格式）
- [x] Phase 2 完成（Players 深度格式）
- [x] Phase 3 完成（Configuration 深度格式）
- [x] Phase 4 完成（Engine + Events 深度格式）
- [x] Phase 5 完成（Camera 深度格式）
- [ ] Phase 6 完成（GameInfo 核心数据表）
- [ ] Phase 7 完成（UI 组件 + 工具函数库）
- [ ] Phase 8 完成（游戏逻辑函数）
- [ ] VitePress 站点可正常启动，搜索可用
- [ ] 侧边栏导航完整

---

## 8. 当前进度总结

### 已完成
- ✅ 项目初始化（VitePress 站点、配置、部署脚本）
- ✅ Phase 1-5 的深度 JSON 数据和 Markdown 页面
- ✅ 源文件路径规范统一（从 `modules/` 开始）

### 待完成
- ⏳ Phase 6：GameInfo 核心数据表
- ⏳ Phase 7：UI 组件 + 工具函数库
- ⏳ Phase 8：游戏逻辑函数

### 数据统计
- 深度 JSON 方法/事件总数：123 个
  - GameplayMap: 19 个方法（深度） + 36 个（表格）
  - Players: 12 个方法
  - Configuration: 9 个方法
  - Engine: 12 个方法
  - Events: 61 个事件
  - Camera: 12 个方法

---

## 9. 注意事项

1. **不要猜测**：无法推断的参数描述标记为 `"待确认"`
2. **来源追溯**：每个 API 条目必须记录 `sourceFiles`，路径从 `modules/` 开始
3. **增量优先**：按 Phase 顺序逐个推进
4. **引擎全局对象优先**：这些是 Mod 开发最核心的 API
5. **保持 JSON 格式一致**：严格遵循第 4 节的 Schema
6. **源文件路径统一**：所有路径从 `modules/` 开始，不包含 `.官方变动/`
