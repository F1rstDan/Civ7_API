# Civ7 API 文档建设计划

> 本文档是整个项目的**核心指导文件**。任何 AI 在执行本项目任务前，必须先完整阅读本文档。

## 1. 项目目标

将《文明7》游戏文件中所有可用的 API（函数、类、事件、全局对象、数据表）整理为一个**可搜索、可跳转、美观的 Web 文档站**，方便 Mod 开发者查阅。

### 1.1 目标受众
文明7 Mod 开发者（主要是 Lua/JS 脚本层面）。

### 1.2 核心要求
- 每个 API 条目包含：名称、所属模块、参数（名称/类型/说明）、返回值、用法描述、代码示例、来源文件
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

### 2.2 代码特征（关键限制）
- **全部是打包/编译后的 JS 输出**，不是带注释的源码
- **几乎没有 JSDoc 注释**，无法直接从注释提取参数说明
- **没有 `.d.ts` 类型定义文件**，`.d.js` 文件仅含 sourcemap 注释
- 使用 ES Module 格式（`import/export`），现代 JS 语法
- 文件类型：`.js`（主逻辑）、`.html.js`（HTML模板）、`.scss.js`（CSS-in-JS）、`.json.js`（JSON数据）

### 2.3 核心全局 API（引擎注入，从不 import）

这些对象在代码中**直接使用，从不通过 import 引入**，是引擎注入到 JS 运行环境的：

| 全局对象 | 常见方法/属性 | 推断用途 |
|---------|-------------|---------|
| `engine` | `.on(event, cb)`, `.off(event, cb)`, `.whenReady` | 事件系统、引擎生命周期 |
| `GameplayMap` | `.getMapSize()`, `.getPlotDistance()` | 地图操作 |
| `GameInfo` | `.Maps.lookup()`, `.Civilizations.lookup()`, `.Leaders.lookup()` | 游戏数据表查询 |
| `Players` | `.getEverAlive()`, player.`isHuman`, `.civilizationType`, `.leaderType` | 玩家数据访问 |
| `Configuration` | `.getMapValue()` | 游戏配置读取 |
| `Camera` | `.setPreventMouseCameraMovement()` | 镜头控制 |
| `Component` | 所有 UI 组件的基类（`onInitialize`, `onAttach`, `onDetach`） | UI 框架 |

### 2.4 已知事件名（从 `engine.on()` 调用提取）

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
- **部署**：本地直接打开，或 `npx vitepress dev` 开发服务器

