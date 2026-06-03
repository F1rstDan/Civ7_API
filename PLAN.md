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

### 2.6 TunerPanels 调试面板（第二数据源，权威 API 用法参考）

**路径**：`D:\Games Design\Civ7_mod\.官方变动\TunerPanels\`

**格式**：`.ltp` XML 文件，每个文件定义 Firaxis 内部 Tuner 调试工具的一个面板。

**价值**：
- 包含 Firaxis **官方 JavaScript 代码片段**，是最权威的 API 用法示例
- 代码直接展示了游戏对象的**完整属性链**（如 `player.Treasury.changeGoldBalance(500, -1)`）
- 揭示了大量从 `modules/` 源码中难以推断的**子系统层级关系**
- 面板分类比源码更清晰，每个 `.ltp` 文件对应一个功能领域

**面板清单**（37 个文件，按功能分组）：

| 分组 | 面板文件 | 揭示的主要 API |
|------|---------|---------------|
| 玩家管理 | Players.ltp, Player.ltp, Player Stories.ltp, Player Legacy Path.ltp, Player Modifiers.ltp | `Players.*`, player 子系统（Treasury, DiplomacyTreasury, Identity, Workers, Happiness, Stats, Techs, Culture, Stories, LegacyPaths, Modifiers, Advisory） |
| 城市 | Cities.ltp | `Cities.*`, city 子系统（BuildQueue, FoodQueue, Districts, Constructibles, Yields, Religion, Trade, Resources） |
| 单位 | Units.ltp | `Units.*`, unit 子系统（Health, Combat, Experience, Religion, Formations, Armies, Operations, Abilities） |
| 区域/建筑 | Districts.ltp | `Districts.*`, `Constructibles.*`, district 属性（isQuarter, isUniqueQuarter, isUrbanCore, isDefensible） |
| 外交 | Diplomacy.ltp, Deals.ltp | `player.Diplomacy.*`, `Game.DiplomacySessions.*`, `Game.DiplomacyDeals.*`, `Game.Diplomacy.*`, `player.Influence.*` |
| 贸易 | Trade.ltp | `Game.Trade.*`, `player.Trade.*`, `city.Trade.*` |
| 资源 | Resources.ltp | `player.Resources.*`, `city.Resources.*` |
| 地图 | Map.ltp, Map Areas.ltp, Map_Regions.ltp | `WorldBuilder.*`, `MapAreas.*`, `MapRegions.*`, `RegionBuilder.*`, `Visibility.*` |
| 自然 | Features.ltp, Rivers.ltp, Random Events.ltp, Plot Effects.ltp | `MapFeatures.*`, `MapRivers.*`, `MapStorms.*`, `MapPlotEffects.*`, `MapPlotYields.*` |
| 外交/胜利 | Victories.ltp, VictoriesDefeats.ltp, Legacies.ltp, Independents.ltp | `Game.VictoryManager.*`, `player.Victories.*`, `player.Legacies.*`, `Game.IndependentPowers.*`, `Game.AgeProgressManager.*` |
| 效果系统 | Modifiers.ltp, Requirements.ltp | `GameEffects.*`（Modifier/Requirement 完整 API） |
| 调试/反射 | Reflection.ltp, Autoplay.ltp, Advice.ltp | `ReflectionArchives.*`, `Autoplay.*`, `AdviceManager.*` |
| 配置/叙事 | Configuration.ltp, Notifications.ltp | `Configuration.*` 补充, `Game.Notifications.*`, `GameSetup.*` |
| 开局 | AdvancedStart.ltp | `player.AdvancedStart.*` |

**提取方法**：解析 XML 中的以下节点：
- `<PopulateList>` — 列表数据填充代码（最丰富的 API 用法）
- `<Action>` — 按钮触发的操作代码（展示完整操作流程）
- `<GetFunction>` / `<SetFunction>` — 读写控件代码（展示属性读写）
- `<OnSelection>` — 列表选中事件代码（展示数据解析模式）

---

## 3. 技术方案

### 3.1 技术栈
- **文档站框架**：VitePress（Vue 驱动的静态站点生成器）
- **数据层**：Markdown 文件（每个 API 大类一个 .md 页面）+ `docs/data/constants.json`（常量自动化管线的中间格式）
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
│       └── constants.json     # 常量自动化管线的中间数据（rg → JSON → MD）
```

---

## 4. 数据采集方法：四遍扫描法

由于源文件是打包后的代码且几乎没有注释，采用「四遍扫描法」从使用模式中反推 API 语义。TunerPanels 作为第三遍的核心数据源。

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
4. 标注为"推断"状态

### 第四遍：TunerPanels 官方代码交叉验证（新增）

