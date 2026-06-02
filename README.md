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
│   ├── api/                     # API 文档页面
│   │   ├── game.md              # Game 对象
│   │   ├── gameplay-map.md      # GameplayMap（55个方法）
│   │   ├── game-info.md         # GameInfo 数据表（84个表）
│   │   ├── players.md           # Players（19个方法）
│   │   ├── configuration.md     # Configuration（10个方法）
│   │   ├── camera.md            # Camera（30个方法）
│   │   ├── engine.md            # Engine 事件系统（16个方法）
│   │   ├── component.md         # Component UI 基类
│   │   ├── events.md            # 全部事件列表（148个事件）
│   │   ├── units.md             # Units 单位管理
│   │   ├── cities.md            # Cities 城市管理
│   │   ├── diplomacy.md         # Diplomacy 外交系统
│   │   ├── culture.md           # Culture 文化系统
│   │   ├── religion.md          # Religion 宗教系统
│   │   ├── locale.md            # Locale 本地化
│   │   ├── network.md           # Network 网络/多人
│   │   ├── modding.md           # Modding Mod管理
│   │   ├── ui-framework.md      # UI框架（UI/Databind/NavTray等）
│   │   ├── map-builders.md      # 地图构建（TerrainBuilder等）
│   │   └── ...                  # 更多API页面
│   └── data/                    # JSON 数据文件
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
| UI 框架 | 5 个页面 | Component 基类, UI Framework, Audio & Debug, Input, Social |
| 地图构建 | 1 个页面 | TerrainBuilder, AreaBuilder, ResourceBuilder, FractalBuilder, StartPositioner |
| 事件参考 | 1 个页面 | 148 个引擎事件 |

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

## 许可

本文档仅供个人 Mod 开发参考使用。
