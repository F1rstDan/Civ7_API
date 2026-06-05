---
title: GameInfo 数据表
doc_type: system-topic
summary: 游戏数据表访问的全局对象，包含 150+ 个数据表，提供 lookup/find/filter/forEach 等通用访问方法。
primary_scope:
  - GameInfo
related_scope:
  - GameInfo.Units
  - GameInfo.Constructibles
  - GameInfo.Ages
  - GameInfo.Leaders
  - GameInfo.Maps
  - GameInfo.Yields
  - GameInfo.Resources
  - GameInfo.Civilizations
source:
  - TunerPanels/Player.ltp
  - TunerPanels/Units.ltp
  - TunerPanels/Districts.ltp
  - TunerPanels/Players.ltp
  - TunerPanels/VictoriesDefeats.ltp
  - TunerPanels/Legacies.ltp
  - modules/base-standard/maps/map-utilities.js
  - modules/core/ui-next/screens/unlocks/civ-unlocks-model.js
  - modules/core/ui/utilities/utilities-core-textprovider.js
doc_update: 2026-06-05
---

# GameInfo 数据表

游戏数据表访问的全局对象。包含 150+ 个数据表，存储游戏内所有定义数据（单位、建筑、文明、领袖、资源等）。从不通过 import 引入，引擎直接注入。

```javascript
// 来源 TunerPanels/Units.ltp、TunerPanels/Districts.ltp、TunerPanels/Player.ltp
// GameInfo 常用访问模式：lookup 查找定义、forEach 遍历表
const unitDef = GameInfo.Units.lookup(unit.type);
if (unitDef) {
  console.log(unitDef.Name, unitDef.Combat);
}

const buildingDef = GameInfo.Constructibles.lookup('BUILDING_RAIL_STATION');

const ageDef = GameInfo.Ages.lookup(Game.age);
console.log(ageDef?.Name);

GameInfo.Resources.forEach(res => {
  console.log(res.ResourceType, res.Name);
});
```

## 通用访问方法

所有 GameInfo 数据表共享以下访问方法：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>GameInfo.*.lookup</API> | hashOrType | `object \| null` | 通过哈希值或类型字符串查找单条记录（最常用） |
| <API>GameInfo.*.find</API> | predicate | `object \| undefined` | 按条件查找单条记录 |
| <API>GameInfo.*.filter</API> | predicate | `array` | 按条件过滤多条记录 |
| <API>GameInfo.*.forEach</API> | callback | `void` | 遍历所有记录执行回调 |


## 详细说明

### `GameInfo.Units`

所有单位类型的定义表。最常用的属性包括：

| 属性 | 类型 | 说明 |
|------|------|------|
| `UnitType` | string | 单位类型标识（如 "UNIT_WARRIOR"） |
| `Name` | string | 本地化名称键 |
| `Cost` | int | 生产力消耗 |
| `Combat` | int | 近战战斗力 |
| `RangedCombat` | int | 远程战斗力 |
| `Range` | int | 射程 |
| `Moves` | int | 基础移动力 |
| `FoundCity` | bool | 是否能建立城市（开拓者） |
| `CoreClass` | string | 核心分类（CORE_CLASS_MILITARY 等） |

```javascript
// 来源 TunerPanels/Units.ltp
// 通过单位类型哈希查找单位定义
const unitDef = GameInfo.Units.lookup(unit.type);
if (unitDef) {
  if (unitDef.FoundCity == true) {
    console.log('这是开拓者单位');
  }
  if (unitDef.Combat > 0) {
    console.log('战斗力:', unitDef.Combat);
  }
}
```

### `GameInfo.Constructibles`

所有可建造项目的定义表。包括建筑、奇观、改良设施。

| 属性 | 类型 | 说明 |
|------|------|------|
| `ConstructibleType` | string | 类型标识（如 "BUILDING_GRANARY"） |
| `Name` | string | 本地化名称键 |
| `Cost` | int | 生产力消耗 |
| `ConstructibleClass` | string | 分类（BUILDING、WONDER、IMPROVEMENT） |
| `PrereqDistrict` | string | 前置区域 |
| `Age` | string | 所属时代 |

