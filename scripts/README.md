> 本文档说明 `scripts/` 目录下各脚本的用途、原理和使用方法。
> 所有脚本均在项目根目录 `Civ7_API/` 下通过 `cd scripts && node <脚本名>` 运行。

---

## 目录结构

```
Civ7_API/
├── scripts/                         # 脚本目录
│   ├── extract-constants.mjs        # 步骤1：从源码提取常量 → JSON
│   ├── generate-constants-md.mjs    # 步骤2：从 JSON 生成 Markdown 文档
│   └── README.md                    # 本文件
├── all-strings.tmp.txt              # 临时文件（rg 输出，可删除后重新生成）
├── docs/
│   ├── api/constants.md             # 最终输出：常量文档页面
│   └── data/constants.json          # 中间产物：结构化常量数据
└── .官方变动/modules/                # 游戏源码目录（只读）
```

---

## 完整更新流程（一键执行）

在项目根目录 `Civ7_API/` 下执行：

```powershell
# 1. 从游戏源码中提取所有大写字符串常量(过滤掉 `LOC_` 前缀的字符串)
rg '"[A-Z][A-Z_]+_[A-Z][A-Z_]+"' "D:\Games Design\Civ7_mod\.官方变动\modules" --no-filename -o | rg -v '^"LOC_' | Sort-Object -Unique > all-strings.tmp.txt

# 2. 运行提取脚本（解析 rg 输出 + 枚举 + GameInfo 表）
cd scripts && node extract-constants.mjs

# 3. 生成 Markdown 文档
node generate-constants-md.mjs && cd ..

# 4. 重建 VitePress 站点
npx vitepress build docs
```

或直接运行一键脚本：

```powershell
cd scripts && node update-constants.mjs
```

---

## 脚本 1：`extract-constants.mjs`

### 用途

从游戏源码中提取三大类数据，输出到 `docs/data/constants.json`：

| 数据类型 | 来源 | 提取方式 |
|----------|------|----------|
| **字符串常量** | `all-strings.tmp.txt`（rg 预提取） | 按前缀分类，过滤 LOC_/FXS_/COHTML_ |
| **代码枚举** | `.js` 源文件 | 正则匹配 `export const X = { ... }` 和 `Object.freeze({...})` |
| **GameInfo 表** | `.js` 源文件 | 正则匹配 `GameInfo.XXX` 调用 |

### 原理详解

#### 字符串常量提取（两阶段设计）

**为什么用两阶段？** 游戏源码有 1379 个 JS 文件，总大小数百 MB。如果用 Node.js 的正则逐文件扫描，容易因为文件过大导致正则匹配不完整（之前实测只匹配到 1,197 个，而实际有 13,494 个）。

**阶段 1：ripgrep 预提取**

```powershell
rg '"[A-Z][A-Z_]+_[A-Z][A-Z_]+"' modules/ --no-filename -o | rg -v '^"LOC_' | Sort-Object -Unique > all-strings.tmp.txt
```

- `rg`（ripgrep）是用 Rust 编写的超快文本搜索工具，比 Node.js 正则快 10-100 倍
- 正则 `"[A-Z][A-Z_]+_[A-Z][A-Z_]+"` 匹配引号内的大写+下划线字符串，且至少包含一个下划线
- `--no-filename` 不输出文件名，`-o` 只输出匹配部分
- `rg -v '^"LOC_'` 过滤掉 `LOC_` 前缀的字符串（本地化键，约 16,256 个；去重前约 29,750 个）
- `Sort-Object -Unique` 去重排序
- 结果：约 13,494 个唯一字符串

**阶段 2：Node.js 分类过滤**

读取 rg 输出，执行：
1. 去除引号
2. 按第一个下划线前的前缀分组（如 `BIOME_DESERT` → 前缀 `BIOME`）
3. 过滤掉不需要的前缀：`FXS`、`COHTML`
4. 保留出现 2 次以上的前缀分类，每类最多保留 500 个值

#### 代码枚举提取

扫描所有 `.js` 文件，用两种正则模式匹配：

**模式 1：普通对象**
```javascript
// 匹配：export const EnumName = { KEY1: 0, KEY2: 1, ... }
/(?:export\s+)?(?:const|var)\s+(\w+)\s*=\s*\{([^}]{20,})\}/g
```

**模式 2：冻结对象**
```javascript
// 匹配：export const EnumName = Object.freeze({ KEY: value, ... })
/(?:export\s+)?(?:const|var)\s+(\w+)\s*=\s*Object\.freeze\(\{([^}]+)\}\)/g
```

筛选条件：至少 2 个条目 + 首字母大写的键名 + 数字值 → 认定为枚举。

#### GameInfo 表提取

```javascript
// 匹配所有 GameInfo.XXX 的调用
/GameInfo\.(\w+)/g
```

收集所有不同的表名并排序去重。

### 输出格式

