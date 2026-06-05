---
title: Events 事件参考
doc_type: reference
summary: 文明7引擎事件系统参考，通过 engine.on() 监听、engine.trigger() 触发，涵盖游戏流程、城市、单位、地图、外交、UI 等事件。
primary_scope:
  - engine
related_scope:
  - Game
  - Cities
  - Units
  - GameplayMap
source:
  - modules/base-standard/ui/city-banners/city-banner-manager.js
  - modules/base-standard/ui/action/panel-action.js
  - modules/base-standard/ui/victory-manager/victory-manager.js
  - modules/base-standard/ui/victory-progress/model-victory-progress.js
  - modules/base-standard/scripts/age-transition-post-load.js
doc_update: 2026-06-05 
---

# Events 事件参考

文明7引擎事件通过 `engine.on()` 监听，通过 `engine.trigger()` 触发。每个事件的回调参数中包含相关数据对象。

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 监听城市添加到地图事件
engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);
```

## 游戏流程事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `GameStarted` | 游戏开始时触发 | — |
| `LocalPlayerChanged` | 本地玩家切换（热座模式） | — |
| `LocalPlayerTurnBegin` | 本地玩家回合开始 | — |
| `LocalPlayerTurnEnd` | 本地玩家回合结束 | — |
| `TurnBegin` | 回合开始 | — |
| `TurnEnd` | 回合结束 | — |
| `BeforeUnload` | 游戏退出前，用于清理资源 | — |
| `GameAgeEnded` | 时代结束 | — |
| `AutoplayStarted` | 自动播放开始 | — |
| `PlayerDefeat` | 玩家被击败 | `player` |
| `PlayerTurnActivated` | 玩家回合激活 | `player` |

## 城市事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `CityAddedToMap` | 城市添加到地图 | `cityID` |
| `CityRemovedFromMap` | 城市从地图移除 | `cityID` |
| `CityInitialized` | 城市初始化完成 | `cityID` |
| `CityPopulationChanged` | 城市人口变化 | `cityID`, `population` |
| `CityProductionChanged` | 城市生产项目变化 | `cityID` |
| `CityProductionCompleted` | 城市生产完成 | `cityID` |
| `CityYieldChanged` | 城市产出变化 | `cityID` |
| `CitySelectionChanged` | 城市选中状态变化 | `cityID` |

## 单位事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `UnitAddedToMap` | 单位添加到地图 | `unit` |
| `UnitRemovedFromMap` | 单位从地图移除 | `unit` |
| `UnitMoved` | 单位移动 | `unit` |
| `UnitMoveComplete` | 单位移动完成 | `unit` |
| `UnitSelectionChanged` | 单位选中状态变化 | `unit` |
| `UnitDamageChanged` | 单位受到伤害 | `unit`, `damage` |
| `UnitPromoted` | 单位升级 | `unit` |
| `UnitKilledInCombat` | 单位在战斗中被击杀 | `unit` |
| `UnitMovementPointsChanged` | 单位移动力变化 | `unit` |
| `Combat` | 战斗发生 | — |
| `SimulateCombatResult` | 战斗结果模拟（预览） | — |

## 地图/地块事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `PlotChanged` | 地块数据变化 | `x`, `y` |
| `PlotOwnershipChanged` | 地块所有权变化 | `x`, `y` |
| `PlotVisibilityChanged` | 地块可见性变化 | `x`, `y` |
| `PlotYieldChanged` | 地块产出变化 | `x`, `y` |
| `RequestMapInitData` | 引擎请求地图初始化数据（地图生成） | `initParams` |
| `GenerateMap` | 引擎请求生成地图 | — |

## 区域/建筑事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `DistrictAddedToMap` | 区域添加到地图 | `districtID` |
| `DistrictRemovedFromMap` | 区域从地图移除 | `districtID` |
| `ConstructibleAddedToMap` | 建筑/改良添加到地图 | — |
| `ConstructibleRemovedFromMap` | 建筑/改良从地图移除 | — |
| `WonderCompleted` | 奇观建造完成 | — |

## 资源事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `ResourceAssigned` | 资源分配 | — |
| `ResourceUnassigned` | 资源取消分配 | — |

## 外交事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `DiplomacyEventStarted` | 外交事件开始 | — |
| `DiplomacyEventEnded` | 外交事件结束 | — |
| `DiplomacyDeclareWar` | 宣战 | — |
| `DiplomacyMakePeace` | 和平 | — |
| `DiplomacyMeet` | 首次遇见文明 | — |
| `DiplomacyRelationshipChanged` | 外交关系变化 | — |

## 科技/文化事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `TechNodeCompleted` | 科技节点完成 | `node` |
| `CultureNodeCompleted` | 文化节点完成 | `node` |

## 经济事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `FoodQueueChanged` | 食物队列变化 | — |
| `TreasuryChanged` | 国库变化 | — |

## 宗教事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `ReligionFounded` | 宗教创立 | — |

## UI/输入事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `NotificationAdded` | 通知添加 | — |
| `CameraChanged` | 相机变化 | — |
| `InputAction` | 输入动作发生 | — |
| `UpdateFrame` | 每帧更新（慎用，回调中不要做重计算） | — |
| `InputContextChanged` | 输入上下文变化 | — |

## 教程事件

| 事件名 | 说明 | 数据字段 |
|--------|------|----------|
| `TutorialBegin` | 教程开始 | — |
| `TutorialCallout` | 教程提示显示/隐藏 | — |

## 使用示例

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 批量注册多个城市事件监听
engine.on("CityAddedToMap", this.cityAddedToMapListener);
engine.on("CityRemovedFromMap", this.cityRemovedFromMapListener);
engine.on("CityPopulationChanged", this.cityPopulationChangedListener);
engine.on("CityProductionChanged", this.cityProductionChangedListener);
engine.on("CityYieldChanged", this.cityYieldChangedListener);
```

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 游戏流程事件监听与取消
engine.on("GameStarted", this.onGameStarted, this);
engine.on("LocalPlayerTurnBegin", this.onLocalPlayerTurnBegin, this);
engine.on("LocalPlayerTurnEnd", this.onLocalPlayerTurnEnd, this);

// 取消监听
engine.off("LocalPlayerTurnBegin", this.onLocalPlayerTurnBegin, this);
```

```javascript
// 来源 modules/base-standard/ui/victory-progress/model-victory-progress.js
// 时代与胜利事件监听
engine.on("GameAgeEnded", this.onAgeEnded, this);
engine.on("PlayerDefeat", this.onPlayerDefeated, this);
```

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-callout.js
// 触发教程提示事件
engine.trigger("TutorialCallout");
```

```javascript
// 来源 modules/base-standard/scripts/age-transition-post-load.js
// 时代过渡相关事件
engine.on("RequestAgeInitializationParameters", requestInitializationParameters);
engine.on("GenerateAgeTransition", generateTransition);
```