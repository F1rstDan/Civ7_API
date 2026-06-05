---
title: Random Events 随机事件
doc_type: object-api
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
---

# Random Events 随机事件

文明7的随机事件系统，包括自然灾害（火山喷发、洪水、风暴）、核武器（WMD）以及事件触发 API。

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