```json
{
  "meta": {
    "generatedAt": "2026-06-02T...",
    "totalStringConstants": 13494,
    "totalPrefixCategories": 977,
    "totalObjectEnums": 12,
    "totalGameInfoTables": 151
  },
  "categories": [
    {
      "prefix": "BIOME",
      "count": 6,
      "values": ["BIOME_DESERT", "BIOME_GRASSLAND", ...]
    },
    ...
  ],
  "objectEnums": [
    {
      "name": "SomeEnum",
      "type": "enum",
      "source": "core/some-file.js",
      "entries": [{ "key": "VALUE_A", "value": "0" }, ...]
    }
  ],
  "gameInfoTables": ["Ages", "Buildings", "Civilizations", ...]
}
```

---

## 脚本 2：`generate-constants-md.mjs`

### 用途

读取 `docs/data/constants.json`，生成 `docs/api/constants.md` Markdown 文档。

### 原理

1. 读取 JSON 数据
2. 将 200 个前缀分类归入 13 个主题板块（地形与地图、文明与领袖、城市与建筑等）
3. 未归类的前缀自动放入"其他"
4. 每个分类生成 `#### 前缀名 (数量)` 标题 + 代码块列表
5. 枚举生成表格（键 | 值）
6. GameInfo 表生成表格

### 主题板块映射

| 板块 | 包含的前缀 |
|------|-----------|
| 地形与地图 | BIOME, TERRAIN, FEATURE, NATURAL, CONTINENT, RADIAL, PLOT, PLOTEFFECT |
| 文明与领袖 | CIVILIZATION, LEADER, AGE, AGES, PLAYER, HANDICAP, DIFFERENT |
| 城市与建筑 | CITY, BUILDING, DISTRICT, IMPROVEMENT, WONDER, SETTLEMENT |
| 单位与军事 | UNIT, UNITCOMMAND, UNITOPERATION, FORMATION, COMBAT |
| 资源与产出 | RESOURCE, RESOURCECLASS, YIELD, TRADE |
| 外交与胜利 | DIPLOMACY, VICTORY, LEGACY, GRIEVANCE, WAR |
| 文化与信仰 | BELIEF, IDEOLOGY, TRADITION, PROMOTION, ABILITY, TRAIT, CARD |
| 通知与界面 | NOTIFICATION, INTERFACEMODE, SLOT, DROPDOWN, VFX, LOGO, BACKGROUND |
| 进度与元数据 | METAPROGRESSION, UNLOCK, PROJECT, QUEST, CHALLENGE |
| 游戏系统 | GAME, KIND, DEFAULT, CORE, NODE, DOMAIN, START, LINKED, TAG, CLASS |
| AI 与顾问 | AI, ADVICE, ADVISOR, ADVISORY, ACKNOWLEDGE, REMIND, NOTIFY |
| 独立势力 | INDEPENDENT, BARBARIAN, GOODYHUT, GOODY, DISCOVERY |
| 其他 | 所有未归类的前缀 |

如需调整板块映射，修改 `sectionMap` 对象即可。

---

## 依赖工具

| 工具 | 用途 | 安装 |
|------|------|------|
| `rg`（ripgrep） | 超快文本搜索 | `winget install BurntSushi.ripgrep.MSVC` 或 `scoop install ripgrep` |
| `node` | 运行 JS 脚本 | 已安装（项目自带 VitePress） |
| `npx vitepress` | 构建文档站点 | 项目 `node_modules` 中已有 |

---

## 常见问题

### Q: 为什么 rg 找到 29,750 个字符串，但最终只有 13,494 个？

因为过滤掉了：
- `LOC_*` 前缀：16,256 个（这些是 UI 本地化键名，不是游戏逻辑常量）
- `FXS_*`、`COHTML_*` 前缀：框架内部标识符
- 只出现 1 次的前缀分类：噪音数据

### Q: 为什么用 rg 而不是纯 Node.js 正则？

实测对比：
- Node.js 正则扫描 1379 个 JS 文件：只匹配到 1,197 个常量
- rg 预提取 + Node.js 分类：匹配到 13,494 个常量

原因：部分 JS 文件非常大（数 MB），Node.js 的 `RegExp.exec()` 在超大字符串上行为不稳定。rg 是 Rust 原生实现，处理大型文件更可靠。

### Q: 如何添加新的主题板块？

编辑 `generate-constants-md.mjs` 中的 `sectionMap` 对象，添加新板块和对应的前缀列表。

### Q: 游戏更新后如何刷新？

只需重新执行完整流程即可。脚本会覆盖输出文件。

### Q: 如何只更新常量而不重建整个站点？

```powershell
cd scripts && node extract-constants.mjs && node generate-constants-md.mjs && cd .. && npx vitepress build docs
```

---

## 文件依赖关系

```
游戏源码 (.js)
    │
    ├──[rg 提取]──→ all-strings.tmp.txt
    │                    │
    │                    ▼
    │              extract-constants.mjs ──→ docs/data/constants.json
    │                                              │
    │                                              ▼
    │              generate-constants-md.mjs ──→ docs/api/constants.md
    │                                              │
    │                                              ▼
    └──────────────────────────────────────── vitepress build ──→ docs/.vitepress/dist/
```
