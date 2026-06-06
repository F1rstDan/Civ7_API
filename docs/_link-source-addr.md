# 文明7官方源码目录说明

## 根目录

`D:\Games Design\Civ7_mod\.官方变动`

由两个子目录 + 一个 `.gitignore` 文件构成，已通过 **Git 管理**（`main` 分支，20 个版本提交）。

| 子目录 | 文件数 | 说明 |
|--------|--------|------|
| `modules\` | 6,816 | **符号链接目录**，指向实际游戏模块源码（JS/TS、XML、CSS、视频、字体等） |
| `TunerPanels\` | 37 | **符号链接目录**，指向 Firaxis 内部 Live Tuner 调试面板定义（`.ltp` XML） |
| **合计** | **6,853** | **⚠️ 注意**：由于是符号链接，上级扫描时须特别配置追踪参数，详见第四部分。 |

---

## 一、`modules\` 模块源码（6,816 文件，~1.26 GB）

### 1.1 顶层模块目录

| 模块 | 作用 | JS/TS 文件数 |
|------|------|-------------|
| `core\` | 核心框架（UI 组件、输入系统、工具库、Shell 主菜单） | 574 |
| `base-standard\` | 主游戏逻辑（地图、脚本、80+ UI 界面） | 780 |
| `age-antiquity\` | 古典时代专属逻辑 | 7 |
| `age-exploration\` | 探索时代专属逻辑 | 11 |
| `age-modern\` | 现代时代专属逻辑 | 7 |
| **合计** | | **1,379** |

> **API 提取核心目标**：1,379 个 `.js`/`.ts` 文件，总计约 **10 MB**。这是本项目文档化的主要数据来源。

### 1.2 单模块标准子目录结构

以 `base-standard\` 为典型：

```
base-standard\
├── config\          # XML 配置文件
├── data\            # 图标、颜色等资源
│   ├── icons\
│   └── colors\
├── l10n\            # 11 种语言本地化目录
│   ├── zh_Hans_CN\  # 简体中文
│   ├── en_us\       # 英文
│   └── ...          # de_DE, es_ES, fr_FR, it_IT, ja_JP, ko_KR, pl_PL, pt_BR, ru_RU, zh_Hant_HK
├── maps\            # 地图数据文件
├── movies\          # 过场视频（.webm）
├── scripts\         # ★ 游戏逻辑脚本（JS）—— 后端/AI 核心
├── text\            # 文本内容（en_us、subtitles）
├── ui\              # ★ 游戏内 UI 组件（JS）—— 前端界面
└── ui-next\         # 新一代 UI 框架（仅 core 和 base-standard 有）
```

`core\` 额外包含：
- `fonts\` — 游戏字体（.ttf/.otf，25 个）
- `vendor\` — 第三方库（solid-js、vite）
- `ui\shell\` — Shell 主菜单系统（大厅、多人、设置等）

### 1.3 文件类型统计

| 类型 | 文件数 | 总大小 | 与 API 文档的关系 |
|------|--------|--------|------------------|
| `.js` | 1,379 | ~10 MB | ★ **核心提取目标** |
| `.map` | 1,395 | ~21.5 MB | Sourcemap（`.js` 的对应文件，一般不需扫描） |
| `.vtt` | 2,784 | ~0.5 MB | 字幕文件，无 API 信息 |
| `.xml` | 852 | — | 配置/数据文件，包含 GameInfo 数据表定义 |
| `.css` | 182 | — | 样式文件，UI 组件的 CSS-in-JS |
| `.webm` | 136 | **~1.2 GB** | 过场/背景视频（占绝大部分存储） |
| `.html` | 16 | — | HTML 模板片段 |
| `.ttf` / `.otf` | 25 | — | 游戏字体 |
| `.ani` | 11 | — | 动画定义文件 |
| `.png` / `.rgba` | 21 | — | 图片资源 |
| `.json` | 9 | — | 数据文件 |
| `.modinfo` | 5 | — | 模块元数据 |
| `.sql` | 1 | — | SQL 脚本 |

---

## 二、`TunerPanels\` 调试面板（37 个 `.ltp` 文件）

Firaxis 内部 Live Tuner 调试面板定义文件。格式为 XML，内部嵌入了 **官方 JavaScript 代码片段**，是确认 API 用法的权威参考。

面板按功能分为 13 组：

| 分组 | 面板文件 |
|------|---------|
| 玩家管理 | Players, Player, Player Stories, Player Legacy Path, Player Modifiers |
| 城市 | Cities |
| 单位 | Units |
| 区域/建筑 | Districts |
| 外交 | Diplomacy, Deals |
| 贸易 | Trade |
| 资源 | Resources |
| 地图 | Map, Map Areas, Map_Regions |
| 自然/环境 | Features, Rivers, Random Events, Plot Effects |
| 胜利/传承 | Victories, VictoriesDefeats, Legacies, Independents |
| 效果系统 | Modifiers, Requirements |
| 开局/配置 | AdvancedStart, Configuration, Notifications |
| 调试 | Reflection, Autoplay, Advice, Modding, Pax Imperatoria |

**提取方法**：解析 XML 中的 `<PopulateList>`、`<Action>`、`<GetFunction>`、`<SetFunction>` 节点。

---

## 三、Git 版本历史

源码目录已通过 Git 管理，记录了自 2025.08 至 2026.05 的主要版本更新。

**更新检查命令**：

```powershell
cd "D:\Games Design\Civ7_mod\.官方变动"
git diff --name-status HEAD~1
```
或者后面改成指定想看的目录：
`git diff --name-status HEAD~1 -- modules/`
`git diff --name-status HEAD~1 -- TunerPanels/`

---

## 四、扫描注意事项

### 4.1 推荐扫描工具与避坑（必读）

- **首选 `rg`（ripgrep）**：速度快、支持正则、自动跳过 `.gitignore` 和二进制文件。适合在 ~1,400 个 JS 文件中搜索 API 调用模式。
- 备选 `Select-String`（PowerShell 原生）：`rg` 不可用时使用，速度约慢 5-10 倍。

> [!IMPORTANT]
> **⚠️ 符号链接扫描规则**：
> 因为 `modules\` 和 `TunerPanels\` 在根目录下是**符号链接**，`rg` 默认不追踪符号链接。
> - **如果搜索路径为根目录** `D:\Games Design\Civ7_mod\.官方变动`，**必须**使用 `-L`（`--follow`）参数，否则扫描结果为空。
> - **如果直接指定了子目录**（如 `D:\Games Design\Civ7_mod\.官方变动\modules`），则无需加 `-L`。
> - 在 PowerShell 下执行 `rg` 时**绝对不要追加 `2>$null`**（这会吞掉正则解析错误，导致原本存在的 API 漏匹配）。
> - 如果使用正则中的环视断言，**必须添加 `--pcre2` 参数**，否则 `rg` 会静默失败返回 1。

```powershell
# 示例：搜索 GameplayMap 的所有方法调用（指定直接子目录，无需 -L）
rg -n "GameplayMap\.\w+" "D:\Games Design\Civ7_mod\.官方变动\modules" -g "*.js" --no-heading