```javascript
// 来源 TunerPanels/Districts.ltp
// 通过 constructible 类型哈希查找建造物定义
const def = GameInfo.Constructibles.lookup(instance.type);
if (def) {
  console.log(def.Name, def.Cost, def.ConstructibleClass);
}
```

### `GameInfo.Ages`

时代定义表。用于获取当前时代的显示名称和属性。

```javascript
// 来源 TunerPanels/Player.ltp
// 通过 Game.age 获取当前时代定义
const ageDef = GameInfo.Ages.lookup(Game.age);
if (ageDef != null) {
  const ageName = ageDef.Name;
}
```

### `GameInfo.Leaders`

领袖定义表。通过 `player.leaderType` 获取的哈希值来查找。

```javascript
// 来源 TunerPanels/Player.ltp
// 通过玩家 leaderType 查找领袖定义
const leader = GameInfo.Leaders.lookup(player.leaderType);
const leaderName = leader == null ? 'LOC_LEADER_NONE_NAME' : leader.Name;
```

### `GameInfo.Maps`

地图尺寸配置表。与 `GameplayMap.getMapSize()` 配合使用。

```javascript
// 来源 modules/base-standard/maps/map-utilities.js
// 获取地图尺寸信息并计算玩家数量
const uiMapSize = GameplayMap.getMapSize();
const mapInfo = GameInfo.Maps.lookup(uiMapSize);
let iPlayerCount = mapInfo.PlayersLandmass1 + mapInfo.PlayersLandmass2;
```

## 常用模式

### lookup + 空值检查

```javascript
// 来源 TunerPanels/Player.ltp
// lookup 返回 null 时的安全访问模式
const def = GameInfo.SomeTable.lookup(someHash);
if (def) {
  // 安全使用 def
}
```

### filter 过滤记录

```javascript
// 来源 modules/core/ui-next/screens/unlocks/civ-unlocks-model.js
// 按条件过滤数据表记录
const civUnlocks = GameInfo.UnlockRewards.filter(
  (reward) => reward.UnlockRewardKind == "KIND_CIVILIZATION"
);
```

### forEach 遍历

```javascript
// 来源 TunerPanels/Player.ltp
// 遍历产出表获取所有产出类型
for (let i = 0; i < GameInfo.Yields.length; i++) {
  const yieldType = GameInfo.Yields[i].YieldType;
  console.log(yieldType, GameInfo.Yields[i].Name);
}
```

## 完整数据表索引

### 核心数据

| 表名 | 说明 |
|------|------|
| `Civilizations` | 文明定义 |
| `Leaders` | 领袖定义 |
| `Ages` | 时代定义 |
| `Maps` | 地图尺寸配置 |
| `Difficulties` | 难度等级 |
| `GameSpeeds` | 游戏速度 |
| `GlobalParameters` | 全局参数 |
| `Types` | 通用类型定义 |
| `TypeTags` | 类型标签 |

### 地形与地图

| 表名 | 说明 |
|------|------|
| `Terrains` | 地形类型 |
| `Biomes` | 生物群落 |
| `Features` | 地物（森林、沼泽等） |
| `FeatureClasses` | 地物分类 |
| `Feature_NaturalWonders` | 自然奇观 |
| `Continents` | 大陆类型 |
| `Resources` | 资源定义 |
| `ResourceClasses` | 资源分类 |
| `Resource_YieldChanges` | 资源产出变化 |
| `Resource_Distribution` | 资源分布 |
| `Routes` | 道路类型 |

### 建筑与城区

| 表名 | 说明 |
|------|------|
| `Constructibles` | 可建造物（建筑、改良设施等） |
| `ConstructibleModifiers` | 建造物修正器 |
| `Constructible_Adjacencies` | 建造物相邻产出 |
| `Constructible_YieldChanges` | 建造物产出变化 |
| `Constructible_Maintenances` | 建造物维护费 |
| `Buildings` | 建筑定义 |
| `Wonders` | 奇观定义 |
| `Districts` | 城区定义 |
| `UniqueQuarters` | 特色城区 |
| `Improvements` | 改良设施 |

