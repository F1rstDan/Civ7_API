---
title: Random Events 随机事件
doc_type: object
summary: 文明7的随机事件系统，包括自然灾害（火山喷发、洪水、风暴）、核武器（WMD）以及事件触发 API。
primary_scope:
  - Game.RandomEvents
  - Game.Combat
related_scope:
  - MapFeatures
  - MapRivers
  - MapStorms
  - GameInfo.RandomEvents
  - GameInfo.WMDs
source:
  - TunerPanels/Random Events.ltp
  - modules/base-standard/ui/lenses/layer/random-events-layer.js
doc_update: 2026-06-05
---

# Random Events 随机事件

文明7的随机事件系统，包括自然灾害（火山喷发、洪水、风暴）、核武器（WMD）以及事件触发 API。

## 快速示例

```javascript
// 来源 TunerPanels/Random Events.ltp
// 触发火山喷发事件
let volcanoType = MapFeatures.getVolcanoTypeByIndex(0);
let volcanoPlotIndex = MapFeatures.getVolcanoIDByType(volcanoType);

let kEvent = {};
kEvent.volcano = volcanoType;
kEvent.eventType = "RANDOM_EVENT_ERUPTION";
kEvent.plotIndex = volcanoPlotIndex;
Game.RandomEvents.applyEvent(kEvent);

// 引爆 WMD
const plotCoord = GameplayMap.getLocationFromIndex(targetPlotIndex);
Game.Combat.detonateWMD(-1, "WMD_ICBM", plotCoord);
```

## 方法列表

| 方法（共 2 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.RandomEvents.applyEvent</API> | kEvent | `void` | 触发随机事件（火山喷发、洪水、风暴等） |
| <API>Game.Combat.detonateWMD</API> | playerId, wmdType, plotCoord | `void` | 在地块引爆大规模杀伤性武器 |

## Game.RandomEvents 子系统

```javascript
// 来源 TunerPanels/Random Events.ltp
// 触发随机事件
let kEvent = {
  eventType: "RANDOM_EVENT_ERUPTION",    // 事件类型字符串
  plotIndex: 1234,                        // 事件发生地块索引
  river: namedRiverType.$index,           // 可选：关联河流
  volcano: volcanoType,                   // 可选：关联火山（{collection, type}）
  feature: "FEATURE_VOLCANO",             // 可选：关联自然奇观
};
Game.RandomEvents.applyEvent(kEvent);
```

**kEvent 参数说明**：
- `eventType` (string)：事件类型，如 `"RANDOM_EVENT_ERUPTION"`、`"RANDOM_EVENT_FLOOD"`
- `plotIndex` (number)：事件发生的地块索引
- `river` (number, 可选)：关联河流的 `$index`，从 `GameInfo.NamedRivers.lookup()` 获取
- `volcano` (object, 可选)：火山类型对象 `{collection: hash, type: hash}`
- `feature` (string, 可选)：关联自然奇观的 FeatureType

### 随机事件类型枚举

`GameInfo.RandomEvents` 提供了所有随机事件类型的枚举值。

| 事件类型 | 说明 |
|---------|---------|
| `RANDOM_EVENT_BLIZZARD_CRIPPLING` | 毁灭性暴风雪 |
| `RANDOM_EVENT_BLIZZARD_SIGNIFICANT` | 强暴风雪 |
| `RANDOM_EVENT_DUST_STORM_GRADIENT` | 梯度沙尘暴 |
| `RANDOM_EVENT_DUST_STORM_HABOOB` | 哈布沙尘暴 |
| `RANDOM_EVENT_FLOOD_1000_YEAR` | 千年难遇洪水 |
| `RANDOM_EVENT_FLOOD_MAJOR` | 大洪水 |
| `RANDOM_EVENT_FLOOD_MODERATE` | 中度洪水 |
| `RANDOM_EVENT_HURRICANE_CAT_4` | 4类飓风 |
| `RANDOM_EVENT_HURRICANE_CAT_5` | 5类飓风 |
| `RANDOM_EVENT_PLAGUE_MAJOR` | 大型瘟疫 |
| `RANDOM_EVENT_PLAGUE_MINOR` | 小型瘟疫 |
| `RANDOM_EVENT_THUNDERSTORM_SQUALL_LINE` | 飑线雷暴 |
| `RANDOM_EVENT_THUNDERSTORM_SUPERCELL` | 超级单体雷暴 |
| `RANDOM_EVENT_TORNADO_FAMILY` | 龙卷风群 |
| `RANDOM_EVENT_TORNADO_OUTBREAK` | 龙卷风爆发 |
| `RANDOM_EVENT_VOLCANO_CATASTROPHIC` | 灾难性火山喷发 |
| `RANDOM_EVENT_VOLCANO_GENTLE` | 温和火山喷发 |
| `RANDOM_EVENT_VOLCANO_KILIMAJARO` | 乞力马扎罗火山喷发 |
| `RANDOM_EVENT_VOLCANO_MEGACOLOSSAL` | 超大规模火山喷发 |
| `RANDOM_EVENT_VOLCANO_THERA` | 锡拉火山喷发 |

## Game.Combat 子系统