对每个 API 方法，在 TunerPanels `.ltp` 文件中搜索其使用：
1. 解析 `.ltp` XML，提取所有 `<PopulateList>`、`<Action>`、`<GetFunction>`、`<SetFunction>` 中的 JS 代码
2. 搜索目标 API 在这些代码片段中的出现
3. 从官方代码中提取：参数类型确认、返回值用法、子系统层级、操作流程
4. 将最佳官方代码片段记录到对应 Markdown 文档中
5. 若 TunerPanel 代码确认了推断，在文档中标注为"Tuner 验证"

**TunerPanels 提供的独特价值**：
- **参数确认**：从 `Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.X, args)` 可确认操作类型枚举
- **子系统发现**：从 `player.Treasury.changeGoldBalance(500, -1)` 可发现 Treasury 子系统
- **操作流程**：从 Deals.ltp 的「Enact Open Borders」可看到完整的交易创建流程
- **枚举值**：从 `UnitActivityTypes.AWAKE`、`WarTypes.SURPRISE_WAR` 等可直接获取枚举常量
- **数据表结构**：从 `GameInfo.NarrativeStories.lookup(pStory.type)` 可确认表的存在和用法

---

## 5. 执行计划（分阶段，按优先级）

### Phase 0：项目初始化 ✅ 已完成
搭建 VitePress 项目骨架，配置好导航和搜索。
1. ✅ `npm init -y` + `npm add -D vitepress`
2. ✅ 创建 `docs/.vitepress/config.js`（含侧边栏、搜索、导航）
3. ✅ 创建 `docs/index.md` 和 31 个 `docs/api/*.md` 页面
4. ✅ 创建 `docs/data/constants.json` 常量数据文件
5. ✅ `npx vitepress dev docs` 可正常启动，搜索可用
6. ✅ GitHub Pages 部署配置（`.github/workflows/deploy.yml`）
7. ✅ 批处理启动脚本（`!启动文明7文档站.bat`）
8. ✅ 常量自动提取脚本（`scripts/extract-constants.mjs` 等）

### Phase 1：GameplayMap（60 个方法）— P0 ✅ 已完成深度格式
Mod 开发最常用的地图操作 API。
- ✅ 深度 Markdown 已完成（19 个核心方法，含详细说明、代码示例、源文件引用）
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

### Phase 6：GameInfo 核心数据表 — P0 核心表 + P1 扩展表 ✅ 核心表已完成
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
### Phase T1：TunerPanels 集成 — 更新已有页面 ✅ 已完成
将 `.ltp` 文件中发现的 API 信息融入现有文档页面。
- ✅ `players.md`：补充 player 子系统（Treasury, DiplomacyTreasury, Identity, Workers, Happiness, Stats, Influence, Trade, Resources, Modifiers, Formations, Armies）
- ✅ `cities.md`：完整 Cities API（BuildQueue, FoodQueue, Districts, Constructibles, Yields, Religion）
- ✅ `units.md`：完整 Units API（Health, Combat, Experience, Religion, Operations, Abilities）
- ✅ `districts.md`：完整 Districts API + Constructibles API
- ✅ `diplomacy.md`：完整 Diplomacy 子系统（15+ 方法）
- ✅ `configuration.md`：补充 GameSetup, NarrativeSifting, editMap
- ✅ `independent-powers.md`：完整 IndependentPowers API
- ✅ `notifications.md`：完整 Notifications API
- ✅ `resources.md`：完整 Resources API

### Phase T2：TunerPanels 集成 — 新增文档页面 ✅ 已完成
为 `.ltp` 中发现的全新 API 系统创建独立文档页面。
- ✅ `game-effects.md`：GameEffects 系统（Modifiers + Requirements）
- ✅ `trade.md`：Game.Trade + player.Trade + city.Trade
- ✅ `victories.md`：Game.VictoryManager + player.Victories + Defeats
- ✅ `legacies.md`：player.Legacies + player.LegacyPaths
- ✅ `stories.md`：player.Stories + NarrativeStories
- ✅ `map-features.md`：MapFeatures + MapRivers + MapStorms + MapPlotEffects + WorldUI 模型组
- ✅ `advanced-start.md`：player.AdvancedStart
- ✅ `visibility.md`：Visibility API
- ✅ `reflection.md`：ReflectionArchives API
- ✅ `autoplay.md`：Autoplay API
- ✅ `random-events.md`：Game.RandomEvents + Game.Combat + WMD（新增）
- ✅ `unlocks.md`：Game.Unlocks 解锁系统（新增）
- ✅ `advisors.md`：AdviceManager 建议系统（新增）
- ✅ `world-units.md`：WorldUnits 单位可视化（新增）