# 示例：搜索 engine 事件注册（指定根目录，必须加上 -L 以追踪符号链接）
rg -n -L 'engine\.on\("[A-Za-z]+' "D:\Games Design\Civ7_mod\.官方变动" -g "*.js"

# 示例：使用环视正则排除后缀误匹配（必须加 --pcre2 参数，否则报错或静默失败）
rg -n -L --pcre2 "(?<![A-Za-z0-9_$])Units\." "D:\Games Design\Civ7_mod\.官方变动" -g "*.js"

# 示例：限定搜索某个模块子目录（不经过符号链接，性能最佳）
rg -n "GameInfo\.\w+" "D:\Games Design\Civ7_mod\.官方变动\modules\base-standard\scripts"
```

### 4.2 排除不必要的文件

扫描 API 时应聚焦 `.js` 文件，忽略以下类型：
- `.map`（sourcemaps）—— 与 JS 一一对应，内容是映射数据，无 API 信息
- `.vtt`（字幕）—— 纯文本时间轴
- `.webm`（视频）—— 二进制媒体
- `.ttf` / `.otf`（字体）—— 二进制

```powershell
# rg 默认已跳过二进制文件；如需显式限定文件类型：
rg -n "pattern" -g "*.js" -g "*.html" modules/
```

### 4.3 大量文件的性能考量

- `modules\` 共 6,816 文件，但与 API 相关的 JS/HTML 仅约 1,400 个
- `.webm` 视频占 1.2 GB，使用 `-g "*.js"` 限定可避免扫描无关媒体
- `rg` 的全量扫描通常在 1-2 秒内完成
- 若只需检查近期变动，优先用 `git diff` 而非全量扫描

### 4.4 路径引用规范

文档中引用源文件路径时，不含上级目录前缀，统一从 `modules/` 或 `TunerPanels/` 开始。例如：

```
modules/base-standard/maps/map-utilities.js
modules/core/ui/utilities/plot-utils.js
TunerPanels/Player.ltp
```