```javascript
// 来源 TunerPanels/Random Events.ltp
// 引爆大规模杀伤性武器
let plotCoord = GameplayMap.getLocationFromIndex(plotIndex);
Game.Combat.detonateWMD(playerId, wmdType, plotCoord);

// 参数说明：
// playerId (number): 发起者玩家 ID，-1 表示无主
// wmdType (string): WMD 类型，如 "WMD_ICBM"
// plotCoord ({x, y}): 目标地块坐标
```

## 使用示例：触发火山喷发

```javascript
// 来源 TunerPanels/Random Events.ltp — "Apply Event" Action
// 1. 找到目标火山
let volcanoType = MapFeatures.getVolcanoTypeByIndex(0);
let volcanoPlotIndex = MapFeatures.getVolcanoIDByType(volcanoType);

// 2. 构造事件对象
let kEvent = {};
kEvent.volcano = volcanoType;
kEvent.eventType = "RANDOM_EVENT_ERUPTION";
kEvent.plotIndex = volcanoPlotIndex;

// 3. 触发事件
Game.RandomEvents.applyEvent(kEvent);
```

## 使用示例：引爆 WMD

```javascript
// 来源 TunerPanels/Random Events.ltp — "Detonate WMD" Action
// 在指定地块引爆 WMD
const plotCoord = GameplayMap.getLocationFromIndex(targetPlotIndex);
Game.Combat.detonateWMD(-1, "WMD_ICBM", plotCoord);
```

## GameInfo 关联表

```javascript
// 来源 TunerPanels/Random Events.ltp
// 事件相关定义表
GameInfo.RandomEvents;      // 随机事件定义表（RandomEventType, NaturalWonder, ...）
GameInfo.WMDs;              // WMD 定义表（WeaponType）
GameInfo.NamedRivers;       // 命名河流表（NamedRiverType）
GameInfo.NamedVolcanoes;    // 命名火山表（NamedVolcanoType）
GameInfo.Fertilities;       // 肥沃度定义表（FertilityType）
```

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `MapFeatures.getVolcanoTypeByIndex()` | 获取火山类型 |
| `MapFeatures.getVolcanoIDByType()` | 获取火山地块 ID |
| `MapFeatures.isVolcanoActive()` | 检查火山是否活跃 |
| `MapFeatures.setVolcanoActive()` | 设置火山活跃状态 |
| `MapFeatures.isVolcanoActiveAt()` | 检查指定地块火山是否活跃 |
| `MapFeatures.getVolcanoEruptionInfoAt()` | 获取火山喷发信息 |
| `MapFeatures.numVolcanoes` | 火山数量 |
| `MapRivers.getRiver()` | 获取河流对象 |
| `MapRivers.getRiverIDByIndex()` | 根据索引获取河流 ID |
| `MapRivers.numRivers` | 河流数量 |
| `MapStorms.getStorm()` | 获取风暴对象 |
| `MapStorms.getActiveStormIDByIndex()` | 根据索引获取活跃风暴 ID |
| `MapStorms.numActiveStorms` | 活跃风暴数量 |

## 随机事件数据结构

从 `Random Events.ltp` 面板的 UI 代码可推断出：

| 对象 | 属性 | 类型 | 说明 |
|------|------|------|------|
| River | `type` | number | 命名河流类型 hash |
| River | `isFloodable` | boolean | 是否可洪水 |
| River | `isFlooded` | boolean | 当前是否洪水 |
| Storm | `id` | object | 风暴 ID（`.id` 属性为数字） |
| Storm | `type` | number | 随机事件类型 hash |
| Storm | `startTurn` | number | 风暴开始回合 |
| Storm | `startPlot` | number | 起始地块 |
| Storm | `currentPlot` | number | 当前地块 |
| Storm | `currentDirection` | number | 当前移动方向 |
| Storm | `severity` | number | 严重程度 |
| Storm | `name` | string | 风暴名称 |
| VolcanoEruption | `isErupting` | boolean | 是否正在喷发 |
| VolcanoEruption | `severity` | number | 喷发严重程度 |
| VolcanoEruption | `turnsRemaining` | number | 剩余回合数 |

---

<API id="Game.RandomEvents.applyEvent"><h3>Game.RandomEvents.applyEvent(kEvent)</h3>

**说明**: 触发随机事件（火山喷发、洪水、风暴等）。根据 `kEvent` 中的 `eventType` 决定事件类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| kEvent | `object` | 事件参数对象，包含 `eventType`（string）、`plotIndex`（number）等字段 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Random Events.ltp
// 构造并触发火山喷发事件
let kEvent = {
  eventType: "RANDOM_EVENT_ERUPTION",
  plotIndex: 1234,
  volcano: volcanoType,
};
Game.RandomEvents.applyEvent(kEvent);
```

</API>
<API id="Game.Combat.detonateWMD"><h3>Game.Combat.detonateWMD(playerId, wmdType, plotCoord)</h3>

**说明**: 在指定地图坐标引爆大规模杀伤性武器（WMD）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 发起者玩家 ID，`-1` 表示无主 |
| wmdType | `string` | WMD 类型，如 `"WMD_ICBM"` |
| plotCoord | `{x, y}` | 目标地块坐标对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Random Events.ltp
// 在指定地块引爆 WMD
const plotCoord = GameplayMap.getLocationFromIndex(targetPlotIndex);
Game.Combat.detonateWMD(-1, "WMD_ICBM", plotCoord);
```

</API>