### 3.2 项目目录结构
```
Civ7_API/
├── PLAN.md                    # 本文档（初期建设计划）
├── UPDATE-WORKFLOW.md         # 更新流程文档
├── GOAL-PROMPT.md             # /goal 长期任务提示词
├── package.json
├── docs/                      # VitePress 文档源
│   ├── .vitepress/
│   │   └── config.js          # VitePress 配置（侧边栏、搜索、主题）
│   ├── index.md               # 首页
│   ├── api/                   # API 文档（按大类分文件）
│   │   ├── engine.md          # engine 对象
│   │   ├── gameplay-map.md    # GameplayMap 对象
│   │   ├── game-info.md       # GameInfo 数据表
│   │   ├── players.md         # Players 对象
│   │   ├── configuration.md   # Configuration 对象
│   │   ├── camera.md          # Camera 对象
│   │   ├── component.md       # Component 基类
│   │   ├── ui-components.md   # fxs-* UI 组件
│   │   ├── utilities.md       # 工具函数库
│   │   └── events.md          # 事件列表
│   └── data/                  # 结构化 JSON 数据
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

## 4. API 条目 JSON Schema

每个 API 条目遵循以下结构：

```json
{
  "name": "GameplayMap.getPlotDistance",
  "category": "GameplayMap",
  "type": "method",
  "module": "core",
  "params": [
    {
      "name": "x1",
      "type": "int",
      "description": "起点X坐标",
      "required": true
    },
    {
      "name": "y1",
      "type": "int",
      "description": "起点Y坐标",
      "required": true
    }
  ],
  "returns": {
    "type": "int",
    "description": "两个地块之间的距离"
  },
  "description": "计算两个地图坐标之间的六角格距离。",
  "example": "const iDist = GameplayMap.getPlotDistance(10, 20, 30, 40);",
  "sourceFiles": ["modules/base-standard/maps/map-utilities.js"],
  "status": "inferred",
  "notes": ""
}
```

### 4.1 status 字段取值
| 值 | 含义 |
|---|------|
| `verified` | 已在游戏内测试确认 |
| `inferred` | AI 从代码使用模式推断，未经游戏内验证 |
| `unverified` | 信息来源不确定，需要验证 |

### 4.2 type 字段取值
| 值 | 含义 |
|---|------|
| `method` | 对象方法（如 `GameplayMap.getPlotDistance`） |
| `property` | 对象属性（如 `player.isHuman`） |
| `event` | 引擎事件（如 `CityAddedToMap`） |
| `function` | 独立函数（如 `sub2` from MathHelpers） |
| `class` | 类定义（如 `Component`, `RegionCell`） |
| `constant` | 常量/枚举 |
| `table` | GameInfo 数据表（如 `GameInfo.Maps`） |

---

## 5. 执行计划（分阶段）

### 阶段一：项目初始化

**目标**：搭建 VitePress 项目骨架，配置好导航和搜索。

**步骤**：
1. 在 `Civ7_API/` 下初始化 npm 项目：`npm init -y`
2. 安装 VitePress：`npm add -D vitepress`
3. 创建 `docs/.vitepress/config.js`，配置：
   - 站点标题：「Civ7 Mod API Reference」
   - 侧边栏：按 API 大类分组
   - 启用内置搜索
   - 主题色（暗色模式为主，适合开发者）
4. 创建 `docs/index.md` 首页（简洁的 API 分类入口）
5. 创建空的 `docs/data/*.json` 文件（每个大类一个）
6. 创建空的 `docs/api/*.md` 文件（每个大类一个）
7. 验证：`npx vitepress dev docs` 能正常启动，导航可用

### 阶段二：API 数据采集（核心工作）

**目标**：从源文件中提取 API 定义，写入 JSON 数据文件。

**策略 A — 引擎全局 API**（`engine`, `GameplayMap`, `Players`, `GameInfo`, `Configuration`, `Camera`）

这些是 Mod 开发者最常接触的 API，优先级最高。

执行方法：
1. 用 `rg` 在整个 `modules/` 目录搜索该对象的所有方法调用
   - 例：`rg "GameplayMap\." "D:\Games Design\Civ7_mod\.官方变动\modules" -o --no-filename | sort | uniq -c | sort /r`
2. 从调用上下文推断参数数量和大致类型
3. 生成 JSON 草稿，标记 `status: "inferred"`
4. 写入对应的 `docs/data/*.json`

**策略 B — UI 框架 API**（`Component` 基类、`fxs-*` 组件、工具函数）

执行方法：
1. 直接阅读 `core/ui/components/` 和 `core/ui/utilities/` 下的文件
2. 这些文件有清晰的 class 定义和方法签名
3. 提取 class 继承关系、公开方法列表
4. 写入 `docs/data/component.json` 和 `docs/data/utilities.json`

**策略 C — 事件系统**

执行方法：
1. 用 `rg` 搜索所有 `engine.on("` 调用
2. 提取事件名和回调函数参数
3. 写入 `docs/data/events.json`

**策略 D — GameInfo 数据表**

执行方法：
1. 用 `rg` 搜索所有 `GameInfo.` 的使用
2. 提取表名（如 `Maps`, `Civilizations`, `Leaders`, `StartBiasBiomes`）
3. 从查询上下文推断字段名
4. 写入 `docs/data/game-info.json`

### 阶段三：文档页面渲染

**目标**：将 JSON 数据渲染为美观的 Markdown 文档页面。

每个 `docs/api/*.md` 文件的结构：
1. 标题和简介
2. 按字母顺序排列的 API 列表
3. 每个 API 包含：参数表格、返回值、描述、代码示例
4. 状态标记（verified/inferred/unverified）

VitePress 支持在 Markdown 中使用 Vue 组件，可以创建一个 `<ApiEntry>` 组件来统一渲染格式。

### 阶段四：迭代补充

按优先级依次完善：
1. **核心游戏逻辑 API**（地图、玩家、城市、单位、科技、外交）
2. **UI 交互 API**（界面模式、输入处理、对话框）
3. **数据表 API**（所有 GameInfo 子表）
4. **高级 API**（Mod 注册、事件钩子、配置覆盖）

---

## 6. 质量标准

### 6.1 完成度定义
一个 API 大类（如 `GameplayMap`）算「完成」需要满足：
- [ ] 所有可搜索到的方法/属性都已录入 JSON
- [ ] 每个条目有至少一行描述
- [ ] 每个条目的参数数量正确（类型可以是推断的）
- [ ] 至少 30% 的条目有代码示例
- [ ] Markdown 页面能正确渲染所有条目

### 6.2 整体项目完成定义
项目算「阶段性完成」需要满足：
- [ ] 6个核心全局 API 全部有文档页面（engine, GameplayMap, GameInfo, Players, Configuration, Camera）
- [ ] Component 基类 API 已记录
- [ ] 已知事件列表已整理（至少包含上面 2.4 节列出的事件）
- [ ] 至少 3 个 GameInfo 数据表已记录
- [ ] VitePress 站点可正常启动，搜索可用
- [ ] 侧边栏导航完整

---

## 7. 注意事项

1. **不要猜测**：如果无法从代码推断参数含义，标记为 `"description": "待确认"` 而不是编造
2. **来源追溯**：每个 API 条目必须记录 `sourceFiles`，方便后续验证
3. **增量优先**：不要试图一次性处理所有文件，按大类逐个推进
4. **引擎全局对象优先**：这些是 Mod 开发最核心的 API，应最先完成
5. **保持 JSON 格式一致**：严格遵循第 4 节的 Schema