### 单位

| 表名 | 说明 |
|------|------|
| `Units` | 单位定义 |
| `Unit_Stats` | 单位属性 |
| `Unit_Costs` | 单位成本 |
| `UnitAbilities` | 单位能力 |
| `UnitCommands` | 单位命令 |
| `UnitOperations` | 单位操作 |
| `UnitPromotions` | 单位晋升 |
| `UnitPromotionDisciplines` | 晋升学科 |
| `UnitUpgrades` | 单位升级路径 |
| `UnitReplaces` | 单位替代关系 |

### 科技与文化

| 表名 | 说明 |
|------|------|
| `ProgressionTrees` | 进阶树 |
| `ProgressionTreeNodes` | 进阶树节点 |
| `Traditions` | 传统 |
| `TraditionModifiers` | 传统修正器 |

### 政府与外交

| 表名 | 说明 |
|------|------|
| `Governments` | 政体 |
| `DiplomacyActions` | 外交行为 |
| `DiplomacyStatements` | 外交声明 |
| `Ideologies` | 意识形态 |

### 宗教与信仰

| 表名 | 说明 |
|------|------|
| `Religions` | 宗教 |
| `Beliefs` | 信仰 |
| `BeliefClasses` | 信仰分类 |

### 胜利与解锁

| 表名 | 说明 |
|------|------|
| `Victories` | 胜利条件 |
| `VictoryTypes` | 胜利类型 |
| `Defeats` | 失败条件 |
| `UnlockRequirements` | 解锁条件 |
| `UnlockRewards` | 解锁奖励 |

### 起始偏好

| 表名 | 说明 |
|------|------|
| `StartBiasBiomes` | 生物群落偏好 |
| `StartBiasResources` | 资源偏好 |
| `StartBiasTerrains` | 地形偏好 |
| `StartBiasRivers` | 河流偏好 |
| `StartBiasFeatureClasses` | 地物偏好 |
| `StartBiasLakes` | 湖泊偏好 |
| `StartBiasNaturalWonders` | 奇观偏好 |
| `StartBiasAdjacentToCoasts` | 海岸偏好 |

### UI 与百科

| 表名 | 说明 |
|------|------|
| `CivilopediaPages` | 百科页面 |
| `CivilopediaSections` | 百科章节 |
| `Notifications` | 通知类型 |
| `NotificationSounds` | 通知音效 |
| `DisplayQueuePriorities` | 显示队列优先级 |

## 核心数据表一览

按使用频率排序（基于源码中的调用次数）：

| 数据表 | 调用次数 | 说明 |
|--------|---------|------|
| `GameInfo.Constructibles` | 112 | 可建造项目（建筑、奇观、改良设施） |
| `GameInfo.Units` | 109 | 单位类型定义（军事、平民、海军） |
| `GameInfo.Ages` | 81 | 时代定义（古典、探索、现代） |
| `GameInfo.Yields` | 75 | 产出类型（食物、生产力、金币、科技、文化、信仰） |
| `GameInfo.Civilizations` | 73 | 文明定义 |
| `GameInfo.Resources` | 72 | 资源定义（战略、奢侈、奖励） |
| `GameInfo.Leaders` | 55 | 领袖定义 |
| `GameInfo.Features` | 33 | 地物定义（森林、沼泽、自然奇观） |
| `GameInfo.ProgressionTreeNodes` | 33 | 科技/文化树节点 |
| `GameInfo.Biomes` | 24 | 生物群落（草原、沙漠、冻土） |
| `GameInfo.NarrativeStories` | 17 | 叙事故事 |
| `GameInfo.Traditions` | 16 | 传统定义 |
| `GameInfo.Maps` | 16 | 地图尺寸配置 |
| `GameInfo.UniqueQuarters` | 15 | 独特区域 |
| `GameInfo.Projects` | 15 | 项目定义 |
| `GameInfo.Terrains` | 14 | 地形定义（平原、丘陵、山脉、水域） |
| `GameInfo.Beliefs` | 13 | 信仰定义 |
| `GameInfo.Religions` | 12 | 宗教定义 |
| `GameInfo.Governments` | 6 | 政体定义 |
| `GameInfo.Victories` | 10 | 胜利条件定义 |


