# Civ7 Mod API 文档站

文明7 Mod 开发 API 参考文档。从官方游戏文件中自动提取所有可用的全局 API、方法、事件和数据表。

**在线文档，直接体验：[https://f1rstdan.github.io/Civ7_API/](https://f1rstdan.github.io/Civ7_API/)**

## 离线文档如何自行部署

### 方式一：双击启动（推荐小白使用）

双击项目根目录下的 **`启动文档站.bat`**，等待几秒后浏览器会自动打开。

### 方式二：命令行启动

```bash
# 首次使用需要安装依赖
npm install

# 启动开发服务器（支持热更新）
npm run dev

# 或者构建静态文件后预览
npm run build
npx vitepress preview docs
```

启动后访问 http://localhost:5173

## 项目结构

```
Civ7_API/
├── docs/                        # 文档源文件
│   ├── .vitepress/config.js     # VitePress 配置（侧边栏、搜索）
│   ├── index.md                 # 首页
│   ├── api/                     # API 文档页面（共 45 个）
│   │   ├── game.md              # Game 对象
│   │   ├── gameplay-map.md      # GameplayMap（55个方法）
│   │   ├── game-info.md         # GameInfo 数据表（84个表）
│   │   ├── players.md           # Players（19个方法）
│   │   ├── configuration.md     # Configuration（10个方法）
│   │   ├── camera.md            # Camera（30个方法）
│   │   ├── engine.md            # Engine 事件系统（16个方法）
│   │   ├── units.md             # Units 单位管理
│   │   ├── cities.md            # Cities 城市管理
│   │   ├── districts.md         # Districts 区域管理
│   │   ├── resources.md         # Resources 资源管理
│   │   ├── diplomacy.md         # Diplomacy 外交系统
│   │   ├── game-effects.md      # GameEffects 效果系统
│   │   ├── trade.md             # Trade 贸易系统
│   │   ├── victories.md         # Victories 胜利系统
│   │   ├── random-events.md     # Random Events 随机事件
│   │   ├── unlocks.md           # Unlocks 解锁系统
│   │   ├── world-units.md       # WorldUnits 单位可视化
│   │   ├── map-features.md      # MapFeatures 自然特征
│   │   └── ...                  # 更多API页面
│   └── data/                    # JSON 数据文件
│       ├── constants.json       # 常量与枚举数据
│       └── ...                  # 其他 JSON 数据
├── PLAN.md                      # 项目建设计划
├── UPDATE-WORKFLOW.md           # 游戏更新后的文档同步流程
├── GOAL-PROMPT.md               # AI 长期任务提示词
├── 启动文档站.bat                # 双击启动脚本
└── package.json
```

## 已收录 API 概览

| 分类 | 数量 | 说明 |
|------|------|------|
| 核心引擎 API | 11 个页面 | Game, GameplayMap, GameInfo, Players, Configuration, Camera, Engine, Locale, Network, Modding, Automation |
| 游戏对象 | 12 个页面 | Units, Cities, Districts, Resources, Diplomacy, Culture, Religion, ProgressionTrees, Notifications 等 |
| Game 子系统 | 6 个页面 | GameEffects, Trade, Victories, Random Events, Unlocks, Visibility |
| Player 子系统 | 5 个页面 | Legacies, Stories, AdvancedStart, Autoplay, Advisors |
| 地图子系统 | 4 个页面 | MapFeatures, Map Builders, Map Regions, Reflection |
| 可视化与调试 | 3 个页面 | WorldUnits, WorldUI Models, Audio & Debug |
| UI 框架 | 5 个页面 | Component 基类, UI Framework, Audio & Debug, Input, Social |
| 事件参考 | 1 个页面 | 148 个引擎事件 |
| 常量与枚举 | 1 个页面 | 16000+ 字符串常量、200 个分类、12 个代码枚举、TunerPanels 枚举 |

## 更新文档

当文明7发布新版本后，按 `UPDATE-WORKFLOW.md` 中的流程更新：

1. 检查源文件变动（git diff 或文件修改时间）
2. 提取新增/变更的 API
3. 更新文档页面
4. 重新构建站点

详细流程见 [UPDATE-WORKFLOW.md](./UPDATE-WORKFLOW.md)

## 技术栈

- **VitePress** - 静态站点生成器
- **本地搜索** - 无需外部服务
- **Markdown** - 文档格式

## 源文件位置

官方游戏文件位于：`D:\Games Design\Civ7_mod\.官方变动\modules\`

TunerPanels 调试面板位于：`D:\Games Design\Civ7_mod\.官方变动\TunerPanels\`

## 许可

本文档仅供个人 Mod 开发参考使用。