### Phase T3：TunerPanels 常量/枚举补充 ✅ 已完成
从 `.ltp` 中提取的枚举常量补充到 `constants.md`。
- ✅ UnitActivityTypes（14 个值，来自 WorldUnits.ltp）
- ✅ UnitIdleStyles（6 个值，来自 WorldUnits.ltp）
- ✅ CombatTypes（6 个值，来自 WorldUnits.ltp）
- ✅ AgeStyles（3 个值，来自 WorldUnits.ltp）
- ✅ AdvisorySubjectTypes（4 个类别，来自 Advice.ltp）
- ✅ PlayerOperationTypes 已知值（来自 Pax Imperatoria.ltp、Deals.ltp）
- ✅ UnitOperationTypes 已知值（来自 Pax Imperatoria.ltp）
- ✅ DiplomacyDealItemTypes 已知值（来自 Deals.ltp）
- ✅ WarTypes 已知值（来自 Diplomacy.ltp）

### Phase T4：站点配置更新 ✅ 已完成
- ✅ 更新 `docs/.vitepress/config.js` 侧边栏，新增所有 Phase T1/T2 的页面
- ✅ 更新 `README.md` 的 API 概览表
- 构建站点验证待执行

---

## 6. 质量标准

### 7.1 单个 API 条目质量要求

**最低标准**（所有条目必须满足）：
- [ ] `name` 正确
- [ ] `category` 正确
- [ ] `type` 正确
- [ ] `description` 至少一句话
- [ ] 源文件引用至少一个

**推荐标准**（目标）：
- [ ] 有段落级详细说明
- [ ] `params` 每个参数有描述
- [ ] `returns` 有描述
- [ ] `examples` 至少一个完整示例
- [ ] 列出关联 API

### 7.2 单个大类完成标准

- [ ] 所有可搜索到的方法/属性都已写入 Markdown 文档
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
- [x] Phase 6 完成（GameInfo 核心数据表 - 15 个核心表已文档化）
- [x] Phase 7 完成（工具函数库 - 7 个工具组已文档化）
- [x] Phase T1 完成（TunerPanels 集成 - 更新已有页面：9 个页面已更新）
- [x] Phase T2 完成（TunerPanels 集成 - 新增页面：14 个新页面已创建）
- [x] Phase T3 完成（TunerPanels 常量/枚举补充：9 类枚举已添加到 constants.md）
- [x] Phase T4 完成（站点配置更新：侧边栏 + README 已更新）
- [ ] Phase 8 完成（游戏逻辑函数）
- [x] VitePress 站点可正常启动，搜索可用
- [x] 侧边栏导航完整

---

## 7. 当前进度总结

### 已完成
- ✅ 项目初始化（VitePress 站点、配置、部署脚本）
- ✅ Phase 1-5 的深度 Markdown 文档页面
- ✅ 源文件路径规范统一（从 `modules/` 开始）

### 已完成（本轮新增）
- ✅ Phase 6：GameInfo 核心数据表（15 个核心表已文档化）
- ✅ Phase 7：UI 组件 + 工具函数库（7 个工具组已文档化）

### 已完成（TunerPanels 集成）
- ✅ Phase T1：更新 9 个已有页面（players, cities, units, districts, diplomacy, configuration, independent-powers, notifications, resources）
- ✅ Phase T2：创建 14 个新页面（game-effects, trade, victories, legacies, stories, map-features, advanced-start, visibility, reflection, autoplay, random-events, unlocks, advisors, world-units）
- ✅ Phase T3：添加 9 类 TunerPanels 枚举到 constants.md
- ✅ Phase T4：更新侧边栏配置和 README

### 待完成（未来长期任务）
- ⏳ Phase 8：游戏逻辑函数（base-standard/maps/ + scripts/ + age 模块）

### 数据统计（TunerPanels 集成后）
- 文档页面总数：**45 个** Markdown 页面
- 核心引擎 API：11 个页面
- 游戏对象：12 个页面
- Game 子系统（TunerPanels）：6 个页面
- Player 子系统（TunerPanels）：5 个页面
- 地图子系统（TunerPanels）：4 个页面
- 可视化与调试（TunerPanels）：3 个页面
- UI 框架：5 个页面
- 事件参考：1 个页面
- 常量与枚举：1 个页面（含 TunerPanels 枚举）
- 深度文档化的方法/事件/表/工具总数：200+ 个

---

## 8. 注意事项

1. **不要猜测**：无法推断的参数描述标记为 `"待确认"`
2. **来源追溯**：每个 API 条目必须记录源文件引用，路径从 `modules/` 开始
3. **增量优先**：按 Phase 顺序逐个推进
4. **引擎全局对象优先**：这些是 Mod 开发最核心的 API
5. **源文件路径统一**：所有路径从 `modules/` 开始，不包含 `.官方变动/`
6. **TunerPanel 示例优先**：当 `.ltp` 中有官方代码时，优先在文档中标注来源和验证状态
7. **TunerPanel 路径引用**：文档中引用 `.ltp` 面板文件时使用相对路径（如 Cities.ltp），不包含上级目录