<API id="GameInfo.*.lookup"><h3>GameInfo.*.lookup(hashOrType)</h3>

**说明**: 通过哈希值（number）或类型字符串（string）查找数据表中的单条记录。这是 GameInfo 最常用的访问方法。

| 参数名 | 类型 | 说明 |
|------|------|------|
| hashOrType | `number \| string` | 记录的哈希值或类型标识字符串 |

**返回值**: `object \| null` — 找到返回记录对象，未找到返回 `null`

**使用示例**:

```javascript
// 来源 TunerPanels/Units.ltp
// 通过单位类型哈希查找单位定义
const unitInfo = GameInfo.Units.lookup(pUnit.type);

// 来源 TunerPanels/Player.ltp
// 通过 Game.age 获取当前时代定义
const currentAge = GameInfo.Ages.lookup(Game.age);
```

**来源**: TunerPanels/Units.ltp、TunerPanels/Player.ltp

</API>

<API id="GameInfo.*.find"><h3>GameInfo.*.find(predicate)</h3>

**说明**: 按条件查找数据表中**第一条**匹配的记录。

| 参数名 | 类型 | 说明 |
|------|------|------|
| predicate | `function` | 筛选回调，签名为 `(record) => boolean` |

**返回值**: `object \| undefined` — 找到返回第一条匹配记录，未找到返回 `undefined`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-core-textprovider.js
// 按 ID 查找邻接产出变化定义
const yieldChangeDef = GameInfo.Adjacency_YieldChanges.find(
  (o) => o.ID == element.YieldChangeId
);

// 来源 modules/base-standard/ui/tree-grid/tree-support.js
// 按 UnitType 查找单位定义
const unitInfo = GameInfo.Units.find(
  (o) => o.UnitType == unlock.TargetType
);
```

**来源**: modules/core/ui/utilities/utilities-core-textprovider.js

</API>

<API id="GameInfo.*.filter"><h3>GameInfo.*.filter(predicate)</h3>

**说明**: 按条件过滤数据表，返回**所有**匹配的记录组成的数组。

| 参数名 | 类型 | 说明 |
|------|------|------|
| predicate | `function` | 筛选回调，签名为 `(record) => boolean` |

**返回值**: `array` — 所有匹配记录的数组，无匹配时返回空数组 `[]`

**使用示例**:

```javascript
// 来源 modules/core/ui-next/screens/unlocks/civ-unlocks-model.js
// 过滤出所有文明解锁奖励
const civUnlocks = GameInfo.UnlockRewards.filter(
  (reward) => reward.UnlockRewardKind == "KIND_CIVILIZATION"
);

// 来源 modules/base-standard/ui/tree-grid/tree-support.js
// 过滤出替代指定单位的所有单位
const replaceUnits = GameInfo.UnitReplaces.filter(
  (r) => r.ReplacesUnitType == unitType
);
```

**来源**: modules/core/ui-next/screens/unlocks/civ-unlocks-model.js

</API>

<API id="GameInfo.*.forEach"><h3>GameInfo.*.forEach(callback)</h3>

**说明**: 遍历数据表中的所有记录，对每条记录执行回调。适用于需要遍历整张表的场景。

| 参数名 | 类型 | 说明 |
|------|------|------|
| callback | `function` | 回调函数，签名为 `(record) => void` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 遍历产出表获取所有产出类型
for (let i = 0; i < GameInfo.Yields.length; i++) {
  const yieldType = GameInfo.Yields[i].YieldType;
  console.log(yieldType);
}

// 来源 TunerPanels/Legacies.ltp
// forEach 遍历所有传承记录
GameInfo.Legacies.forEach(u => {
  console.log(u.Name);
});
```

**来源**: TunerPanels/Player.ltp、TunerPanels/Legacies.ltp

</API>

